import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import path from "path";
import { writeFile } from "fs/promises";
import fs from "fs";

export async function GET(req: Request) {
  try {
    const projects = await prisma.project.findMany();
    return NextResponse.json({
      projects,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    let imgLink: string | null = null;

    const title = formData.get("title") as string;
    const teamName = formData.get("teamName") as string;
    const description = formData.get("description") as string;
    const type = formData.get("type") as string;
    const tags = (formData.get("tags") as string).split(",");
    let LiveLink: string | null = null;
    let GithubLink: string | null = null;
    let Content: string | null = null;
    if (formData.get("liveLink")) {
      LiveLink = formData.get("liveLink") as string;
    }
    if (formData.get("githubLink")) {
      GithubLink = formData.get("githubLink") as string;
    }
    if (formData.get("content")) {
      Content = formData.get("content") as string;
    }

    const file = formData.get("image") as File;

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const tempDir = path.join(process.cwd(), "tmp");
      await fs.promises.mkdir(tempDir, { recursive: true });
      const tempFilePath = path.join(tempDir, file.name);
      await writeFile(tempFilePath, buffer);

      imgLink = await uploadToCloudinary(tempFilePath, "Projects_BSC");
    }

    const newProject = await prisma.project.create({
      data: {
        title,
        teamName,
        type,
        description,
        tags,
        liveLink: LiveLink,
        gitHubLink: GithubLink,
        content: Content,
        image: imgLink!,
      },
    });

    return NextResponse.json({ success: true, project: newProject });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { success: false, error: `Failed to create project due to ${error}` },
      { status: 500 }
    );
  }
}
