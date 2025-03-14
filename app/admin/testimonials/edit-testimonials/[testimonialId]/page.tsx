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
import Loader from '@/components/Loader/page';
import Error403 from '@/components/UnAuthenticated/page';

type Testimonial = {
    id?: string;
    name?: string;
    batch?: string;
    feedback?: string;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

const formSchema = z.object({
    name: z.string().min(3, { message: 'Title must be at least 3 characters' }).max(30),
    batch: z.string().min(3, { message: 'Batch must be at least 3 characters' }).max(50),
    feedback: z.string().min(10, { message: 'Feedback must be at least 10 characters' }),
    image: z.any().nullable(),
});

type FormValues = z.infer<typeof formSchema>;

const EditParticular = () => {
    const { data: session, status } = useSession();
    const [testimonial, setTestimonial] = useState<Testimonial[]>([]);
    console.log(`projects: ${testimonial}`);

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const defaultValues: Partial<FormValues> = {
        name: '',
        batch: '',
        feedback: '',
    };

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
        mode: "onSubmit",
    });

    const { reset } = form;

    useEffect(() => {
        const fetchTestimonialDetails = async () => {
            const testimonialId = localStorage.getItem("testimonialId") as string
            console.log(testimonialId)
            if (!testimonialId) return;

            try {
                const response = await axios.get(`/api/testimonials/${testimonialId}`);
                
                console.log(testimonialId);
                console.log(response.data.testimonialById);

                if (response.status === 200) {
                    reset({
                        name: response.data.testimonialById.name,
                        feedback: response.data.testimonialById.feedback || '',
                        image: response.data.testimonialById.image || null,
                        batch: response.data.testimonialById.batch || '',
                    });

                    setTestimonial(response.data.testimonialById);

                    if (response.data.testimonialById.image) {
                        setImagePreview(response.data.testimonialById.image);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchTestimonialDetails();
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
            const testimonialId = localStorage.getItem("testimonialId") as string;

            formData.append("name", data.name);
            formData.append("batch", data.batch);
            formData.append("feedback", data.feedback);

            if (data.image instanceof FileList && data.image.length > 0) {
                formData.append("image", data.image[0]);
            }
            const response = await axios.put(`/api/testimonials/${testimonialId}`, formData, {
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
                    <CardTitle>Edit Testimonial</CardTitle>
                    <CardDescription>Fill in the details to edit testimonial</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Title Field */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Category Field */}
                            <FormField
                                control={form.control}
                                name="batch"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Batch</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your batch" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Eg:- Batch of 2023
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Content Field */}
                            <FormField
                                control={form.control}
                                name="feedback"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Feedback</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Write your feedback here..."
                                                className="min-h-32"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            The main content of your feedback
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
                                        <FormLabel>Student Image</FormLabel>
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
                                            Upload Student Image
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
