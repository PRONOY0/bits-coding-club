import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import path from "path";
import { writeFile } from "fs/promises";
import fs from "fs";

export async function GET(req: Request) {
  try {
    const testimonials = await prisma.testimonial.findMany();
    return NextResponse.json({
      success: true,
      testimonials,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch Testimonials" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    let imgLink: string | null = null;

    const name = formData.get("name") as string;
    const batch = formData.get("batch") as string;
    const feedback = formData.get("feedback") as string;

    const file = formData.get("image") as File;

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const tempDir = path.join(process.cwd(), "tmp");
      await fs.promises.mkdir(tempDir, { recursive: true });
      const tempFilePath = path.join(tempDir, file.name);
      await writeFile(tempFilePath, buffer);

      imgLink = await uploadToCloudinary(tempFilePath, "Testimonials_BSC");
    }

    const newTestimonial = await prisma.testimonial.create({
      data: {
        name,
        batch,
        feedback,
        image: imgLink!,
      },
    });

    return NextResponse.json({ success: true, testimonial: newTestimonial });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { success: false, error: `Failed to create testimonial due to ${error}` },
      { status: 500 }
    );
  }
}
