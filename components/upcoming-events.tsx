import { EventCard } from "../components/index"

interface UpcomingEventsProps {
  type: "event" | "workshop" | "speaker"
}

export default function UpcomingEvents({ type }: UpcomingEventsProps) {
  // This would typically come from a database or API
  const events = {
    event: [
      {
        title: "Programming Contest",
        date: "June 5, 2023",
        time: "2:00 PM - 6:00 PM",
        location: "Computer Science Lab",
        slug: "competitive-programming-contest",
      },
      {
        title: "Tech Fest 2023",
        date: "June 15-17, 2023",
        time: "All day",
        location: "Main Auditorium",
        slug: "tech-fest-2023",
      },
      {
        title: "Hackathon",
        date: "July 8-9, 2023",
        time: "9:00 AM - 9:00 PM",
        location: "Innovation Center",
        slug: "code-for-change-hackathon",
      },
    ],
    workshop: [
      {
        title: "Introduction to Machine Learning",
        date: "June 10, 2023",
        time: "10:00 AM - 1:00 PM",
        location: "Room 302, CS Building",
        slug: "intro-to-ml",
      },
      {
        title: "Web Development with React",
        date: "June 20, 2023",
        time: "2:00 PM - 5:00 PM",
        location: "Computer Lab 2",
        slug: "react-workshop",
      },
      {
        title: "Mobile App Development",
        date: "July 5, 2023",
        time: "11:00 AM - 4:00 PM",
        location: "Innovation Hub",
        slug: "mobile-app-dev",
      },
    ],
    speaker: [
      {
        title: "Future of AI in Software Development",
        date: "June 12, 2023",
        time: "3:00 PM - 4:30 PM",
        location: "Lecture Hall 1",
        slug: "ai-in-software-dev",
      },
      {
        title: "Cybersecurity Best Practices",
        date: "June 25, 2023",
        time: "5:00 PM - 6:30 PM",
        location: "Main Auditorium",
        slug: "cybersecurity-talk",
      },
      {
        title: "Career Paths in Tech Industry",
        date: "July 15, 2023",
        time: "4:00 PM - 5:30 PM",
        location: "Seminar Hall",
        slug: "tech-career-paths",
      },
    ],
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:p-1">
      {events[type].map((event, index) => (
        <EventCard
          key={index}
          title={event.title}
          date={event.date}
          time={event.time}
          location={event.location}
          type={type}
          slug={event.slug}
        />
      ))}
    </div>
  )
}

