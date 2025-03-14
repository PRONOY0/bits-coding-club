"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

// Define the structure for a testimonial
type Testimonial = {
  feedback: string;
  name: string;
  batch: string;
  image: string;
};

export function AnimatedTestimonialsDemo() {
  type TransformedTestimonial = {
    quote: string;
    name: string;
    designation: string;
    src: string;
  };
  
  const [testimonials, setTestimonials] = useState<TransformedTestimonial[]>([]); // State to store testimonials
  const [loading, setLoading] = useState<boolean>(true); // State to track loading status

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get<{ testimonials: Testimonial[] }>("/api/testimonials"); // Fetch testimonials from API
        
        // Transform data to match the expected format for AnimatedTestimonials component
        setTestimonials(
          response.data.testimonials.map((t) => ({
            quote: t.feedback, // Testimonial feedback
            name: t.name, // Student name
            designation: `Student, ${t.batch}`, // Batch info
            src: t.image, // Image URL
          }))
        );
      } catch (error) {
        console.error("Error fetching testimonials:", error); // Log errors if fetching fails
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    fetchTestimonials(); // Call the function when component mounts
  }, []);

  // Show loading text while fetching data
  if (loading) return <p className="text-center">Loading testimonials...</p>;

  // Render testimonials once data is loaded
  return <AnimatedTestimonials testimonials={testimonials} autoplay={true} />;
}
