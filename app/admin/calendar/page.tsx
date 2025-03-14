// EventForm.tsx
"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalendarIcon, Clock } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';

// Define the schema and infer types from it
const formSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    date: z.date({
        required_error: "Date is required",
        invalid_type_error: "Date is required",
    }),
    time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: "Time must be in format HH:MM",
    }),
});

type FormValues = z.infer<typeof formSchema>;

const EventForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        watch,
        reset,
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            time: '',
        }
    });

    const date = watch('date');

    // Combine date and time into an ISO string with proper typing
    const combineDateAndTime = (dateValue: Date | undefined, timeValue: string | undefined): string | null => {
        if (!dateValue || !timeValue) return null;

        const dateObj = new Date(dateValue);
        const [hours, minutes] = timeValue.split(':');

        dateObj.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
        return dateObj.toISOString();
    };

    const onSubmit = async (data: FormValues) => {
        try {
            const startDateTime = combineDateAndTime(data.date, data.time);
            if (!startDateTime) {
                throw new Error("Invalid date or time");
            }

            // Default to 1-hour event
            const endDateTime = new Date(startDateTime);
            endDateTime.setHours(endDateTime.getHours() + 1);

            const response = await axios.post('/api/calendar/events', {
                title: data.title,
                start: startDateTime,
                end: endDateTime.toISOString(),
            },
                {
                    withCredentials: true
                }
            );

            toast.success('Event created!', {
                description: `${data.title} has been added to your calendar`,
            });

            console.log("Event created:", response.data);
            reset(); // Reset form after successful submission
        } catch (error: unknown) {
            console.error("Error creating event:", error);
            toast.error('Error', {
                description: axios.isAxiosError(error) ? error.response?.data?.error || error.message : "Failed to create event",
            });
        }
    };

    return (
        <div className='w-full h-[90vh] flex justify-center items-center p-5'>
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>Add Calendar Event</CardTitle>
                    <CardDescription>Schedule a new event on your calendar</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                {...register('title')}
                                placeholder="Event title"
                                className={cn(errors.title && "border-red-500")}
                            />
                            {errors.title && (
                                <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="date">Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        id="date"
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !date && "text-muted-foreground",
                                            errors.date && "border-red-500"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, 'PPP') : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={(selectedDate: Date | undefined) => {
                                            if (selectedDate) {
                                                setValue('date', selectedDate);
                                            }
                                        }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            {errors.date && (
                                <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="time">Time</Label>
                            <div className="flex items-center">
                                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="time"
                                    type="time"
                                    {...register('time')}
                                    className={cn(errors.time && "border-red-500")}
                                />
                            </div>
                            {errors.time && (
                                <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Creating..." : "Create Event"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default EventForm;