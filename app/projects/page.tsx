"use client";

import Link from "next/link"
import Image from "next/image"
import { Code, Github, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Footer from "@/components/Footer/Footer"

export default function ProjectsPage() {
  // This would typically come from a database or API
  const projects = [
    {
      id: 1,
      title: "Smart Campus Navigator",
      description:
        "An AI-powered campus navigation app that helps students find the shortest routes between buildings.",
      image: "/projects.png",
      team: "Team CodeWizards",
      tags: ["React Native", "AI", "Maps API"],
      github: "#",
      demo: "#",
      category: "mobile",
    },
    {
      id: 2,
      title: "Study Buddy",
      description:
        "A collaborative platform for students to find study partners and form study groups based on courses and interests.",
      image: "/projects.png",
      team: "Team StudyMasters",
      tags: ["React", "Node.js", "MongoDB"],
      github: "#",
      demo: "#",
      category: "web",
    },
    {
      id: 3,
      title: "Course Recommender",
      description: "An ML-based system that recommends elective courses based on student interests and career goals.",
      image: "/projects.png",
      team: "Team DataMinds",
      tags: ["Python", "Machine Learning", "Flask"],
      github: "#",
      demo: "#",
      category: "ai",
    },
    {
      id: 4,
      title: "Virtual Lab Assistant",
      description:
        "An AR application that guides students through laboratory experiments with interactive 3D visualizations.",
      image: "/projects.png",
      team: "Team ARVisionaries",
      tags: ["Unity", "AR", "C#"],
      github: "#",
      demo: "#",
      category: "ar",
    },
    {
      id: 5,
      title: "Campus Events",
      description: "A comprehensive platform for managing and discovering campus events, clubs, and activities.",
      image: "/projects.png",
      team: "Team EventHorizon",
      tags: ["Next.js", "Firebase", "Tailwind CSS"],
      github: "#",
      demo: "#",
      category: "web",
    },
    {
      id: 6,
      title: "Attendance Tracker",
      description: "A mobile app that uses facial recognition to automate attendance tracking in classrooms.",
      image: "/projects.png",
      team: "Team FaceID",
      tags: ["Flutter", "TensorFlow", "Firebase"],
      github: "#",
      demo: "#",
      category: "mobile",
    },
  ]

  return (
    <div className="w-full">
      <div className="w-full px-64 py-24 flex flex-col">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#2B2B88]">Student Projects</h1>
            <p className="text-muted-foreground mt-2">Explore innovative projects developed by our club members</p>
          </div>
          <Link
            href="/projects/submit"
            className="flex items-center gap-2 bg-[#2B2B88] text-white px-4 py-2 rounded-md hover:bg-[#2B2B88]/90 transition-colors"
          >
            <Code size={18} />
            <span>Submit Your Project</span>
          </Link>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="all" className="cursor-pointer">All Projects</TabsTrigger>
            <TabsTrigger value="web" className="cursor-pointer">Web</TabsTrigger>
            <TabsTrigger value="mobile" className="cursor-pointer">Mobile</TabsTrigger>
            <TabsTrigger value="ai" className="cursor-pointer">AI/ML</TabsTrigger>
            <TabsTrigger value="ar" className="cursor-pointer">AR/VR</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>

          {["web", "mobile", "ai", "ar"].map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects
                  .filter((project) => project.category === category)
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
  id: number
  title: string
  description: string
  image: string
  team: string
  tags: string[]
  github: string
  demo: string
  category: string
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="overflow-hidden flex flex-col hover:scale-105 transition-all duration-500 hover:bg-[#999]/10 cursor-pointer">
      <div className="relative h-72 w-full">
        <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover p-5 rounded-3xl" />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{project.title}</CardTitle>
        </div>
        <CardDescription>{project.team}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="rounded-3xl">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/projects/${project.title}`} className="text-[#1DA8CE] hover:text-[#082F3A] text-sm font-medium ml-1 transition-colors duration-300">
          View details →
        </Link>
        <div className="flex gap-2">
          <a
            href={project.github}
            className="text-gray-600 hover:text-[#2B2B88]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={20} />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href={project.demo}
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

