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

interface UpdatedEventFields {
    title?: string;
    start?: string;
    end?: string;
    eventId: string;
}


export default function EventCalendar() {
    const { data: session, status } = useSession();
    const [calendarView, setCalendarView] = useState("dayGridMonth");
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [originalEvent, setOriginalEvent] = useState<Event | null>(null); // Store original event data
    const [validationError, setValidationError] = useState<string | null>(null);
    console.log(validationError);
    const [formData, setFormData] = useState({ title: "", start: "", end: "" });
    console.log(formData);
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

        setValidationError(null);

        if (selectedEvent) {
            const updatedEvent = {
                ...selectedEvent,
                [name]: value
            };

            // Only validate if both fields have values
            if (updatedEvent.start && updatedEvent.end) {
                const startDate = new Date(updatedEvent.start);
                const endDate = new Date(updatedEvent.end);

                if (endDate <= startDate) {
                    setValidationError("End time must be after start time");
                }
            }
        }
    };

    const handleEdit = async () => {
        if (!selectedEvent) return;

        if (selectedEvent.start && selectedEvent.end) {
            const startDate = new Date(selectedEvent.start);
            const endDate = new Date(selectedEvent.end);

            if (endDate <= startDate) {
                setValidationError("End time must be after start time");
                toast.error("End time must be after start time");
                return;
            }
        }

        // Only include fields that have actually changed in the update
        const updatedFields: UpdatedEventFields = {
            eventId: selectedEvent.id
        };

        if (selectedEvent.title !== originalEvent?.title) {
            updatedFields.title = selectedEvent.title;
        }

        if (selectedEvent.start !== originalEvent?.start) {
            updatedFields.start = new Date(selectedEvent.start).toISOString();
        }

        if (selectedEvent.end !== originalEvent?.end) {
            updatedFields.end = new Date(selectedEvent.end).toISOString();
        }

        // If no fields were changed, just close the modal
        if (Object.keys(updatedFields).length === 1) {
            setSelectedEvent(null);
            return;
        }

        console.log("Editing event", selectedEvent.id, updatedFields);

        try {
            const response = await axios.put(`/api/calendar/events/${selectedEvent.id}`, updatedFields);

            console.log(response);

            if (response.status === 200) {
                toast.success("Event updated successfully");
                setSelectedEvent(null);
                setTimeout(() => {
                    location.reload();
                    setLoader(true);
                }, 1000);
            }
        } catch (error) {
            console.error("Error updating event:", error);
            toast.error("Failed to update event");
            if (axios.isAxiosError(error) && error.response?.data?.error === "End time must be after start time" ||
                axios.isAxiosError(error) && error.response?.data?.error?.includes("time range is empty")) {
                setValidationError("End time must be after start time");
            } else {
                toast.error("Failed to update event");
            }
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
                }, 1000);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete event");
        }
    }

    useEffect(() => {
        if (window.innerWidth < 768) {
            setCalendarView("listWeek"); // Switch to list view on mobile
        }
    }, []);

    if (status === "loading") return <div className='w-full sm:h-[90vh] md:h-[90vh] lg:h-[90vh] xl:h-[90vh] 2xl:h-[90vh] flex justify-center items-center'><Loader /></div>;
    if (!session || session.user.role !== "admin") return <div className='w-full h-full flex justify-center items-center'><Error403 /></div>;

    return (
        <div className="p-4 w-full h-full">
            {
                loader ?
                    (
                        <div className='w-full sm:h-[90vh] md:h-[90vh] lg:h-[90vh] xl:h-[90vh] 2xl:h-[90vh] flex justify-center items-center'><Loader /></div>
                    )
                    :
                    (
                        (
                            <div>
                                <FullCalendar
                                    plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
                                    initialView={calendarView}
                                    events={events}
                                    eventClick={({ event }) => {
                                        const eventData = {
                                            id: event.id,
                                            title: event.title,
                                            start: event.start ? format(new Date(event.start), "yyyy-MM-dd'T'HH:mm") : "",
                                            end: event.end ? format(new Date(event.end), "yyyy-MM-dd'T'HH:mm") : "",
                                        };
                                        setSelectedEvent(eventData);
                                        setOriginalEvent(eventData); // Store original data for comparison
                                        setFormData({
                                            title: eventData.title,
                                            start: eventData.start,
                                            end: eventData.end
                                        });
                                    }}
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

                                {selectedEvent && (
                                    <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit Event</DialogTitle>
                                            </DialogHeader>

                                            <CardContent>
                                                <Label>Title</Label>
                                                <Input name="title" value={selectedEvent.title} onChange={handleInputChange} className="mb-5 mt-2" />

                                                <Label>Start Date & Time</Label>
                                                <Input name="start" type="datetime-local" value={selectedEvent.start} onChange={handleInputChange} className="mb-5 mt-2" />

                                                <Label>End Date & Time</Label>
                                                <Input name="end" type="datetime-local" value={selectedEvent.end} onChange={handleInputChange} className="mb-5 mt-2" />

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