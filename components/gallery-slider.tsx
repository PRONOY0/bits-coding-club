"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const galleryImages = [
  {
    src: "/img1.jpg",
    alt: "Hackathon 2023",
    caption: "Annual Hackathon - Students collaborating on innovative projects",
  },
  {
    src: "/img2.jpg",
    alt: "Workshop Session",
    caption: "Web Development Workshop led by industry experts",
  },
  {
    src: "/img3.jpg",
    alt: "Coding Competition",
    caption: "Students participating in the inter-university coding competition",
  },
  {
    src: "/img6.jpg",
    alt: "Guest Lecture",
    caption: "Guest lecture by the CTO of a leading tech company",
  },
  {
    src: "/img1.jpg",
    alt: "Project Showcase",
    caption: "Students presenting their semester projects to faculty and peers",
  },
]

export default function GallerySlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide()
      }, 5000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isAutoPlaying]) // Removed currentIndex

  return (
    <div className="relative w-2/3">
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden rounded-lg">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-contain"
              priority={index === 0}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4">
              <p className="text-lg font-medium">{image.caption}</p>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/80 hover:bg-white rounded-full text-white cursor-pointer transition-colors duration-500"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous slide</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 cursor-pointer -translate-y-1/2 bg-black/80 hover:bg-white rounded-full text-white transition-colors duration-500"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next slide</span>
      </Button>

      <div className="flex justify-center mt-4 gap-2">
        {galleryImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-[#0F0F2F]" : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

