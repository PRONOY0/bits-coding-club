import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const gallery = await prisma.gallery.findMany();

    return NextResponse.json({
      success: true,
      gallery,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch gallery images" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file uploaded" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload directly to Cloudinary
    const imgLink = await uploadToCloudinary(buffer, "Gallery_BSC");

    // Save to database
    const newEvent = await prisma.gallery.create({
      data: { images: imgLink },
    });

    return NextResponse.json({ success: true, event: newEvent });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { success: false, error: `${error}` },
      { status: 500 }
    );
  }
}
