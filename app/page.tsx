"use client";
import Link from "next/link"
import Image from "next/image"
import { Calendar, Code, Users, ChevronRight, Newspaper, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import GallerySlider from "@/components/gallery-slider"
import Footer from "@/components/Footer/Footer"
import { useAppContext } from "@/context/page";
import Error403 from "@/components/UnAuthenticated/page";
import Loader from "@/components/Loader/page";
import { useState } from "react";

export default function Home() {
  const { updates, projects, events, loading, error } = useAppContext();
  const [type, setType] = useState("event");

  if (loading) return <div className="w-full sm:h-[90vh] md:h-[90vh] lg:h-[90vh] xl:h-[90vh] 2xl:h-[90vh] flex justify-center items-center"><Loader /></div>;
  if (error) return <div><Error403 /></div>;

  const getCategoryColorClass = (category: string) => {
    switch (category.toLowerCase()) {
      case 'guest speaker': return 'bg-[#CF2027]';
      case 'opportunity': return 'bg-[#B78A2D]';
      case 'announcement': return 'bg-[#2B2B88]';
      case 'event': return 'bg-[#5CCAE8]';
      default: return 'bg-[#5CCAE8]';
    }
  };

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="flex flex-col items-center min-h-screen w-full overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative w-full h-[70vh] bg-gradient-to-r from-[#2B2B88] to-[#5CCAE8] md:p-20">
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-20 gap-y-5">
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
            <Link href="/updates" className="flex items-center gap-2 hover:text-[#FFE275] transition-colors">
              <Newspaper size={20} />
              <span className="lg:text-lg">Updates</span>
            </Link>
          </div>
        </div>
      </section>

      {/* What's New Section */}
      <section className="py-16 w-full flex bg-gray-100 justify-center md:p-10">
        <div className="px-4 md:w-full lg:w-full xl:w-full 2xl:w-3/4 w-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl md:text-4xl font-bold text-[#2B2B88]">What&apos;s New</h2>
            <Link href="/updates" className="text-[#5CCAE8] hover:text-[#082F3A] flex items-center transition-colors duration-300">
              View Updates <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {
              updates.slice(0, 3).map((update) => {
                return (
                  <Card key={update.id} className="cursor-pointer hover:scale-110 transition-transform duration-500">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge className={`rounded-3xl ${getCategoryColorClass(update.category!)}`}>{update.category}</Badge>
                        <span className="text-sm text-muted-foreground">{formatDate(update.date!)}</span>
                      </div>
                      <CardTitle className="mt-2 lg:text-xl">{update.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>
                        {
                          update.shortDescription
                        }
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link
                        href={`/updates/${update.id}`}
                        className="text-[#1DA8CE] hover:text-[#082F3A] text-sm font-medium transition-colors duration-300"
                      >
                        Read more →
                      </Link>
                    </CardFooter>
                  </Card>
                )
              })
            }
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 w-full flex justify-center">
        <div className="w-full md:w-2/3 flex flex-col items-center">
          <h2 className="text-4xl md:text-3xl font-bold text-[#2B2B88] mb-8 lg:text-5xl">Gallery</h2>
          <GallerySlider />
        </div>
      </section>

      {/* Upcoming Events & Activities */}
      <section className="py-16 bg-gray-50 w-full flex justify-center md:p-10">
        <div className="container px-4">
          <Tabs defaultValue="events">
            <div className="flex-col flex md:flex-row items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-[#2B2B88] lg:text-5xl">Upcoming Activities</h2>

              <TabsList className="mt-5">
                <TabsTrigger value="events" className="cursor-pointer" onClick={() => setType("event")}>Events</TabsTrigger>
                <TabsTrigger value="workshops" className="cursor-pointer" onClick={() => setType("workshop")}>Workshops</TabsTrigger>
                <TabsTrigger value="speakers" className="cursor-pointer" onClick={() => setType("guest speaker")}>Guest Speakers</TabsTrigger>
              </TabsList>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {
                events
                  .filter(event => event.category?.toLowerCase() === type)
                  .slice(0, 3)
                  .map((event) => {
                    return (
                      <Card key={event.id} className="cursor-pointer hover:scale-110 transition-transform duration-500 gap-2">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <Badge className={`rounded-3xl ${getCategoryColorClass(event.category!)}`}>{event.category}</Badge>
                          </div>
                          <CardTitle className="mt-2 lg:text-xl">{event.title}</CardTitle>
                        </CardHeader>

                        <CardContent>
                          <span className="text-sm text-muted-foreground flex gap-2 items-center"> <Calendar size={18} className="hidden md:block" /> {formatDate(event.date!)}</span>
                        </CardContent>

                        <CardContent>
                          <span className="text-sm text-muted-foreground flex gap-2 items-center"> <Clock size={18} className="hidden md:block" /> {(event.time!)}</span>
                        </CardContent>

                        <CardContent className="mt-2">
                          <p>
                            {`
                            ${event?.content?.slice(0, 150)}...
                          `}
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Link
                            href={`/events/${event.id}`}
                            className="text-[#1DA8CE] hover:text-[#082F3A] text-sm font-medium transition-colors duration-300"
                          >
                            Read more →
                          </Link>
                        </CardFooter>
                      </Card>
                    )
                  })
              }
            </div>
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
        <div className="px-4 w-full lg:p-28">
          <div className="flex-col items-start md:flex-row flex md:items-center justify-between mb-8 w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2B2B88] lg:text-5xl text">Student Projects</h2>

            <Link href="/projects" className="text-[#1DA8CE] hover:text-[#082F3A] flex items-center gap-2 transition-colors duration-500">
              <p className="w-max">View all projects</p>
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((project) => (
              <Card key={project.id} className="overflow-hidden hover:bg-gray-50 transition-all cursor-pointer hover:scale-105 duration-500">
                <div className="relative w-auto h-80">
                  <Image
                    src={project.image!}
                    alt={`Project ${project.image}`}
                    fill
                    className="object-cover p-3 rounded-2xl"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>By {project.teamName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    {
                      project.description?.slice(0, 150)
                    }
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href={`/projects/${project.id}`} className="text-[#1DA8CE] hover:text-[#082F3A] text-sm font-medium transition-colors duration-300">
                    View project →
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
