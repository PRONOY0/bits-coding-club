"use client";
import { usePathname } from 'next/navigation';
import React from 'react'

const Event = () => {
    const pathname = usePathname();
  return (
    <div className='bg-gray-300 w-full h-full flex justify-center items-center'>
      <h1 className='text-4xl'>Hello this is {pathname} page</h1>
    </div>
  )
}

export default Event
