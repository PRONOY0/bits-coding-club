"use client";
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import Loader from '@/components/Loader/page';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { Trash2, Calendar } from 'lucide-react';
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

const Deleteupdates = () => {
    const { data: session, status } = useSession();
    const [updates, SetUpdates] = useState<updates[]>([]);

    useEffect(() => {
        const fetchUpdates = async () => {
            try {
                const response = await axios.get("/api/updates");
                console.log("res");
                console.log(response);

                if (!response.data.updates || !Array.isArray(response.data.updates)) {
                    throw new Error("API did not return an array under 'updates' key");
                }

                if (response.status === 200) {
                    SetUpdates(response.data.updates);
                }
            } catch (error) {
                console.error("Error fetching updates:", error);
            }
        };

        fetchUpdates();
    }, [])

    const deleteUpdates = async (id: string | undefined) => {
        try {
            if (!id) {
                throw new Error("Id cannot be empty");
            }

            const response = await axios.delete(`/api/updates/${id}`);
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
                                            <CardDescription className="overflow-y-auto max-h-16">
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
                                                <AlertDialogTrigger className="px-3 py-1 text-sm bg-red-50 border border-red-200 text-red-600 rounded hover:bg-red-100 transition-colors flex items-center gap-1 cursor-pointer duration-500">Delete <Trash2 size={16} /></AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete your update
                                                            and remove the data from servers.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => deleteUpdates(update.id)} >Continue</AlertDialogAction>
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
                                <p className='text-4xl md:text-6xl lg:text-8xl text-gray-300'>No updates</p>
                            </div>
                        )
                }
            </div>
        </div>
    )
}

export default Deleteupdates
