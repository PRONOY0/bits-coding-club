"use client";
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Footer from "@/components/Footer/Footer";
import { useAppContext } from "@/context/page";
import Loader from "@/components/Loader/page";
import { useState } from "react";

export default function UpdatesPage() {
  const { updates, loading } = useAppContext();
  const [loadMore, setLoadMore] = useState(false);

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "Announcement":
        return <Badge className="bg-[#5CCAE8] hover:bg-[#5CCAE8]/90">Announcement</Badge>
      case "Event":
        return <Badge className="bg-[#B78A2D] hover:bg-[#B78A2D]/90">Event</Badge>
      case "Guest Speaker":
        return <Badge className="bg-[#CF2027] hover:bg-[#CF2027]/90">Guest Speaker</Badge>
      case "Opportunity":
        return <Badge className="bg-[#2B2B88] hover:bg-[#2B2B88]/90">Opportunity</Badge>
      default:
        return <Badge>Other</Badge>
    }
  }
  return (
    <div className="w-full">
      {
        loading ?
          (<div className="w-full h-[90vh] flex justify-center items-center">
            <Loader />
          </div>
          )
          :
          (
            <>
              <div className="w-full px-5 md:px-8 lg:px-8 xl:px-8 2xl:px-64 py-24 flex flex-col">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                  <div>
                    <h1 className="text-3xl font-bold text-[#2B2B88] lg:text-5xl">What&apos;s New</h1>
                    <p className="text-muted-foreground mt-2">Stay updated with the latest news, events, and opportunities</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {
                    loadMore ?
                      (
                        updates.slice(0, 9).map((update) => (
                          <Card key={update.id} className="overflow-hidden flex flex-col hover:bg-[#999]/10 transition-all duration-500 hover:scale-105">
                            <div className="relative h-72 w-full">
                              <Image src={update.image || "/projects.png"} alt={update.title!} fill className="object-cover p-5 rounded-3xl" />
                            </div>
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                {getCategoryBadge(update.category!)}
                                <span className="text-sm text-muted-foreground">{formatDate(update.date!)}</span>
                              </div>
                              <CardTitle className="mt-2">{update.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                              <p>{update.shortDescription}</p>
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
                        ))
                      )
                      :
                      (
                        updates.slice(0, 6).map((update) => (
                          <Card key={update.id} className="overflow-hidden flex flex-col hover:bg-[#999]/10 transition-all duration-500 hover:scale-105">
                            <div className="relative h-72 w-full">
                              <Image src={update.image || "/projects.png"} alt={update.title!} fill className="object-cover p-5 rounded-3xl" />
                            </div>
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                {getCategoryBadge(update.category!)}
                                <span className="text-sm text-muted-foreground">{formatDate(update.date!)}</span>
                              </div>
                              <CardTitle className="mt-2">{update.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                              <p>{update.shortDescription}</p>
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
                        ))
                      )
                  }
                </div>

                <div className="mt-12 flex justify-center cursor-pointer">
                  <Button variant="outline" onClick={() => setLoadMore((prev) => !prev)}>
                    {
                      loadMore ? "Collapse" : "Load More"
                    }
                  </Button>
                </div>
              </div>

              <Footer />
            </>
          )
      }
    </div>
  )
}

