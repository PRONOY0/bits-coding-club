"use client";
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import Loader from '@/components/Loader/page';
import Error403 from '@/components/UnAuthenticated/page';

type Project = {
    id?: string;
    title?: string;
    description?: string;
    image?: string;
    teamName?: string;
    liveLink?: string;
    gitHubLink?: string;
    type?: string;
    tags?: string[];
    content?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

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

type Testimonial = {
    id?: string;
    name?: string;
    batch?: string;
    feedback?: string;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

type Gallery = {
    id?: string;
    images?: string;
};

type ApiResponseForProject = {
    projects: Project[];
}

type ApiResponseFormUpdates = {
    updates: updates[];
}

type ApiResponseFormTestimonial = {
    testimonials: Testimonial[];
}

type ApiResponseFormEvents = {
    events: Event[];
}

type ApiResponseFormGallery = {
    gallery: Gallery[];
}

const Admin = () => {
    const { data: session, status } = useSession();

    const [projects, SetProjects] = useState<Project[]>([]);
    const [updates, SetUpdates] = useState<updates[]>([]);
    const [testimonials, SetTestimonials] = useState<Testimonial[]>([]);
    const [events, SetEvents] = useState<Event[]>([]);
    const [gallery, SetGallery] = useState<Gallery[]>([]);

    const apiUrls = ["/api/projects", "/api/updates", "/api/testimonials", "/api/events", "/api/Gallery"];

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(apiUrls[0]);
                if (!response.ok) throw new Error("Failed to fetch projects");

                const data: ApiResponseForProject = await response.json();
                console.log("Fetched Data:", data);

                if (!data.projects || !Array.isArray(data.projects)) {
                    throw new Error("API did not return an array under 'projects' key");
                }

                SetProjects(data.projects);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        const fetchUpdates = async () => {
            try {
                const response = await fetch(apiUrls[1]);
                if (!response.ok) throw new Error("Failed to fetch updates");

                const data: ApiResponseFormUpdates = await response.json();
                console.log("Fetched Data:", data);

                if (!data.updates || !Array.isArray(data.updates)) {
                    throw new Error("API did not return an array under 'update' key");
                }

                SetUpdates(data.updates);
            } catch (error) {
                console.error("Error fetching updates:", error);
            }
        };

        const fetchTestimonials = async () => {
            try {
                const response = await fetch(apiUrls[2]);
                if (!response.ok) throw new Error("Failed to fetch testimonials");

                const data: ApiResponseFormTestimonial = await response.json();
                console.log("Fetched Data:", data);

                if (!data.testimonials || !Array.isArray(data.testimonials)) {
                    throw new Error("API did not return an array under 'testimonials' key");
                }

                SetTestimonials(data.testimonials);
            } catch (error) {
                console.error("Error fetching testimonials:", error);
            }
        };

        const fetchEvents = async () => {
            try {
                const response = await fetch(apiUrls[3]);
                if (!response.ok) throw new Error("Failed to fetch events");

                const data: ApiResponseFormEvents = await response.json();
                console.log("Fetched Data:", data);

                if (!data.events || !Array.isArray(data.events)) {
                    throw new Error("API did not return an array under 'events' key");
                }

                SetEvents(data.events);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        const fetchGallery = async () => {
            try {
                const response = await fetch(apiUrls[4]);
                if (!response.ok) throw new Error("Failed to fetch gallery");

                const data: ApiResponseFormGallery = await response.json();
                console.log("Fetched Data gallery:", data);

                if (!data.gallery || !Array.isArray(data.gallery)) {
                    throw new Error("API did not return an array under 'gallery' key");
                }

                SetGallery(data.gallery);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchProjects();
        fetchUpdates();
        fetchTestimonials();
        fetchEvents();
        fetchGallery();
    }, []);

    console.log(projects);
    if (status === "loading") return <div className='w-full sm:h-[90vh] md:h-[90vh] lg:h-[90vh] xl:h-[90vh] 2xl:h-[90vh] flex justify-center items-center'><Loader /></div>;
    if (!session || session.user.role !== "admin") return <div className='w-full h-full flex justify-center items-center'>
        <Error403 />
    </div>;
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <SidebarProvider>
                <AppSidebar className='md:mt-20'/>

                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mr-2 h-4" />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href="#">
                                            Building your Applications
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="hidden md:block" />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Details</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        <div className="grid auto-rows-min gap-4 md:grid-cols-3 h-auto">
                            <div className="aspect-video rounded-xl bg-[#1f1f1f]/10 h-full">
                                <div className='flex w-full gap-5 p-8 items-center'>
                                    <h1 className='md:text-3xl font-medium text-2xl'>Total Projects : </h1>
                                    <span className='md:text-4xl text-3xl font-medium text-pink-400'>
                                        {
                                            projects.length
                                        }
                                    </span>
                                </div>
                            </div>

                            <div className="aspect-video rounded-xl bg-[#1f1f1f]/10 h-full">
                                <div className='flex w-full gap-5 p-8 items-center'>
                                    <h1 className='md:text-3xl font-medium text-2xl'>Total Updates : </h1>
                                    <span className='md:text-4xl text-3xl font-medium text-red-400'>
                                        {
                                            updates.length
                                        }
                                    </span>
                                </div>
                            </div>

                            <div className="aspect-video rounded-xl bg-[#1f1f1f]/10 h-full">
                                <div className='flex w-full gap-5 p-8 items-center'>
                                    <h1 className='md:text-3xl font-medium text-2xl'>Total Testimonials : </h1>
                                    <span className='md:text-4xl text-3xl font-medium text-purple-400'>
                                        {
                                            testimonials.length
                                        }
                                    </span>
                                </div>
                            </div>

                            <div className="aspect-video rounded-xl bg-[#1f1f1f]/10 h-full">
                                <div className='flex w-full gap-5 p-8 items-center'>
                                    <h1 className='md:text-3xl font-medium text-2xl'>Total Events : </h1>
                                    <span className='md:text-4xl text-3xl font-medium text-blue-400'>
                                        {
                                            events.length
                                        }
                                    </span>
                                </div>
                            </div>

                            <div className="aspect-video rounded-xl bg-[#1f1f1f]/10 h-full">
                                <div className='flex w-full gap-5 p-8 items-center'>
                                    <h1 className='md:text-3xl font-medium text-2xl'>Total Images in Gallery: </h1>
                                    <span className='md:text-4xl text-3xl font-medium text-green-600'>
                                        {
                                            gallery.length
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}

export default Admin
