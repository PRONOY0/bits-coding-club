"use client";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { signIn, useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";

// ✅ Define a Type for Events
interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
}

// ✅ Define API Response Type
interface ApiEvent {
  id: string;
  summary: string;
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
}

export default function GoogleCalendar() {
  const { data: session, status } = useSession();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [popUp, setPopUp] = useState(false);

  useEffect(() => {
    if (status === "loading") return; // 🚀 Wait for session to fully load

    async function fetchEvents() {
      try {
        const res = await fetch("/api/calendar/events");
        
        if (!res.ok) {
          setPopUp(true);
          throw new Error("Failed to fetch events at frontend");
        }

        const data: ApiEvent[] = await res.json();

        console.log("data",data);

        const mappedEvents: CalendarEvent[] = data.map((event) => ({
          id: event.id,
          title: event.summary,
          start: event.start.dateTime || event.start.date || "",
          end: event.end.dateTime || event.end.date || "",
        }));

        setEvents(mappedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    if (status === "authenticated") fetchEvents();
  }, [session, status]);


  return (
    <div className="h-full min-h-screen relative">
      <div className={`w-full h-full max-h-full absolute z-50 bg-black/70 backdrop-blur-xs ${popUp ? "block" : "hidden"}`} />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Club Events</h2>

        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
        />
        {
          popUp ? (<div className="absolute top-1/4 left-[38%] z-50">
            <Card className="w-full shadow-lg flex flex-col items-center p-8">
              <CardHeader className="w-full flex items-center">
                <CardTitle className="text-2xl font-bold">Session Expired</CardTitle>
                <CardDescription>Your session has expired. Please sign in again.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Click the button below to sign in again</p>
              </CardContent>
              <CardFooter className="flex justify-end">
                <button
                  onClick={() => {
                    signIn();
                    setPopUp(false);
                  }}
                  className="px-4 py-2 bg-gray-50 flex items-center gap-5 text-black rounded-lg text-xl font-medium border-2 cursor-pointer"
                >
                  Sign In with Google <FcGoogle />
                </button>
              </CardFooter>
            </Card>
          </div>)
            :
            (
              <></>
            )
        }
      </div>
    </div>
  );
}