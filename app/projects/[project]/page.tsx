"use client";
import React from 'react'
import { usePathname } from 'next/navigation';

const Project = () => {
    const pathname = usePathname();
  return (
    <div className='bg-sky-300 w-full h-screen flex justify-center items-center'>
      <h1 className='text-4xl'>This is {pathname} project page</h1>
    </div>
  )
}

export default Project
