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

type project = {
  title?: string;
  category?: string;
  image?: string;
  content?: string;
  date?: string;
  time?: string;
};

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: eventId } = await context.params;

    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });
    return NextResponse.json({
      success: true,
      event,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: eventId } = await context.params;

    const formData = await req.formData();
    let imgLink: string | null = null;

    const updateData: project = {};

    if (formData.has("title"))
      updateData.title = formData.get("title") as string;
    if (formData.has("category"))
      updateData.category = formData.get("category") as string;
    if (formData.has("content"))
      updateData.content = formData.get("content") as string;
    if (formData.has("date")) updateData.date = formData.get("date") as string;
    if (formData.has("time")) updateData.time = formData.get("time") as string;

    if (formData.has("image")) {
      const file = formData.get("image") as File;
      const buffer = Buffer.from(await file.arrayBuffer());

      imgLink = await uploadToCloudinary(buffer, "Events_BSC");
      updateData.image = imgLink;
    }

    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data: updateData,
    });

    return NextResponse.json({ success: true, event: updatedEvent });
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { success: false, error: `Failed to update event due to ${error}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: eventId } = await context.params;

    const existingEvent = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!existingEvent) {
      return NextResponse.json(
        { success: false, error: "Event not found" },
        { status: 404 }
      );
    }

    if (existingEvent.image) {
      const urlParts = existingEvent.image.split("/");
      const fileName = urlParts.pop()?.split(".")[0]; // Get filename without extension
      const folder = urlParts.slice(7).join("/"); // Extract Cloudinary folder
      const publicId = `${folder}/${fileName}`; // Combine folder and filename

      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    await prisma.event.delete({
      where: { id: eventId },
    });

    return NextResponse.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
