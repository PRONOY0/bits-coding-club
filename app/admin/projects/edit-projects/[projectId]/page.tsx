"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { toast, ToastContainer } from 'react-toastify';
import { useSession } from 'next-auth/react';
import Error403 from '@/components/UnAuthenticated/page';
import Loader from '@/components/Loader/page';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Project = {
    id?: string;
    title?: string;
    description?: string;
    type: string;
    image?: string;
    teamName?: string;
    liveLink?: string;
    gitHubLink?: string;
    tags?: string[];
    content?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

const formSchema = z.object({
    title: z.string().min(3, { message: 'Title must be at least 3 characters' }).max(100),
    liveLink: z.string().url().or(z.literal('')).optional(),
    gitHubLink: z.string().url().or(z.literal('')).optional(),
    type: z.string({
        required_error: 'Please select a type',
    }),
    teamName: z.string().min(3, { message: 'Team Name must be at least 3 characters' }).max(100),
    description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
    tags: z.string().min(5, { message: 'Tags must be at least 5 characters' }),
    content: z.string().min(10, { message: 'Content must be at least 10 characters' }),
    image: z.any(),
});

type FormValues = z.infer<typeof formSchema>;

const EditParticular = () => {
    const { data: session, status } = useSession();
    const [project, SetProject] = useState<Project[]>([]);
    console.log(`projects: ${project}`);

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const defaultValues: Partial<FormValues> = {
        title: '',
        description: '',
        teamName: '',
        tags: '',
        content: '',
        type: '',
        liveLink: '',
        gitHubLink: '',
    };

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
        mode: "onSubmit",
    });

    const { reset } = form;

    useEffect(() => {
        const fetchProjectDetails = async () => {
            const projectId = localStorage.getItem("id") as string
            if (!projectId) return;

            try {
                const response = await axios.get(`/api/projects/${projectId}`);

                if (response.status === 200) {
                    reset({
                        title: response.data.project.title,
                        description: response.data.project.description || '',
                        image: response.data.project.image || null,
                        teamName: response.data.project.teamName || '',
                        type: response.data.project.type || '',
                        liveLink: response.data.project.liveLink || '',
                        gitHubLink: response.data.project.gitHubLink || '',
                        tags: Array.isArray(response.data.project.tags)
                            ? response.data.project.tags.join(',')
                            : response.data.project.tags || '',
                        content: response.data.project.content || '',
                    });

                    SetProject(response.data.project);

                    if (response.data.project.image) {
                        setImagePreview(response.data.project.image);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchProjectDetails();
    }, [reset])

    const resetForm = () => {
        form.reset(defaultValues);
        setImagePreview(null);

        // Reset the file input
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    // Form submission handler
    const onSubmit = async (data: FormValues) => {

        console.log("data", data);

        try {
            const formData = new FormData();
            const projectId = localStorage.getItem("id") as string;

            formData.append("title", data.title);
            formData.append("teamName", data.teamName);
            formData.append("description", data.description);
            formData.append("type", data.type);
            formData.append("tags", data.tags);
            formData.append("content", data.content);

            if (data.liveLink) {
                formData.append("liveLink", data.liveLink);
            }
            if (data.gitHubLink) {
                formData.append("gitHubLink", data.gitHubLink);
            }

            formData.append("content", data.content);

            if (data.image instanceof FileList && data.image.length > 0) {
                formData.append("image", data.image[0]);
            }
            const response = await axios.put(`/api/projects/${projectId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            if (response.status === 200) {
                // alert("Success");
                toast.success("Success");
                resetForm();
            }
        } catch (error) {
            console.error("Upload Error:", error);
        }
    };

    // Handle image file selection and preview
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    if (status === "loading") return <div className='w-full sm:h-[90vh] md:h-[90vh] lg:h-[90vh] xl:h-[90vh] 2xl:h-[90vh] flex justify-center items-center'><Loader /></div>;
    if (!session || session.user.role !== "admin") return <div className='w-full h-full flex justify-center items-center'>
        <Error403 />
    </div>;
    return (
        <div className='p-5'>
            <Card className="w-full max-w-2xl mx-auto">
                <ToastContainer />
                <CardHeader>
                    <CardTitle>Edit Project</CardTitle>
                    <CardDescription>Modify the details of your project</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Title Field */}
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter post title" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            The title of your project
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Content Field */}
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Content</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Write your post content here..."
                                                className="min-h-32"
                                                {...field}
                                                onChange={(e) => field.onChange(e.target.value)}
                                                value={field.value || ''}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            The main content of your project
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* TeamName Field */}
                            <FormField
                                control={form.control}
                                name="teamName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Team Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your team name" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Your Project Team Name
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Type Field */}
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="All Projects">All Projects</SelectItem>
                                                <SelectItem value="Web">Web</SelectItem>
                                                <SelectItem value="Mobile">Mobile</SelectItem>
                                                <SelectItem value="AI/ML">AI/ML</SelectItem>
                                                <SelectItem value="AR/VR">AR/VR</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Select the type of project
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Description Field */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Write your project description here..."
                                                className="min-h-32"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            A short description for project preview here.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Tags Field */}
                            <FormField
                                control={form.control}
                                name="tags"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tags</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Html, Css, Js, React Js, MongoDb" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter your project tags here
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Image Upload Field */}
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field: { value, onChange, ...fieldProps } }) => (
                                    <FormItem>
                                        <FormLabel>Featured Image</FormLabel>
                                        <FormControl>
                                            <div className="space-y-4">
                                                <Input
                                                    id="image"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        onChange(e.target.files);
                                                        handleImageChange(e);
                                                    }}
                                                    {...fieldProps}
                                                />
                                                {imagePreview && (
                                                    <div className="mt-2">
                                                        <p className="text-sm mb-2">Preview:</p>
                                                        <img
                                                            src={imagePreview}
                                                            alt="Preview"
                                                            className="w-3/4 md:w-auto max-w-md h-auto rounded-md object-cover"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </FormControl>
                                        <FormDescription>
                                            Upload a featured image for your post
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Live Link Field */}
                            <FormField
                                control={form.control}
                                name="liveLink"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Live Link</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter live link" {...field} value={field.value || ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Github Link Field */}
                            <FormField
                                control={form.control}
                                name="gitHubLink"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Github Link</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter github link" {...field} value={field.value || ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Submit Button */}
                            <Button type="submit" className="w-full">Submit</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default EditParticular
