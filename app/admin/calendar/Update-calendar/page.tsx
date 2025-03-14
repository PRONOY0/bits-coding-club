"use client";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import Error403 from "@/components/UnAuthenticated/page";
import Loader from "@/components/Loader/page";
import listPlugin from "@fullcalendar/list";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import axios from "axios";
import { toast } from "sonner";

interface Event {
    id: string;
    title: string;
    start: string;
    end: string;
}

export default function EventCalendar() {
    const { data: session, status } = useSession();
    const [calendarView, setCalendarView] = useState("dayGridMonth");
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [formData, setFormData] = useState({ title: "", start: "", end: "" });
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const res = await fetch("/api/calendar/events");
                if (!res.ok) throw new Error("Failed to fetch events");
                const data = await res.json();

                // Ensure correct event structure
                const formattedEvents = data.map((event: { id: string; summary: string; start: { dateTime: string }; end: { dateTime: string } }) => ({
                    id: event.id,
                    title: event.summary || "Untitled Event",
                    start: event.start ? format(new Date(event.start.dateTime), "yyyy-MM-dd'T'HH:mm") : "",
                    end: event.end ? format(new Date(event.end.dateTime), "yyyy-MM-dd'T'HH:mm") : "",
                }));

                setEvents(formattedEvents);
            } catch (error) {
                console.log(error);
            }
        }
        if (status === "authenticated") fetchEvents();
    }, [status]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setSelectedEvent((prev) => prev ? { ...prev, [name]: value } : null);
    };

    const handleEdit = async () => {
        const formattedEvent = {
            title: formData.title,
            start: new Date(formData.start).toISOString(),
            end: new Date(formData.start).toISOString(),
            eventId: selectedEvent?.id,
        };
        console.log("Editing event", selectedEvent?.id, formattedEvent);

        try {
            const response = await axios.put(`/api/calendar/events/${selectedEvent?.id}`, formattedEvent);

            console.log(response)

            if (response.status === 200) {
                toast.success("success edit");
                setSelectedEvent(null);
                setTimeout(() => {
                    location.reload();
                    setLoader(true);
                }, 1000)
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`/api/calendar/events/${selectedEvent?.id}`);

            if (response.status === 200) {
                toast.success("Deleted successfully");
                setSelectedEvent(null);
                setTimeout(() => {
                    location.reload();
                    setLoader(true);
                }, 1000)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (window.innerWidth < 768) {
            setCalendarView("listWeek"); // Switch to list view on mobile
        }
    }, []);

    if (status === "loading") return <div className='w-full min-h-[85vh] flex justify-center items-center'><Loader /></div>;
    if (!session || session.user.role !== "admin") return <div className='w-full h-full flex justify-center items-center'><Error403 /></div>;

    return (
        <div className="p-4 w-full h-full">
            {
                loader ?
                    (
                        <div className='w-full min-h-[85vh] flex justify-center items-center'><Loader /></div>
                    )
                    :
                    (
                        (
                            <div>
                                <FullCalendar
                                    plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
                                    initialView={calendarView}
                                    events={events}
                                    eventClick={({ event }) => setSelectedEvent({
                                        id: event.id,
                                        title: event.title,
                                        start: event.start ? format(new Date(event.start), "yyyy-MM-dd'T'HH:mm") : "",
                                        end: event.start ? format(new Date(event.start ?? ""), "yyyy-MM-dd'T'HH:mm") : format(new Date(event.start ?? ""), "yyyy-MM-dd'T'HH:mm"),
                                    })}
                                    headerToolbar={{
                                        left: "prev,next today",
                                        center: "title",
                                        right: "dayGridMonth,listWeek",
                                    }}
                                    buttonText={{
                                        today: "Today",
                                    }}
                                    eventDisplay="list-item"
                                    height="auto"
                                />

                                {/* Modal for event details */}
                                {selectedEvent && (
                                    <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit Event</DialogTitle>
                                            </DialogHeader>

                                            <CardContent>
                                                <Label>Title</Label>
                                                <Input name="title" value={selectedEvent.title} onChange={handleInputChange} className="mb-5 mt-2" />

                                                <Label>Date</Label>
                                                <Input name="start" type="datetime-local" value={selectedEvent.start} onChange={handleInputChange} className="mb-5 mt-2" />

                                                <div className="flex gap-4 mt-4">
                                                    <Button variant="outline" onClick={handleEdit} className="cursor-pointer">Edit</Button>

                                                    <Button variant="destructive" onClick={handleDelete} className="cursor-pointer">Delete</Button>
                                                </div>
                                            </CardContent>
                                        </DialogContent>
                                    </Dialog>
                                )}
                            </div>
                        )
                    )
            }
        </div>
    );
}
