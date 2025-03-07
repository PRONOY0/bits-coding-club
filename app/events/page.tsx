"use client";
import Link from "next/link"
import { Calendar } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EventCard } from "../../components/index"
import Footer from "@/components/Footer/Footer"

export default function EventsPage() {
  // This would typically come from a database or API
  const upcomingEvents = [
    {
      title: "Competitive Programming Contest",
      date: "June 5, 2023",
      time: "2:00 PM - 6:00 PM",
      location: "Computer Science Lab",
      type: "event" as const,
      slug: "competitive-programming-contest",
    },
    {
      title: "Introduction to Machine Learning",
      date: "June 10, 2023",
      time: "10:00 AM - 1:00 PM",
      location: "Room 302, CS Building",
      type: "workshop" as const,
      slug: "intro-to-ml",
    },
    {
      title: "Future of AI in Software Development",
      date: "June 12, 2023",
      time: "3:00 PM - 4:30 PM",
      location: "Lecture Hall 1",
      type: "speaker" as const,
      slug: "ai-in-software-dev",
    },
    {
      title: "Tech Fest 2023",
      date: "June 15-17, 2023",
      time: "All day",
      location: "Main Auditorium",
      type: "event" as const,
      slug: "tech-fest-2023",
    },
    {
      title: "Web Development with React",
      date: "June 20, 2023",
      time: "2:00 PM - 5:00 PM",
      location: "Computer Lab 2",
      type: "workshop" as const,
      slug: "react-workshop",
    },
    {
      title: "Cybersecurity Best Practices",
      date: "June 25, 2023",
      time: "5:00 PM - 6:30 PM",
      location: "Main Auditorium",
      type: "speaker" as const,
      slug: "cybersecurity-talk",
    },
  ]

  const pastEvents = [
    {
      title: "Python Programming Basics",
      date: "May 15, 2023",
      time: "2:00 PM - 5:00 PM",
      location: "Computer Lab 1",
      type: "workshop" as const,
      slug: "python-basics",
    },
    {
      title: "Spring Hackathon 2023",
      date: "May 10-11, 2023",
      time: "9:00 AM - 9:00 PM",
      location: "Innovation Center",
      type: "event" as const,
      slug: "spring-hackathon",
    },
    {
      title: "Careers in Data Science",
      date: "May 5, 2023",
      time: "4:00 PM - 5:30 PM",
      location: "Lecture Hall 2",
      type: "speaker" as const,
      slug: "data-science-careers",
    },
  ]

  const parseDate = (dateString: string) => {
    // Extracts all valid dates (handles both "June 15, 2023" and "June 15-17, 2023")
    const matches = dateString.match(/\b\w+\s\d{1,2}\b/g);
    const yearMatch = dateString.match(/\d{4}/); // Extracts the year separately
  
    if (!matches || !yearMatch) return 0; // Return 0 if no valid date found
  
    const year = yearMatch[0]; // Extract the year (e.g., "2023")
  
    // If it's a range, take the last date (e.g., "June 15-17, 2023" → "June 17, 2023")
    const lastDate = matches[matches.length - 1].split(" "); // Get last part
    const month = matches[0].split(" ")[0]; // Always take the first month
    
    const fullDateString = `${month} ${lastDate[lastDate.length - 1]}, ${year}`;
    return new Date(fullDateString).getTime();
  };

  const sortedUpcomingEvents = [...upcomingEvents].sort(
    (a, b) => parseDate(b.date) - parseDate(a.date)
  );

  const sortedPastEvents = [...pastEvents].sort(
    (a, b) => parseDate(b.date) - parseDate(a.date)
  );

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
              {sortedUpcomingEvents.map((event, index) => (
                <EventCard
                  key={index}
                  title={event.title}
                  date={event.date}
                  time={event.time}
                  location={event.location}
                  type={event.type}
                  slug={event.slug}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past" className="space-y-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
              {sortedPastEvents.map((event, index) => (
                <EventCard
                  key={index}
                  title={event.title}
                  date={event.date}
                  time={event.time}
                  location={event.location}
                  type={event.type}
                  slug={event.slug}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}

