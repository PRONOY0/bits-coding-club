"use client";
import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();
    console.log(pathname);

    return (
        <header className="sticky top-0 z-[9999] border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex w-full items-center justify-center lg:p-3">
                <div className="w-3/4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-4 text-black/80 font-bold lg:text-3xl">
                        <Image src={"/logo.jpeg"} alt="logo" width={64} height={64} className="rounded-full object-cover" />
                        <span>BITS Coding Club</span>
                    </Link>

                    <nav className="flex gap-4 sm:gap-6">
                        {[
                            { name: "Home", path: "/", id: 1 },
                            { name: "Updates", path: "/updates", id: 2 },
                            { name: "Events", path: "/events", id: 3 },
                            { name: "Projects", path: "/projects", id: 4 },
                            { name: "Join Us", path: "/recruitment", id: 5 },
                            { name: "Team", path: "/team", id: 6 },
                        ].map(({ name, path, id }) => (
                            <div key={id} className='w-fit flex flex-col justify-start'>
                                <Link
                                    key={path}
                                    href={path}
                                    className={`text-lg font-medium transition-colors ${pathname === path ? "text-[#082F3A] font-bold" : "text-[#1DA8CE] hover:text-[#082F3A]"
                                        }`}
                                >
                                    {name}
                                </Link>
                                <div className={`w-full h-[1.5px] bg-[#082F3A] ${pathname === path ? "block" : "hidden"}`} />
                            </div>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Navbar