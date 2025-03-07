"use client";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useSession } from "next-auth/react";
import SignInOutButton from "@/components/signInOutButton/page";

// ✅ Define a Type for Events
interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
}

export default function GoogleCalendar() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<CalendarEvent[]>([]); // ✅ Type Safe State

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/calendar/events");
        const data: CalendarEvent[] = await res.json();
        console.log("Fetched Data:", data);

        setEvents(
          data?.map((event) => ({
            id: event.id,
            title: event.title || "Untitled Event",
            start: event.start,
            end: event.end,
          }))
        );
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Club Events</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events} // ✅ No need for EventInput, since we typed it correctly
        editable={session?.user?.role === "admin"}
        selectable={session?.user?.role === "admin"}

        // ✅ CREATE EVENT
        select={async (info) => {
          if (session?.user?.role !== "admin") return;

          const title = prompt("Enter event title:");
          if (!title) return;

          const newEvent: CalendarEvent = {
            id: crypto.randomUUID(), // ✅ Generate a Unique ID
            title,
            start: info.startStr,
            end: info.endStr,
          };

          try {
            const res = await fetch("/api/calendar/events", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newEvent),
            });

            if (res.ok) {
              const createdEvent: CalendarEvent = await res.json();
              setEvents((prevEvents) => [...prevEvents, createdEvent]);
            }
          } catch (error) {
            console.error("Error creating event:", error);
          }
        }}

        // ✅ EDIT EVENT
        eventDrop={async (info) => {
          if (session?.user?.role !== "admin") return;

          const updatedEvent: CalendarEvent = {
            id: info.event.id,
            title: info.event.title || "Untitled Event",
            start: info.event.startStr,
            end: info.event.endStr,
          };

          try {
            const res = await fetch(`/api/calendar/events/${info.event.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updatedEvent),
            });

            if (res.ok) {
              setEvents((prevEvents) =>
                prevEvents.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
              );
            }
          } catch (error) {
            console.error("Error updating event:", error);
          }
        }}

        // ✅ DELETE EVENT
        eventClick={async (info) => {
          if (session?.user?.role !== "admin") return;

          if (confirm("Delete this event?")) {
            try {
              const res = await fetch(`/api/calendar/events/${info.event.id}`, {
                method: "DELETE",
              });

              if (res.ok) {
                setEvents((prevEvents) => prevEvents.filter((e) => e.id !== info.event.id));
              }
            } catch (error) {
              console.error("Error deleting event:", error);
            }
          }
        }}
      />
      <SignInOutButton />
    </div>
  );
}
