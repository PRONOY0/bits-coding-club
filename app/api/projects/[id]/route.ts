import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import path from "path";
import { writeFile } from "fs/promises";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

type project = {
  title?: string;
  description?: string;
  image?: string;
  teamName?: string;
  liveLink?: string;
  content?: string;
  gitHubLink?: string;
  tags?: string[];
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
    const { id: projectId } = await context.params;

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });
    return NextResponse.json({
      success: true,
      project,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await context.params;

    const formData = await req.formData();
    let imgLink: string | null = null;

    const updateData: project = {};

    if (formData.has("title"))
      updateData.title = formData.get("title") as string;
    if (formData.has("description"))
      updateData.description = formData.get("description") as string;
    if (formData.has("tags"))
      updateData.tags = (formData.get("tags") as string).split(",");
    if (formData.has("teamName"))
      updateData.teamName = formData.get("teamName") as string;
    if (formData.has("liveLink"))
      updateData.liveLink = formData.get("liveLink") as string;
    if (formData.has("githubLink"))
      updateData.gitHubLink = formData.get("githubLink") as string;
    if (formData.has("content"))
      updateData.content = formData.get("content") as string;
    if (formData.has("type"))
      updateData.content = formData.get("type") as string;

    if (formData.has("image")) {
      const file = formData.get("image") as File;
      const buffer = Buffer.from(await file.arrayBuffer());

      imgLink = await uploadToCloudinary(buffer, "Projects_BSC");
      updateData.image = imgLink;
    }

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: updateData,
    });

    return NextResponse.json({ success: true, project: updatedProject });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: ProjectId } = await context.params;

    const existingProject = await prisma.project.findUnique({
      where: { id: ProjectId },
    });

    if (!existingProject) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    if (existingProject.image) {
      const urlParts = existingProject.image.split("/");
      const fileName = urlParts.pop()?.split(".")[0]; // Get filename without extension
      const folder = urlParts.slice(7).join("/"); // Extract Cloudinary folder
      const publicId = `${folder}/${fileName}`; // Combine folder and filename

      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    await prisma.project.delete({
      where: { id: ProjectId },
    });

    return NextResponse.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
