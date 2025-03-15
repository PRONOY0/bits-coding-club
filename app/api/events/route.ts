import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import path from "path";
import { writeFile } from "fs/promises";
import fs from "fs";

export async function GET(req: Request) {
  try {
    const events = await prisma.event.findMany();

    return NextResponse.json({
      success: true,
      events,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    let imgLink: string | null = null;
    let Content: string | null = null;

    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    if (formData.get("content")) {
      Content = formData.get("content") as string;
    }
    const dateString = formData.get("date") as string;
    const date = new Date(dateString);
    const time = formData.get("time") as string;

    const file = formData.get("image") as File;
    console.log("image file", file);

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());

      imgLink = await uploadToCloudinary(buffer, "Events_BSC");
    }

    console.log("imgLink", imgLink);

    const newEvent = await prisma.event.create({
      data: {
        title,
        category,
        date,
        time,
        content: Content,
        image: imgLink!,
      },
    });

    return NextResponse.json({ success: true, event: newEvent });
  } catch (error) {
    console.error("Error creating events:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create events" },
      { status: 500 }
    );
  }
}
