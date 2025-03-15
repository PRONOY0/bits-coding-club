"use client";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { signIn, useSession } from "next-auth/react";
import listPlugin from "@fullcalendar/list";
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
  const [calendarView, setCalendarView] = useState("dayGridMonth");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [popUp, setPopUp] = useState(false);

  useEffect(() => {
    if (status === "loading") return; // 🚀 Wait for session to fully load

    async function fetchEvents() {
      try {
        const res = await fetch("/api/calendar/events");
        console.log("res",res);

        if (!res.ok) {
          setPopUp(true);
          throw new Error("Failed to fetch events at frontend");
        }

        const data: ApiEvent[] = await res.json();

        console.log("data", data);

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

    fetchEvents();
  }, [status,session]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setCalendarView("listWeek"); // Switch to list view on mobile
    }
  }, []);

  return (
    <div className="h-full min-h-screen relative">
      <div className={`w-full h-full max-h-full absolute z-50 bg-black/70 backdrop-blur-xs ${popUp ? "block" : "hidden"}`} />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Club Events</h2>

        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
          initialView={calendarView}
          events={events}
          eventDisplay="list-item"
          height="auto"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,listWeek",
          }}
          buttonText={{
            today: "Today",
          }}
        />
        {
          popUp ? (<div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
            <Card className="w-full max-w-md shadow-xl animate-fade-in text-center">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl font-bold">Session Expired</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Your session has expired. Please sign in again.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-gray-700 text-sm sm:text-base">
                  Click the button below to sign in again
                </p>
              </CardContent>

              <CardFooter className="flex justify-center pt-2 pb-4">
                <button
                  onClick={() => {
                    signIn();
                    setPopUp(false);
                  }}
                  className="px-6 py-2 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-center gap-3 text-black rounded-lg text-sm sm:text-base font-medium border-2 cursor-pointer"
                >
                  Sign In with Google <FcGoogle className="text-xl sm:text-2xl" />
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