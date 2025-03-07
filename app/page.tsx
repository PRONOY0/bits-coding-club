"use client";
import Link from "next/link"
import Image from "next/image"
import { Calendar, Code, Users, Award, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import GallerySlider from "@/components/gallery-slider"
import UpcomingEvents from "@/components/upcoming-events"
import Footer from "@/components/Footer/Footer"

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen w-full">

      {/* Hero Section */}
      <section className="relative w-full h-[70vh] bg-gradient-to-r from-[#2B2B88] to-[#5CCAE8]">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full text-center text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">BITS Pilani Coding Club</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl lg:text-2xl">
            Fostering innovation, collaboration, and excellence in computer science
          </p>
          <div className="flex flex-wrap gap-20 justify-center">
            <button className="bg-[#5CCAE8] text-[#082F3A] cursor-pointer hover:bg-[#1DA8CE] hover:text-[#D2F0F9] font-bold p-5 rounded-xl transition-colors duration-500">
              Join the Club
            </button>
            <button className="bg-[#5CCAE8] text-[#082F3A] cursor-pointer hover:bg-[#1DA8CE] hover:text-[#D2F0F9] font-bold p-5 rounded-xl transition-colors duration-500">
              Explore Projects
            </button>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-[#2B2B88] w-full text-white py-4">
        <div className="flex w-full justify-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-20">
            <Link href="/events" className="flex items-center gap-2 hover:text-[#FFE275] transition-colors">
              <Calendar size={20} />
              <span className="lg:text-lg">Events</span>
            </Link>
            <Link href="/projects" className="flex items-center gap-2 hover:text-[#FFE275] transition-colors">
              <Code size={20} />
              <span className="lg:text-lg">Projects</span>
            </Link>
            <Link href="/recruitment" className="flex items-center gap-2 hover:text-[#FFE275] transition-colors">
              <Users size={20} />
              <span className="lg:text-lg">Join Us</span>
            </Link>
            <Link href="/achievements" className="flex items-center gap-2 hover:text-[#FFE275] transition-colors">
              <Award size={20} />
              <span className="lg:text-lg">Achievements</span>
            </Link>
          </div>
        </div>
      </section>

      {/* What's New Section */}
      <section className="py-16 w-full flex bg-gray-100 justify-center">
        <div className="px-4 w-3/4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#2B2B88]">What&apos;s New</h2>
            <Link href="/updates" className="text-[#5CCAE8] hover:text-[#082F3A] flex items-center transition-colors duration-300">
              View all updates <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Card className="cursor-pointer hover:scale-110 transition-transform duration-500">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge className="bg-[#1DA8CE] rounded-3xl">New</Badge>
                  <span className="text-sm text-muted-foreground">May 15, 2023</span>
                </div>
                <CardTitle className="mt-2 lg:text-xl">Hackathon Winners Announced</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Congratulations to Team CodeCrafters for winning the Spring Hackathon with their innovative project on
                  AI-assisted coding.
                </p>
              </CardContent>
              <CardFooter>
                <Link
                  href="/updates/hackathon-winners"
                  className="text-[#1DA8CE] hover:text-[#082F3A] text-sm font-medium transition-colors duration-300"
                >
                  Read more →
                </Link>
              </CardFooter>
            </Card>

            <Card className="cursor-pointer hover:scale-110 transition-transform duration-500">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge className="bg-[#B78A2D] rounded-3xl hover:bg-[#B78A2D]/90">Workshop</Badge>
                  <span className="text-sm text-muted-foreground">May 10, 2023</span>
                </div>
                <CardTitle className="mt-2 lg:text-xl">Web Development Bootcamp</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-start">
                  Join our intensive 3-day bootcamp to learn modern web development with React and Next.js. Perfect for
                  beginners!
                </p>
              </CardContent>
              <CardFooter>
                <Link
                  href="/events/web-dev-bootcamp"
                  className="text-[#1DA8CE] hover:text-[#082F3A] text-sm font-medium transition-colors duration-300"
                >
                  Register now →
                </Link>
              </CardFooter>
            </Card>

            <Card className="cursor-pointer hover:scale-110 transition-transform duration-500">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge className="bg-[#CF2027] rounded-3xl hover:bg-[#CF2027]/90">Guest Talk</Badge>
                  <span className="text-sm text-muted-foreground">May 5, 2023</span>
                </div>
                <CardTitle className="mt-2 lg:text-xl">AI in Software Engineering</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Dr. Priya Sharma from Google will be discussing the impact of AI on modern software engineering
                  practices.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/events/ai-talk" className="text-[#1DA8CE] hover:text-[#082F3A] text-sm font-medium transition-colors duration-300">
                  Learn more →
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 w-full flex justify-center">
        <div className="w-2/3 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-[#2B2B88] mb-8 lg:text-5xl">Gallery</h2>
          <GallerySlider />
        </div>
      </section>

      {/* Upcoming Events & Activities */}
      <section className="py-16 bg-gray-50 w-full flex justify-center">
        <div className="container px-4">
          <Tabs defaultValue="events">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-[#2B2B88] lg:text-4xl">Upcoming Activities</h2>
              <TabsList>
                <TabsTrigger value="events" className="cursor-pointer">Events</TabsTrigger>
                <TabsTrigger value="workshops" className="cursor-pointer">Workshops</TabsTrigger>
                <TabsTrigger value="speakers" className="cursor-pointer">Guest Speakers</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="events" className="mt-0 max-w-full">
              <UpcomingEvents type="event" />
            </TabsContent>

            <TabsContent value="workshops" className="mt-0 max-w-full">
              <UpcomingEvents type="workshop" />
            </TabsContent>

            <TabsContent value="speakers" className="mt-0">
              <UpcomingEvents type="speaker" />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Join the Club */}
      <section className="py-16 bg-[#2B2B88] w-full flex justify-center text-white">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 lg:text-6xl">Join the Coding Club</h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl">
            Become part of a vibrant community of coders, innovators, and problem-solvers. Enhance your skills, work on
            exciting projects, and participate in competitions.
          </p>
          <Button size="lg" className="bg-[#FFE275] hover:bg-[#FFC900]/90 text-[#2B2B88] font-bold transition-colors duration-300 cursor-pointer">
            Apply Now
          </Button>
        </div>
      </section>

      {/* Student Projects Showcase */}
      <section className="py-16 w-full flex justify-center">
        <div className="px-4 w-5/6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-[#2B2B88] lg:text-5xl text">Student Projects</h2>
            <Link href="/projects" className="text-[#1DA8CE] hover:text-[#082F3A] flex items-center transition-colors duration-500">
              View all projects <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden hover:bg-gray-50 transition-all cursor-pointer hover:scale-105 duration-500">
                <div className="relative w-auto h-80">
                  <Image
                    src={`/projects.png`}
                    alt={`Project ${i}`}
                    fill
                    className="object-cover p-3 rounded-2xl"
                  />
                </div>
                <CardHeader>
                  <CardTitle>Smart Campus Navigator</CardTitle>
                  <CardDescription>By Team CodeWizards</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    An AI-powered campus navigation app that helps students find the shortest routes between buildings.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href={`/projects/${i}`} className="text-[#1DA8CE] hover:text-[#082F3A] text-sm font-medium transition-colors duration-300">
                    View project →
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty & Student Highlights */}
      <section className="py-16 bg-gray-50 w-full flex justify-center">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-[#2B2B88] mb-8 lg:text-5xl">Faculty & Student Highlights</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <Card>
              <CardHeader>
                <CardTitle>Faculty Spotlight</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative h-32 w-32 rounded-full overflow-hidden flex-shrink-0 mx-auto md:mx-0">
                    <Image
                      src="/person.jpeg"
                      alt="Professor"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Dr. Rajesh Kumar</h3>
                    <p className="text-sm text-muted-foreground mb-2">Professor, Computer Science</p>
                    <p>
                      Dr. Kumar&apos;s research on distributed systems has been published in top-tier conferences. He
                      recently received the Outstanding Faculty Award.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Student Achiever</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative h-32 w-32 rounded-full overflow-hidden flex-shrink-0 mx-auto md:mx-0">
                    <Image
                      src="/female.jpg"
                      alt="Student"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Ananya Patel</h3>
                    <p className="text-sm text-muted-foreground mb-2">3rd Year, BSc Computer Science</p>
                    <p>
                      Ananya won the National Coding Championship and secured an internship at Microsoft. She leads the
                      club&apos;s competitive programming team.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// text-[#1DA8CE] hover:text-[#082F3A]