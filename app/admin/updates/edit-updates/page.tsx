"use client";
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import Loader from '@/components/Loader/page';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { Edit, Calendar } from 'lucide-react';
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


type updates = {
    id?: string;
    title?: string;
    category?: string;
    shortDescription?: string;
    date?: string;
    image?: string;
    content?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const EditUpdates = () => {
    const { data: session, status } = useSession();
    const [updates, SetUpdates] = useState<updates[]>([]);

    useEffect(() => {
        const fetchUpdates = async () => {
            try {
                const response = await axios.get("/api/updates");

                if (!response.data.updates || !Array.isArray(response.data.updates)) {
                    throw new Error("API did not return an array under 'events' key");
                }

                if (response.status === 200) {
                    SetUpdates(response.data.updates);
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchUpdates();
    }, [])

    const router = useRouter();

    const EditEvent = (id: string | undefined, url: string | undefined) => {

        try {
            if (!id) {
                throw new Error("Id cannot be empty");
            }

            localStorage.setItem("id", id);

            router.push(`/admin/updates/edit-updates/${url}`)
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete");
        }
    }

    if (status === "loading") return <div className='w-full h-screen flex justify-center items-center'><Loader /></div>;
    if (!session || session.user.role !== "admin") return <div className='w-full h-full flex justify-center items-center'>
        <Error403 />
    </div>;
    return (
        <div className='w-full h-full overflow-hidden p-5'>
            <ToastContainer />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    updates.length > 0 ?
                        (
                            updates.map((update) => {
                                return (
                                    <Card key={update.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col h-full">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-xl font-bold truncate">{update.title}</CardTitle>
                                            <CardDescription className="text-sm text-gray-500 flex items-center gap-3">
                                                <Calendar size={16} />
                                                {update.date && format(new Date(update.date), 'PPP')}
                                            </CardDescription>
                                            <CardDescription>
                                                Category:&nbsp;&nbsp;<span className='font-medium'>{update.category}</span>
                                            </CardDescription>
                                            <CardDescription>
                                                {update.shortDescription}
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent className="pb-2 flex-grow">
                                            <div className="w-full h-40 mb-3 rounded overflow-hidden bg-gray-50 flex items-center justify-center">
                                                {update.image ? (
                                                    <img
                                                        src={update.image}
                                                        alt={update.title}
                                                        className="w-max object-cover"
                                                    />
                                                ) : (
                                                    <div className="text-gray-400 text-sm italic">No image</div>
                                                )}
                                            </div>
                                            <div className="overflow-y-auto max-h-16">
                                                <p className="text-sm">{update.content}</p>
                                            </div>
                                        </CardContent>

                                        <CardFooter className="flex justify-between pt-2 mt-auto">
                                            <AlertDialog>
                                                <AlertDialogTrigger className="px-3 py-1 text-sm bg-blue-50 border border-blue-200 text-blue-600 rounded hover:bg-blue-100 transition-colors flex items-center gap-1 cursor-pointer duration-500">Edit <Edit size={16} /></AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Do you really want to edit this update?
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => EditEvent(update.id, update.title)} >Continue</AlertDialogAction>
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

export default EditUpdates
