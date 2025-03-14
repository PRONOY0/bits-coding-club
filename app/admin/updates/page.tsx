"use client"
import React from 'react'
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import Error403 from '@/components/UnAuthenticated/page';
import Loader from '@/components/Loader/page';
import { useSession } from 'next-auth/react';

const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }).max(100),
  category: z.string({
    required_error: 'Please select a category',
  }),
  shortDescription: z.string().min(10, { message: 'Short Description must be at least 10 characters' }),
  content: z.string().min(10, { message: 'Content must be at least 10 characters' }),
  image: z.any()
    .refine(
      (files) => files?.length > 0,
      { message: 'Image is required' }
    )
    .refine(
      (files) => files?.[0]?.type.startsWith("image/"),
      "File must be an image"
    ),
  date: z.date({
    required_error: 'Please select a date',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const UpdatePostForm = () => {
  const { data: session, status } = useSession();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Default values for the form
  const defaultValues: Partial<FormValues> = {
    title: '',
    shortDescription: '',
    content: '',
    date: new Date(),
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

      formData.append("title", data.title);
      formData.append("category", data.category);
      formData.append("content", data.content);
      formData.append("date", data.date.toISOString());
      formData.append("shortDescription", data.shortDescription);

      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]); // First file from FileList
      }

      const response = await axios.post("/api/updates", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (response.status === 200) {
        // alert("Success");
        toast.success("Success");
        resetForm();
      } else {
        toast.error("Failed")
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
          <CardTitle>Create New Updates</CardTitle>
          <CardDescription>Fill in the details to create a new updates post</CardDescription>
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
                      <Input placeholder="Enter title" {...field} />
                    </FormControl>
                    <FormDescription>
                      The title of your update post
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                        placeholder="Write your content here..."
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The main content of your update
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Content Field */}
              <FormField
                control={form.control}
                name="shortDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your short Description here..."
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Short Description for your update
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
                    <FormLabel>Update Image</FormLabel>
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

export default UpdatePostForm
