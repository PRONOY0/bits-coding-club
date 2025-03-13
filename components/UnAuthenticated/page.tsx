import React from 'react';
import { ShieldX } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { FcGoogle } from "react-icons/fc";

const Error403 = () => {
    return (
        <div className="flex min-h-[90vh] flex-col items-center justify-center  w-full bg-gray-50 px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
            <div className="max-w-max mx-auto">
                <main className="sm:flex sm:items-center">
                    <div className="flex justify-center">
                        <div className="rounded-full bg-red-100 p-10">
                            <ShieldX className="h-24 w-24 text-red-600" aria-hidden="true" />
                        </div>
                    </div>
                    <div className="mt-4 text-center sm:ml-6 sm:mt-0 sm:text-left">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">403</h1>
                        <p className="mt-1 text-gray-500 text-2xl">Access Forbidden</p>
                        <p className="mt-3 text-gray-500 text-xl">
                            Sorry, you don&apos;t have permission to access this resource.
                        </p>
                        <div className="mt-6">
                            <button
                                onClick={() => signIn("google")}
                                className="inline-flex items-center rounded-md bg-red-50 border-red-200 px-4 py-2 font-medium text-black shadow-sm hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-lg gap-5 transition-all duration-500 cursor-pointer"
                            >
                                Sign In with Google <FcGoogle className='text-2xl' />
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Error403;