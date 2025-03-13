import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import path from "path";
import { writeFile } from "fs/promises";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

type updates = {
  title?: string;
  category?: string;
  shortDescription?: string;
  date?: string | Date;
  image?: string;
  content?: string;
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: updateId } = await context.params;

    const updatesById = await prisma.update.findUnique({
      where: { id: updateId },
    });

    return NextResponse.json({
      success: true,
      updatesById,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch updates" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: updateId } = await context.params;

    const formData = await req.formData();
    let imgLink: string | null = null;

    const updatedData: updates = {};

    if (formData.has("title"))
      updatedData.title = formData.get("title") as string;
    if (formData.has("category"))
      updatedData.category = formData.get("category") as string;
    if (formData.has("shortDescription"))
      updatedData.shortDescription = formData.get("shortDescription") as string;
    if (formData.has("date"))
      new Date((updatedData.date = formData.get("date") as string));
    if (formData.has("content"))
      updatedData.content = formData.get("content") as string;

    if (formData.has("image")) {
      const file = formData.get("image") as File;
      const buffer = Buffer.from(await file.arrayBuffer());

      const tempDir = path.join(process.cwd(), "tmp");
      await fs.promises.mkdir(tempDir, { recursive: true });
      const tempFilePath = path.join(tempDir, file.name);
      await writeFile(tempFilePath, buffer);

      imgLink = await uploadToCloudinary(tempFilePath, "Updates_BSC");
      updatedData.image = imgLink;
    }

    const updatedUPDATES = await prisma.update.update({
      where: { id: updateId },
      data: updatedData,
    });

    return NextResponse.json({
      success: true,
      updates: updatedUPDATES,
    });
  } catch (error) {
    console.error("Error updating update:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update Updates" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: updateId } = await context.params;

    const existingUpdate = await prisma.update.findUnique({
      where: { id: updateId },
    });

    if (!existingUpdate) {
      return NextResponse.json(
        { success: false, error: "Update not found" },
        { status: 404 }
      );
    }

    if (existingUpdate.image) {
      const urlParts = existingUpdate.image.split("/");
      const fileName = urlParts.pop()?.split(".")[0]; // Get filename without extension
      const folder = urlParts.slice(7).join("/"); // Extract Cloudinary folder
      const publicId = `${folder}/${fileName}`; // Combine folder and filename

      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    await prisma.update.delete({
      where: { id: updateId },
    });

    return NextResponse.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.error("Error updating updates:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete updates" },
      { status: 500 }
    );
  }
}