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
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { useSession } from 'next-auth/react';
import Error403 from '@/components/UnAuthenticated/page';
import Loader from '@/components/Loader/page';

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

const formSchema = z.object({
    title: z.string().min(3, { message: 'Title must be at least 3 characters' }).max(100),
    category: z.string({
        required_error: 'Please select a category',
    }),
    shortDescription: z.string().min(10, { message: 'Short Description must be at least 10 characters' }),
    content: z.string().min(10, { message: 'Content must be at least 10 characters' }),
    image: z.any().nullable(),
    date: z.date({
        required_error: 'Please select a date',
    }),
});

type FormValues = z.infer<typeof formSchema>;

const EditParticular = () => {
    const { data: session, status } = useSession();
    const [updates, SetUpdates] = useState<updates[]>([]);
    console.log(`update: ${updates}`);

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const defaultValues: Partial<FormValues> = {
        title: '',
        shortDescription: '',
        content: '',
        date: new Date(),
    };

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
        mode: "onSubmit",
    });

    const { setValue, reset } = form;

    useEffect(() => {
        const fetchProjectDetails = async () => {
            const updateId = localStorage.getItem("id") as string
            if (!updateId) return;

            try {
                const response = await axios.get(`/api/updates/${updateId}`);

                if (response.status === 200) {
                    reset({
                        title: response.data.updatesById.title,
                        shortDescription: response.data.updatesById.shortDescription || '',
                        image: response.data.updatesById.image || null,
                        content: response.data.updatesById.content || '',
                        category: response.data.updatesById.category || '',
                        date: response.data.updatesById.date ? new Date(response.data.updatesById.date) : new Date(),
                    });

                    SetUpdates(response.data.updatesById);

                    if (response.data.updatesById.image) {
                        setImagePreview(response.data.updatesById.image);
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
            const updateId = localStorage.getItem("id") as string;

            formData.append("title", data.title);
            formData.append("category", data.category);
            formData.append("content", data.content);
            formData.append("date", data.date.toISOString());
            formData.append("shortDescription", data.shortDescription);

            formData.append("content", data.content);

            if (data.image instanceof FileList && data.image.length > 0) {
                formData.append("image", data.image[0]);
            }
            const response = await axios.put(`/api/updates/${updateId}`, formData, {
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

    if (status === "loading") return <div className='w-full h-screen flex justify-center items-center'><Loader /></div>;
    if (!session || session.user.role !== "admin") return <div className='w-full h-full flex justify-center items-center'>
        <Error403 />
    </div>;
    return (
        <div className='p-5'>
            <Card className="w-full max-w-2xl mx-auto">
                <ToastContainer />
                <CardHeader>
                    <CardTitle>Edit Event</CardTitle>
                    <CardDescription>Modify the details of your event</CardDescription>
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
                                            The title of your event
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Category Field */}
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Select value={field.value} onValueChange={(value) => setValue("category", value)}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Guest Speaker">Guest Speaker</SelectItem>
                                                <SelectItem value="Event">Event</SelectItem>
                                                <SelectItem value="Announcement">Announcement</SelectItem>
                                                <SelectItem value="Opportunity">Opportunity</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Select the category for your post
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
                                            The main content of your event
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

                            {/* Date Field */}
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Publish Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        className="w-full pl-3 text-left font-normal flex justify-between items-center"
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                            Select when to publish this post
                                        </FormDescription>
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
