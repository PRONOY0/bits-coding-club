"use client";
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Footer from "@/components/Footer/Footer"
import { useAppContext } from "@/context/page";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type EventType = {
  id?: string;
  title?: string;
  category?: string;
  content?: string;
  image?: string;
  date?: Date;
  time?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export default function EventsPage() {
  // This would typically come from a database or API

  const { events, loading } = useAppContext();

  console.log("Event Category:", events);

  const filterEventsByDate = (events: EventType[]) => {
    const currentDate = new Date(); // Current date and time

    // Convert event date string to Date object and compare it
    const upcomingEvents = events.filter((event) => {
      const eventDate = new Date(event.date!); // Convert event date to Date object
      return eventDate > currentDate; // Filter for events that are after the current date
    });

    const pastEvents = events.filter((event) => {
      const eventDate = new Date(event.date!);
      return eventDate <= currentDate; // Filter for events that are on or before the current date
    });

    return { upcomingEvents, pastEvents };
  };

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const { upcomingEvents, pastEvents } = filterEventsByDate(events);

  console.log(upcomingEvents);
  console.log(pastEvents);

  const getCategoryColorClass = (category: string) => {
    switch (category.toLowerCase()) {
      case 'guest speaker': return 'bg-[#CF2027]';
      case 'opportunity': return 'bg-[#B78A2D]';
      case 'announcement': return 'bg-[#2B2B88]';
      case 'event': return 'bg-[#5CCAE8]';
      default: return 'bg-[#5CCAE8]';
    }
  };

  return (
    <div className="w-full">
      <div className="w-full px-64 py-24 flex flex-col">
        <div className=" w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold lg:text-5xl text-[#2B2B88]">Events & Activities</h1>
            <p className="text-muted-foreground mt-2">
              Discover workshops, competitions, and guest talks organized by the BITS Pilani Coding Club
            </p>
          </div>
          <Link
            href="/events/calendar"
            className="flex items-center gap-2 bg-[#2B2B88] text-white px-4 py-2 rounded-md hover:bg-[#2B2B88]/90 transition-colors"
          >
            <Calendar size={18} />
            <span>View Calendar</span>
          </Link>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="upcoming" className="cursor-pointer">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past" className="cursor-pointer">Past Events</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-8 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
              {upcomingEvents.map((event) => {
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
              })}
            </div>
          </TabsContent>

          <TabsContent value="past" className="space-y-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
              {pastEvents.map((event) => (
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
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}

