import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import path from "path";
import { writeFile } from "fs/promises";
import fs from "fs";

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
    let imgLink: string | null = null;

    const file = formData.get("image") as File;

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());

      // Use Vercel's writable /tmp directory
      const tempFilePath = `/tmp/${file.name}`;

      await writeFile(tempFilePath, buffer); // Save file in /tmp

      imgLink = await uploadToCloudinary(tempFilePath, "Gallery_BSC");

      // Optionally: Delete the file after upload (since it's a temp file)
      fs.unlinkSync(tempFilePath);
    }

    console.log("imgLink", imgLink);

    const newEvent = await prisma.gallery.create({
      data: {
        images: imgLink!,
      },
    });

    return NextResponse.json({ success: true, event: newEvent });
  } catch (error) {
    console.error("Error creating gallery:", error);
    return NextResponse.json(
      { success: false, error: `${error}` },
      { status: 500 }
    );
  }
}
