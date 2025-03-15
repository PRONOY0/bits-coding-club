"use client";
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import Loader from '@/components/Loader/page';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Link } from 'lucide-react';
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
import { FiGithub } from 'react-icons/fi';
import Error403 from '@/components/UnAuthenticated/page';


type Project = {
    id?: string;
    title?: string;
    description?: string;
    image?: string;
    teamName?: string;
    liveLink?: string;
    gitHubLink?: string;
    tags?: string[];
    content?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

const EditEvents = () => {
    const { data: session, status } = useSession();
    const [projects, SetProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("/api/projects");

                if (!response.data.projects || !Array.isArray(response.data.projects)) {
                    throw new Error("API did not return an array under 'events' key");
                }

                if (response.status === 200) {
                    SetProjects(response.data.projects);
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, [])

    const router = useRouter();

    const EditEvent = (id: string | undefined, url: string | undefined) => {

        try {
            if (!id) {
                throw new Error("Id cannot be empty");
            }

            localStorage.setItem("id", id);

            router.push(`/admin/projects/edit-projects/${url}`)
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
                    projects.length > 0 ?
                        (
                            projects.map((project) => {
                                return (
                                    <Card key={project.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col h-full">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-xl font-bold truncate">{project.title}</CardTitle>
                                            <CardDescription>
                                                {project.description}
                                            </CardDescription>

                                            <CardDescription>
                                                [{project.tags?.join(", ")}]
                                            </CardDescription>

                                            <CardDescription className='flex gap-5'>
                                                {project.teamName}
                                            </CardDescription>

                                            <CardDescription className='flex gap-5'>
                                                <a href={project.liveLink} className='text-black'><Link size={20} /></a>
                                                <a href={project.gitHubLink} className='text-black'>
                                                    <FiGithub className='text-2xl' />
                                                </a>
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent className="pb-2 flex-grow">
                                            <div className="w-full h-40 mb-3 rounded overflow-hidden bg-gray-50 flex items-center justify-center">
                                                {project.image ? (
                                                    <img
                                                        src={project.image}
                                                        alt={project.title}
                                                        className="w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="text-gray-400 text-sm italic">No image</div>
                                                )}
                                            </div>
                                            <div className="overflow-y-auto max-h-16">
                                                <p className="text-sm">{project.content}</p>
                                            </div>
                                        </CardContent>

                                        <CardFooter className="flex justify-between pt-2 mt-auto">
                                            <AlertDialog>
                                                <AlertDialogTrigger className="px-3 py-1 text-sm bg-blue-50 border border-blue-200 text-blue-600 rounded hover:bg-blue-100 transition-colors flex items-center gap-1 cursor-pointer duration-500">Edit <Edit size={16} /></AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Do you really want to edit this project?
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => EditEvent(project.id, project.title)} >Continue</AlertDialogAction>
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

export default EditEvents
