import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import path from "path";
import { writeFile } from "fs/promises";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type gallery = {
  images: string;
};

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: galleryId } = await context.params;

    const existingGallery = await prisma.gallery.findUnique({
      where: { id: galleryId },
    });

    if (!existingGallery) {
      return NextResponse.json(
        { success: false, error: "Update not found" },
        { status: 404 }
      );
    }

    if (existingGallery.images) {
      const urlParts = existingGallery.images.split("/");
      const fileName = urlParts.pop()?.split(".")[0]; // Get filename without extension
      const folder = urlParts.slice(7).join("/"); // Extract Cloudinary folder
      const publicId = `${folder}/${fileName}`; // Combine folder and filename

      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    await prisma.gallery.delete({
      where: { id: galleryId },
    });

    return NextResponse.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete gallery" },
      { status: 500 }
    );
  }
}
