import Link from 'next/link'
import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const Footer = () => {
    const gmailCopy = (): void => {
        navigator.clipboard
            .writeText("codingclub@online.bits-pilani.ac.in")
            .then(() => {
                console.log("Email copied to clipboard");
            })
            .catch(() => {
                console.log("Failed to copy email to clipboard");
            });
    }
    return (
        <footer className="bg-[#0F0F2F] text-white w-full">
            <div className="container mx-auto px-4 py-12 w-full">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
                    <div className="space-y-4">
                        <h3 className="text-4xl font-bold">BITS Coding Club</h3>
                        <p className="text-lg">
                            Fostering innovation and excellence in computer science through collaboration learning, and competition.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="https://facebook.com" className="hover:text-secondary">
                                <FaFacebookF className="lg:text-2xl hover:text-[#FFC900] transition-colors duration-300" />
                                <span className="sr-only">Facebook</span>
                            </Link>

                            <Link href="https://x.com/royal_maddy_" className="hover:text-secondary">
                                <FaXTwitter className="lg:text-2xl hover:text-[#FFC900] transition-colors duration-300" />
                                <span className="sr-only">Twitter</span>
                            </Link>

                            <Link href="https://www.instagram.com/ron.nerd/?next=%2F" className="hover:text-secondary">
                                <FaInstagram className="lg:text-2xl hover:text-[#FFC900] transition-colors duration-300" />
                                <span className="sr-only">Instagram</span>
                            </Link>

                            <Link href="https://www.linkedin.com/in/pronoy-roy-3203361b6/" className="hover:text-secondary">
                                <FaLinkedinIn className="lg:text-2xl hover:text-[#FFC900] transition-colors duration-300" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-sm hover:text-[#FFC900] transition-all duration-300">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/updates" className="text-sm hover:text-[#FFC900] transition-all duration-300">
                                    What&apos;s New
                                </Link>
                            </li>
                            <li>
                                <Link href="/recruitment" className="text-sm hover:text-[#FFC900] transition-all duration-300">
                                    Join Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/events/calendar" className="text-sm hover:text-[#FFC900] transition-all duration-300">
                                    Event Calendar
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy-policy" className="text-sm hover:text-[#FFC900] transition-all duration-300">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/projects" className="text-sm hover:text-[#FFC900] transition-colors duration-300">
                                    Projects
                                </Link>
                            </li>
                            <li>
                                <Link href="/events" className="text-sm hover:text-[#FFC900] transition-colors duration-300">
                                    Guest Talks
                                </Link>
                            </li>
                            <li>
                                <Link href="/updates" className="text-sm hover:text-[#FFC900] transition-colors duration-300">
                                    Workshops
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className='w-full relative md:right-3'>
                        <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                        <address className="not-italic text-sm space-y-2">
                            <p className="text-[#fff]">BITS Pilani</p>
                            <p className="text-[#fff]">Pilani Campus</p>
                            <p className="text-[#fff]">Rajasthan, India</p>

                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger className="flex items-start cursor-pointer" onClick={() => { gmailCopy() }}>
                                        <FiMail size={16} className="mr-2 mt-1" />
                                        <p className="text-start break-words overflow-wrap anywhere">
                                            codingclub@online.bits-pilani.ac.in
                                        </p>
                                    </TooltipTrigger>

                                    <TooltipContent>
                                        <p>Tap to copy</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                        </address>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-center">
                    <p>&copy; {new Date().getFullYear()} BITS Pilani Coding Club. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
