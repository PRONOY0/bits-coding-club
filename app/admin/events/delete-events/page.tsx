"use client";
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import Loader from '@/components/Loader/page';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { Trash2, Calendar, Clock } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Error403 from '@/components/UnAuthenticated/page';


type Event = {
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

const DeleteEvents = () => {
  const { data: session, status } = useSession();
  const [events, SetEvents] = useState<Event[]>([]);

  const AM_PM_Checker = (time: string | undefined) => {
    if (time === undefined) {
      throw new Error("Failed due to type Undefined");
    }
    const [hour, minute] = time.split(":").map(Number);
    console.log(minute);

    if (hour >= 12) {
      return "PM";
    } else {
      return "AM";
    }
  }

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/events");
        console.log("res");
        console.log(response);

        if (!response.data.events || !Array.isArray(response.data.events)) {
          throw new Error("API did not return an array under 'events' key");
        }

        if (response.status === 200) {
          SetEvents(response.data.events);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [])

  const deleteEvent = async (id: string | undefined) => {
    try {
      if (!id) {
        throw new Error("Id cannot be empty");
      }

      const response = await axios.delete(`/api/events/${id}`);
      if (response.status === 200) {
        toast.success("Deleted Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1500)
      }

    } catch (error) {
      console.log(error);
      toast.error("Failed to delete");
    }
  }

  if (status === "loading") return <div className='w-full sm:h-[90vh] md:h-[90vh] lg:h-[90vh] xl:h-[90vh] 2xl:h-[90vh] flex justify-center items-center'><Loader /></div>;
  if (!session || session.user.role !== "admin") return <div className='w-full h-full flex justify-center items-center'>
    <Error403 />
  </div>;
  return (
    <div className='w-full h-full overflow-hidden p-5'>
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          events.length > 0 ?
            (
              events.map((event) => {
                return (
                  <Card key={event.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl font-bold truncate">{event.title}</CardTitle>
                      <CardDescription className="text-sm text-gray-500 flex items-center gap-3">
                        <Calendar size={16} />
                        {event.date && format(new Date(event.date), 'PPP')}
                      </CardDescription>
                      <CardDescription className="text-sm text-gray-500 flex items-center gap-3">
                        <Clock size={16} />
                        {event.time}&nbsp;{AM_PM_Checker(event.time)}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pb-2 flex-grow">
                      <div className="w-full h-40 mb-3 rounded overflow-hidden bg-gray-50 flex items-center justify-center">
                        {event.image ? (
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-max object-cover"
                          />
                        ) : (
                          <div className="text-gray-400 text-sm italic">No image</div>
                        )}
                      </div>
                      <div className="overflow-y-auto max-h-16">
                        <p className="text-sm">{event.content}</p>
                      </div>
                    </CardContent>

                    <CardFooter className="flex justify-between pt-2 mt-auto">
                      <AlertDialog>
                        <AlertDialogTrigger className="px-3 py-1 text-sm bg-red-50 border border-red-200 text-red-600 rounded hover:bg-red-100 transition-colors flex items-center gap-1 cursor-pointer duration-500">Delete <Trash2 size={16} /></AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your event
                              and remove the data from servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteEvent(event.id)} >Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </CardFooter>
                  </Card>
                );
              })
            )
            :
            (
              <div className='col-span-full h-[90vh] flex justify-center items-center'>
                <p className='text-4xl md:text-6xl lg:text-8xl text-gray-300'>No Events</p>
              </div>
            )
        }
      </div>
    </div>
  )
}

export default DeleteEvents
