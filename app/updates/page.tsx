"use client";
import Link from "next/link"
import Image from "next/image"
import { Search } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Footer from "@/components/Footer/Footer";

export default function UpdatesPage() {
  // This would typically come from a database or API
  const updates = [
    {
      id: 1,
      title: "Hackathon Winners Announced",
      date: "May 15, 2023",
      category: "announcement",
      excerpt:
        "Congratulations to Team CodeCrafters for winning the Spring Hackathon with their innovative project on AI-assisted coding.",
      image: "/projects.png",
      slug: "hackathon-winners",
    },
    {
      id: 2,
      title: "Web Development Bootcamp",
      date: "May 10, 2023",
      category: "event",
      excerpt:
        "Join our intensive 3-day bootcamp to learn modern web development with React and Next.js. Perfect for beginners!",
      image: "/projects.png",
      slug: "web-dev-bootcamp",
    },
    {
      id: 3,
      title: "AI in Software Engineering Talk",
      date: "May 5, 2023",
      category: "speaker",
      excerpt:
        "Dr. Priya Sharma from Google will be discussing the impact of AI on modern software engineering practices.",
      image: "/projects.png",
      slug: "ai-talk",
    },
    {
      id: 4,
      title: "New Club Leadership Elected",
      date: "April 30, 2023",
      category: "announcement",
      excerpt:
        "We're excited to announce our new leadership team for the 2023-2024 academic year. Congratulations to all elected members!",
      image: "/projects.png",
      slug: "new-leadership",
    },
    {
      id: 5,
      title: "Competitive Programming Workshop",
      date: "April 25, 2023",
      category: "event",
      excerpt:
        "Enhance your algorithmic problem-solving skills with our competitive programming workshop led by ICPC finalists.",
      image: "/projects.png",
      slug: "cp-workshop",
    },
    {
      id: 6,
      title: "Microsoft Internship Opportunities",
      date: "April 20, 2023",
      category: "opportunity",
      excerpt:
        "Microsoft is offering exclusive internship opportunities for BITS Pilani Coding Club members. Apply by May 15.",
      image: "/projects.png",
      slug: "microsoft-internships",
    },
  ]

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "announcement":
        return <Badge className="bg-[#5CCAE8] hover:bg-[#5CCAE8]/90">Announcement</Badge>
      case "event":
        return <Badge className="bg-[#B78A2D] hover:bg-[#B78A2D]/90">Event</Badge>
      case "speaker":
        return <Badge className="bg-[#CF2027] hover:bg-[#CF2027]/90">Guest Speaker</Badge>
      case "opportunity":
        return <Badge className="bg-[#2B2B88] hover:bg-[#2B2B88]/90">Opportunity</Badge>
      default:
        return <Badge>Other</Badge>
    }
  }

  return (
    <div className="w-full">
      <div className="w-full px-64 py-24 flex flex-col">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#2B2B88] lg:text-5xl">What&apos;s New</h1>
            <p className="text-muted-foreground mt-2">Stay updated with the latest news, events, and opportunities</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {updates.map((update) => (
            <Card key={update.id} className="overflow-hidden flex flex-col hover:bg-[#999]/10 transition-all duration-500 hover:scale-105">
              <div className="relative h-72 w-full">
                <Image src={update.image || "/projects.png"} alt={update.title} fill className="object-cover p-5 rounded-3xl" />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  {getCategoryBadge(update.category)}
                  <span className="text-sm text-muted-foreground">{update.date}</span>
                </div>
                <CardTitle className="mt-2">{update.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p>{update.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Link
                  href={`/updates/${update.slug}`}
                  className="text-[#1DA8CE] hover:text-[#082F3A] text-sm font-medium transition-colors duration-300"
                >
                  Read more →
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button variant="outline">Load More</Button>
        </div>
      </div>

      <Footer />
    </div>
  )
}

