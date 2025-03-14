"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { RxCross2 } from "react-icons/rx";


const Navbar = () => {
    const pathname = usePathname();
    console.log(pathname);

    const [navClicked, setNavClicked] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    console.log(isMobile);

    // Check if the device is mobile or tablet
    useEffect(() => {
        const checkDevice = () => {
            setIsMobile(window.innerWidth <= 1024);
        };

        // Initial check
        checkDevice();

        // Add event listener for window resize
        window.addEventListener('resize', checkDevice);

        // Cleanup
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    // Toggle menu state
    const updateClick = () => {
        setNavClicked(!navClicked);

        if (!navClicked) {
            // Save the current scroll position
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
        } else {
            // Restore the scroll position
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    };

    const handleMobileNavClick = (section: string, anchor: string) => {
        // Handle navigation
        window.location.href = anchor;
        updateClick();
    };

    // Only render for mobile and tablet
    // if (!isMobile) return null;


    return (
        <header className="sticky top-0 z-[9999] border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:w-full">
            <div className="flex w-full items-center justify-center lg:p-3">
                <div className="w-full md:w-full lg:w-full lg:p-8 flex items-center justify-between p-3 md:p-8">
                    <Link href="/" className="flex items-center gap-4 text-black/80 font-bold lg:text-3xl">
                        {/* <Image src={"/logo.jpeg"} alt="logo" width={64} height={64} className="rounded-full object-cover" /> */}
                        <span className='text-2xl text-blue-500'>{`</>`}</span>
                        <span>BITS Coding Club</span>
                    </Link>

                    <nav className="md:flex gap-4 sm:gap-6 hidden">
                        {[
                            { name: "Home", path: "/", id: 1 },
                            { name: "Updates", path: "/updates", id: 2 },
                            { name: "Events", path: "/events", id: 3 },
                            { name: "Projects", path: "/projects", id: 4 },
                            { name: "Join Us", path: "/recruitment", id: 5 },
                        ].map(({ name, path, id }) => (
                            <div key={id} className='w-fit flex flex-col justify-start'>
                                <Link
                                    key={path}
                                    href={path}
                                    className={`text-lg xl:text-2xl font-medium transition-colors ${pathname === path ? "text-[#082F3A] font-bold" : "text-[#1DA8CE] hover:text-[#082F3A]"
                                        }`}
                                >
                                    {name}
                                </Link>
                                <div className={`w-full h-[1.5px] bg-[#082F3A] ${pathname === path ? "block" : "hidden"}`} />
                            </div>
                        ))}
                    </nav>

                    <button
                        onClick={updateClick}
                        className="fixed top-0 mt-5 mr-3 right-0 z-50 rounded-full w-fit md:hidden"
                        aria-label={navClicked ? "Close menu" : "Open menu"}
                    >
                        <div className="w-6 h-5 flex flex-col justify-between">
                            <span className="w-full h-0.5 bg-blue-500 block"></span>
                            <span className="w-full h-0.5 bg-blue-500 block"></span>
                            <span className="w-full h-0.5 bg-blue-500 block"></span>
                        </div>
                    </button>

                    <AnimatePresence>
                        {navClicked && (
                            <motion.ul
                                initial={{ y: "100%", opacity: 0 }}
                                animate={navClicked ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                exit={{ y: "100%", opacity: 0 }}
                                className="fixed top-24 left-0 right-0 bg-white z-[999] rounded-t-3xl shadow-xl pt-8 pb-20 px-6 flex flex-col h-screen md:hidden"
                            >
                                <div
                                    className="flex justify-end mb-6"
                                    onClick={updateClick}
                                >
                                    <RxCross2 className="text-3xl text-gray-800 cursor-pointer" />
                                </div>

                                <motion.li
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1.8, ease: "easeOut" }}
                                    className="text-2xl font-medium text-gray-800 py-4 cursor-pointer"
                                    onClick={() => handleMobileNavClick("home", "/")}
                                >
                                    {`// Home`}
                                </motion.li>

                                <motion.li
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1.8, ease: "easeOut", delay: 0.4 }}
                                    className="text-2xl font-medium text-gray-800 py-4 cursor-pointer"
                                    onClick={() => handleMobileNavClick("updates", "/updates")}
                                >
                                    {`// Updates`}
                                </motion.li>

                                <motion.li
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1.8, ease: "easeOut", delay: 0.8 }}
                                    className="text-2xl font-medium text-gray-800 py-4 cursor-pointer"
                                    onClick={() => handleMobileNavClick("events", "/events")}
                                >
                                    {`// Events`}
                                </motion.li>

                                <motion.li
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1.8, ease: "easeOut", delay: 1.2 }}
                                    className="text-2xl font-medium text-gray-800 py-4 cursor-pointer"
                                    onClick={() => handleMobileNavClick("projects", "/projects")}
                                >
                                    {`// Projects`}
                                </motion.li>

                                <motion.li
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1.8, ease: "easeOut", delay: 1.6 }}
                                    className="text-2xl font-medium text-gray-800 py-4 cursor-pointer"
                                    onClick={() => handleMobileNavClick("join", "/recruitment")}
                                >
                                    {`// Join Us`}
                                </motion.li>
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    )
}

export default Navbar