import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import path from "path";
import { writeFile } from "fs/promises";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

type testimonial = {
  name?: string;
  batch?: string;
  feedback?: string;
  image?: string;
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
    const { id: testimonialId } = await context.params;

    const testimonialById = await prisma.testimonial.findUnique({
      where: { id: testimonialId },
    });

    return NextResponse.json({
      success: true,
      testimonialById,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch testimonial" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: testimonialId } = await context.params;

    const formData = await req.formData();
    let imgLink: string | null = null;

    const updateData: testimonial = {};

    if (formData.has("name")) updateData.name = formData.get("name") as string;
    if (formData.has("batch"))
      updateData.batch = formData.get("batch") as string;
    if (formData.has("feedback"))
      updateData.feedback = formData.get("feedback") as string;

    if (formData.has("image")) {
      const file = formData.get("image") as File;
      const buffer = Buffer.from(await file.arrayBuffer());

      const tempDir = path.join(process.cwd(), "tmp");
      await fs.promises.mkdir(tempDir, { recursive: true });
      const tempFilePath = path.join(tempDir, file.name);
      await writeFile(tempFilePath, buffer);

      imgLink = await uploadToCloudinary(tempFilePath, "Testimonials_BSC");
      updateData.image = imgLink;
    }

    const updatedTestimonial = await prisma.testimonial.update({
      where: { id: testimonialId },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      testimonial: updatedTestimonial,
    });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update testimonial" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: testimonialId } = await context.params;

    const existingTestimonial = await prisma.testimonial.findUnique({
      where: { id: testimonialId },
    });

    if (!existingTestimonial) {
      return NextResponse.json(
        { success: false, error: "testimonial not found" },
        { status: 404 }
      );
    }

    if (existingTestimonial.image) {
      const urlParts = existingTestimonial.image.split("/");
      const fileName = urlParts.pop()?.split(".")[0]; // Get filename without extension
      const folder = urlParts.slice(7).join("/"); // Extract Cloudinary folder
      const publicId = `${folder}/${fileName}`; // Combine folder and filename

      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    await prisma.testimonial.delete({
      where: { id: testimonialId },
    });

    return NextResponse.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}
