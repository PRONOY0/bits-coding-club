import Link from "next/link"
import { CalendarDays, Clock, MapPin } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface EventCardProps {
  title: string
  date: string
  time: string
  location: string
  type: "event" | "workshop" | "speaker"
  slug: string
}

export default function EventCard({ title, date, time, location, type, slug }: EventCardProps) {
  const getBadgeColor = () => {
    switch (type) {
      case "event":
        return "bg-[#5CCAE8] hover:bg-[#5CCAE8]/90 rounded-xl"
      case "workshop":
        return "bg-[#B78A2D] hover:bg-[#B78A2D]/90 rounded-xl"
      case "speaker":
        return "bg-[#CF2027] hover:bg-[#CF2027]/90 rounded-xl"
      default:
        return "bg-primary hover:bg-primary/90 rounded-xl"
    }
  }

  const getTypeLabel = () => {
    switch (type) {
      case "event":
        return "Event"
      case "workshop":
        return "Workshop"
      case "speaker":
        return "Guest Speaker"
      default:
        return "Event"
    }
  }

  return (
    <Card className="cursor-pointer bg-[#fdfdfd] hover:scale-105 transition-transform duration-500">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge className={getBadgeColor()}>{getTypeLabel()}</Badge>
        </div>
        <CardTitle className="mt-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <CalendarDays size={16} className="text-muted-foreground" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-muted-foreground" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-muted-foreground" />
            <span>{location}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/events/${slug}`} className="text-[#1DA8CE] hover:text-[#082F3A] text-sm font-medium transition-all duration-500">
          Learn more →
        </Link>
      </CardFooter>
    </Card>
  )
}

