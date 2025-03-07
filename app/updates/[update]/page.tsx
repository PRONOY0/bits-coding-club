"use client";
import React from 'react'
import { usePathname } from 'next/navigation';

const Update = () => {
    const pathname = usePathname();
  return (
    <div className='bg-fuchsia-200 w-full h-screen flex justify-center items-center'>
      <h1 className='text-4xl'>This is {pathname} update page</h1>
    </div>
  )
}

export default Update