import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import path from "path";
import { writeFile } from "fs/promises";
import fs from "fs";

export async function GET(req: Request) {
  try {
    const updates = await prisma.update.findMany();
    return NextResponse.json({
      success: true,
      updates,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch updates" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    let imgLink: string | null = null;

    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const shortDescription = formData.get("shortDescription") as string;
    const dateString = formData.get("date") as string;
    const date = new Date(dateString);
    const content = formData.get("content") as string;

    const file = formData.get("image") as File;

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const tempDir = path.join(process.cwd(), "tmp");
      await fs.promises.mkdir(tempDir, { recursive: true });
      const tempFilePath = path.join(tempDir, file.name);
      await writeFile(tempFilePath, buffer);

      imgLink = await uploadToCloudinary(tempFilePath, "Updates_BSC");
    }

    const newUpdate = await prisma.update.create({
      data: {
        title,
        category,
        shortDescription,
        date,
        content,
        image: imgLink!,
      },
    });

    return NextResponse.json({ success: true, update: newUpdate });
  } catch (error) {
    console.error("Error creating update:", error);
    return NextResponse.json(
      { success: false, error: `Failed to create update due to ${error}` },
      { status: 500 }
    );
  }
}
