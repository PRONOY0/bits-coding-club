"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { ArrowLeft, Calendar, Clock, Share2, User } from "lucide-react";
import { Event } from "@prisma/client";
import Loader from "@/components/Loader/page";
import { toast } from "react-toastify";

const EventsById = () => {
  const router = useRouter();
  const pathname = usePathname();
  const eventId = pathname.split("/")[2];
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Function to check if event is upcoming
  const isEventUpcoming = (eventDate: Date) => {
    return new Date(eventDate) > new Date();
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`/api/events/${eventId}`);
        if (response.status === 200) {
          setEvent(response.data.event);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch event details");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  const handleBack = () => {
    router.push("/events");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event?.title,
        text: `Check out this event: ${event?.title}`,
        url: window.location.href,
      }).catch(err => console.error('Error sharing:', err));
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) return <div className="w-full h-[90vh] flex justify-center items-center"><Loader /></div>;
  if (!event) return <div className="p-8 text-center">Event not found</div>;

  const isUpcoming = isEventUpcoming(event.date);
  const eventDate = new Date(event.date);

  // Calculate days remaining for countdown
  const daysRemaining = isUpcoming ?
    Math.ceil((eventDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header with navigation */}
      <div className="bg-white sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <button
            onClick={handleBack}
            className="flex items-center cursor-pointer text-gray-700 hover:text-[#cf2027] transition font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back to events</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition"
          >
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {/* Hero Section with improved layout */}
      <div className="relative h-72 sm:h-80 md:h-96 lg:h-112 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: `url(${event.image || '/placeholder.jpg'})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-2 items-center mb-3">
              <span className="bg-[#5CCAE8] text-white px-3 py-1 rounded-full text-sm font-medium">
                {event.category}
              </span>

              {isUpcoming ? (
                <span className="bg-[#2B2B88] text-white px-3 py-1 rounded-full text-sm font-medium">
                  Upcoming
                </span>
              ) : (
                <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Past Event
                </span>
              )}
            </div>

            <h1 className="text-white text-3xl md:text-5xl font-bold mt-2 drop-shadow-md">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Main content with new layout */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Event details - main content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Date and time banner */}
              <div className="bg-gradient-to-r from-[#CF2027] to-[#CF2027] p-5 text-white">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-3 opacity-90" />
                    <div>
                      <p className="font-semibold">{formatDate(event.date)}</p>
                      <p className="text-sm text-white/80">
                        {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-3 opacity-90" />
                    <div>
                      <p className="font-semibold">{event.time}</p>
                      <p className="text-sm text-white/80">Local time</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event content */}
              <div className="p-6 md:p-8">
                <div className="prose max-w-none">
                  {event.content ? (
                    <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                      {event.content}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No additional details available for this event.</p>
                  )}
                </div>
              </div>

              {/* Event metadata */}
              <div className="border-t border-gray-100 px-6 md:px-8 py-4 bg-gray-50 text-sm text-gray-500">
                <div className="flex flex-wrap gap-x-8 gap-y-2">
                  <span>Posted: {formatDate(event.createdAt)}</span>
                  {event.updatedAt > event.createdAt && (
                    <span>Updated: {formatDate(event.updatedAt)}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Countdown card for upcoming events */}
            {isUpcoming && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
                  <h3 className="font-bold text-lg">Countdown</h3>
                </div>
                <div className="p-6 text-center">
                  <div className="text-5xl font-bold text-indigo-600 mb-2">{daysRemaining}</div>
                  <p className="text-gray-600">
                    {daysRemaining === 1 ? 'day' : 'days'} remaining
                  </p>
                  <div className="mt-6 text-sm text-gray-500">
                    Mark your calendar for {formatDate(event.date)}
                  </div>
                </div>
              </div>
            )}

            {/* Quick info card */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="bg-gray-50 p-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-800">Event Details</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium text-gray-800">{formatDate(event.date)}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-medium text-gray-800">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <User className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium text-gray-800">{event.category}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsById;