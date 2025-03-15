"use client"
import React from 'react'
import { useState } from 'react';
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
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import Error403 from '@/components/UnAuthenticated/page';
import Loader from '@/components/Loader/page';

const formSchema = z.object({
  name: z.string().min(3, { message: 'Title must be at least 3 characters' }).max(30),
  batch: z.string().min(3, { message: 'Batch must be at least 3 characters' }).max(50),
  feedback: z.string().min(10, { message: 'Feedback must be at least 10 characters' }),
  image: z.any()
    .refine(
      (files) => files?.length > 0,
      { message: 'Image is required' }
    )
    .refine(
      (files) => files?.[0]?.type.startsWith("image/"),
      "File must be an image"
    ),
});

type FormValues = z.infer<typeof formSchema>;

const TestimonialCardForm = () => {
  const { data: session, status } = useSession();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Default values for the form
  const defaultValues: Partial<FormValues> = {
    name: '',
    batch: '',
    feedback: '',
  };

  // Initialize form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onSubmit",
  });

  // Reset form and image preview
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
    console.log('Form submitted:', data);

    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("batch", data.batch);
      formData.append("feedback", data.feedback);

      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]); // First file from FileList
      }

      const response = await axios.post("/api/testimonials", formData, {
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
          <CardTitle>Create New Testimonial</CardTitle>
          <CardDescription>Fill in the details to create a new testimonial</CardDescription>
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

export default TestimonialCardForm
