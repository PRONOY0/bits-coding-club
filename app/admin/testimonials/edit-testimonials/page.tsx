"use client";
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import Loader from '@/components/Loader/page';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit } from 'lucide-react';
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

// testimonialById

type Testimonial = {
    id?: string;
    name?: string;
    batch?: string;
    feedback?: string;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

const EditTestimonial = () => {
    const { data: session, status } = useSession();
    const [testimonials, SetTestimonials] = useState<Testimonial[]>([]);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await axios.get("/api/testimonials");

                if (!response.data.testimonials || !Array.isArray(response.data.testimonials)) {
                    throw new Error("API did not return an array under 'events' key");
                }

                if (response.status === 200) {
                    SetTestimonials(response.data.testimonials);
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchTestimonials();
    }, [])

    const router = useRouter();

    const EditTestimonial = (id: string | undefined, url: string | undefined) => {

        try {
            if (!id) {
                throw new Error("Id cannot be empty");
            }

            localStorage.setItem("testimonialId", id);

            router.push(`/admin/testimonials/edit-testimonials/${url}`)
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
                    testimonials.length > 0 ?
                        (
                            testimonials.map((Testimonial) => {
                                return (
                                    <Card key={Testimonial.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col h-full">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-xl font-bold truncate">{Testimonial.name}</CardTitle>
                                            <CardDescription>
                                                {Testimonial.batch}
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent className="pb-2 flex-grow">
                                            <div className="w-full h-40 mb-3 rounded overflow-hidden bg-gray-50 flex items-center justify-center">
                                                {Testimonial.image ? (
                                                    <img
                                                        src={Testimonial.image}
                                                        alt={Testimonial.name}
                                                        className="w-max object-cover"
                                                    />
                                                ) : (
                                                    <div className="text-gray-400 text-sm italic">No image</div>
                                                )}
                                            </div>
                                            <div className="overflow-y-auto max-h-16">
                                                <p className="text-sm">{Testimonial.feedback}</p>
                                            </div>
                                        </CardContent>

                                        <CardFooter className="flex justify-between pt-2 mt-auto">
                                            <AlertDialog>
                                                <AlertDialogTrigger className="px-3 py-1 text-sm bg-blue-50 border border-blue-200 text-blue-600 rounded hover:bg-blue-100 transition-colors flex items-center gap-1 cursor-pointer duration-500">Edit <Edit size={16} /></AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Do you really want to edit this Testimonial?
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => EditTestimonial(Testimonial.id, Testimonial.name)} >Continue</AlertDialogAction>
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

export default EditTestimonial
