"use client";

import Link from "next/link"
import Image from "next/image"
import { Github, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Footer from "@/components/Footer/Footer"
import { useAppContext } from "@/context/page";
import Loader from "@/components/Loader/page";
import { useState } from "react";

export default function ProjectsPage() {
  // This would typically come from a database or API
  const { projects, loading } = useAppContext();
  const [selectedTab, setSelectedTab] = useState("all");
  const [loader, setLoader] = useState(false);
  if (loading) return <div className="w-full h-screen flex justify-center items-center"><Loader /></div>

  if (loader) return <div className="w-full h-screen  flex justify-center items-center"><Loader /></div>

  const handleTabChange = (tab: string) => {
    setLoader(true);
    setSelectedTab(tab);
    setTimeout(() => {
      setLoader(false);
    }, 250);
  };


  return (
    <div className="w-full">
      <div className="w-full px-64 py-24 flex flex-col">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#2B2B88]">Student Projects</h1>
            <p className="text-muted-foreground mt-2">Explore innovative projects developed by our club members</p>
          </div>
        </div>

        <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="all" className="cursor-pointer" onClick={() => handleTabChange("all")}>
              All Projects
            </TabsTrigger>
            <TabsTrigger value="Web" className="cursor-pointer" onClick={() => handleTabChange("Web")}>
              Web
            </TabsTrigger>
            <TabsTrigger value="Mobile" className="cursor-pointer" onClick={() => handleTabChange("Mobile")}>
              Mobile
            </TabsTrigger>
            <TabsTrigger value="AI/ML" className="cursor-pointer" onClick={() => handleTabChange("AI/ML")}>
              AI/ML
            </TabsTrigger>
            <TabsTrigger value="AR/VR" className="cursor-pointer" onClick={() => handleTabChange("AR/VR")}>
              AR/VR
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>

          {["Web", "Mobile", "AI/ML", "AR/VR"].map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects
                  .filter((project) => project.type === category)
                  .map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}

interface Project {
  id?: string;
  title?: string;
  description?: string;
  image?: string;
  teamName?: string;
  liveLink?: string;
  gitHubLink?: string;
  type?: string;
  tags?: string[];
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="overflow-hidden flex flex-col hover:scale-105 transition-all duration-500 hover:bg-[#999]/10 cursor-pointer">
      <div className="relative h-72 w-full">
        <Image src={project.image || "/placeholder.svg"} alt={project.title!} fill className="object-cover p-5 rounded-3xl" />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{project.title}</CardTitle>
        </div>
        <CardDescription>{project.teamName}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags?.map((tag, index) => (
            <Badge key={index} variant="secondary" className="rounded-3xl">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/projects/${project.id}`} className="text-[#1DA8CE] hover:text-[#082F3A] text-sm font-medium ml-1 transition-colors duration-300">
          View details →
        </Link>
        <div className="flex gap-2">
          <a
            href={project.gitHubLink}
            className="text-gray-600 hover:text-[#2B2B88]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={20} />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href={project.liveLink}
            className="text-gray-600 hover:text-[#2B2B88]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={20} />
            <span className="sr-only">Live Demo</span>
          </a>
        </div>
      </CardFooter>
    </Card>
  )
}

