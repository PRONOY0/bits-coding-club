"use client";
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import { ArrowLeft, Calendar, ExternalLink, Tag } from 'lucide-react';
import Loader from '@/components/Loader/page';

interface Update {
  id: string;
  title: string;
  category: string;
  shortDescription?: string;
  date: Date;
  image?: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const Update = () => {
  const pathname = usePathname();
  const urls = pathname.split("/");
  const router = useRouter();
  const [updates, setUpdates] = useState<Update[]>([]);

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await axios.get(`/api/updates/${urls[2]}`);
        if (response.status === 200) {
          const data = response.data.updatesById;
          setUpdates(Array.isArray(data) ? data : [data]);
        }

      } catch (error) {
        console.log(error);
      }
    }

    fetchUpdates();
  }, [])

  const handleBack = () => {
    router.push("/updates");
  };

  console.log(updates);

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {
        updates.length !== 0 ?
          (
            updates.map((update) => {
              return (
                <div key={update.id}>
                  <div className="bg-white min-h-screen">
                    {/* Hero Section */}

                    <div className="bg-white sticky top-0 z-30 shadow-sm">
                      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                        <button
                          onClick={handleBack}
                          className="flex items-center cursor-pointer text-gray-700 hover:text-[#cf2027] transition font-medium"
                        >
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          <span>Back to updates</span>
                        </button>
                      </div>
                    </div>
                    <div className="relative h-64 md:h-96 w-full overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${update.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                        <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {update.category}
                        </span>
                        <h1 className="text-white text-2xl md:text-4xl font-bold mt-3">
                          {update.title}
                        </h1>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="max-w-4xl mx-auto px-4 py-8">
                      {/* update Meta */}
                      <div className="bg-emerald-50 rounded-lg p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-8 mb-8">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-emerald-600 mr-2" />
                          <span className="text-gray-700">{formatDate(update.date)}</span>
                        </div>

                        <div className="flex items-center">
                          <Tag className="h-5 w-5 text-emerald-600 mr-2" />
                          <span className="text-gray-700">{update.category}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="prose max-w-none">
                        <div className="bg-amber-100 rounded-lg p-4 mb-6 border-l-4 border-amber-500">
                          <p className="font-medium text-amber-800">{update.shortDescription}</p>
                        </div>

                        <div className="space-y-4">

                          {/* Additional content sections can be added here */}
                          <div className="bg-gray-50 rounded-lg p-6 mt-8">
                            <h3 className="text-lg font-semibold mb-4">{update.category}</h3>
                            <p className="text-gray-600 tracking-wide leading-relaxed">
                              {
                                update.content
                              }
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Share and Actions */}
                      <div className="mt-10 pt-6 border-t border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                          <div className="flex items-center">
                            <span className="text-sm text-gray-500">
                              Created: {formatDate(update.createdAt)}
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <button className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-md flex items-center text-sm font-medium hover:bg-emerald-200 transition-colors">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Share
                            </button>
                            <button className="bg-emerald-600 text-white px-4 py-2 rounded-md flex items-center text-sm font-medium hover:bg-emerald-700 transition-colors">
                              Register Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )
          :
          (
            <div className='w-full sm:h-[90vh] md:h-[90vh] lg:h-[90vh] xl:h-[90vh] 2xl:h-[90vh] flex items-center justify-center'>
              <Loader />
            </div>
          )
      }
    </div>
  )
}

export default Update