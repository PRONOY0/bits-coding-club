"use client";
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import Loader from '@/components/Loader/page';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Error403 from '@/components/UnAuthenticated/page';


type Gallery = {
  id?: string;
  images?: string;
};

const Deletegallery = () => {
  const { data: session, status } = useSession();
  const [gallery, SetGallery] = useState<Gallery[]>([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get("/api/Gallery");

        if (!response.data.gallery || !Array.isArray(response.data.gallery)) {
          throw new Error("API did not return an array under 'gallery' key");
        }

        if (response.status === 200) {
          SetGallery(response.data.gallery);
        }
      } catch (error) {
        console.error("Error fetching gallery:", error);
      }
    };

    fetchGallery();
  }, [])

  const deleteGallery = async (id: string | undefined) => {
    try {
      if (!id) {
        throw new Error("Id cannot be empty");
      }

      const response = await axios.delete(`/api/Gallery/${id}`);
      if (response.status === 200) {
        toast.success("Deleted Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1500)
      }

    } catch (error) {
      console.log(error);
      toast.error("Failed to delete");
    }
  }

  if (status === "loading") return <div className='w-full sm:h-[90vh] md:h-[90vh] lg:h-[90vh] xl:h-[90vh] 2xl:h-[90vh] flex justify-center items-center'><Loader /></div>;
  if (!session || session.user.role !== "admin") return <div className='w-full h-full flex justify-center items-center'>
    <Error403 />
  </div>;
  return (
    <div className='w-full h-full overflow-hidden p-5 bg-gray-100'>
      <ToastContainer />
      <h1 className='text-5xl mx-5 font-medium'>Gallery Images</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
        {
          gallery.length > 0 ?
            (
              gallery.map((pic) => {
                return (
                  <Card key={pic.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col h-full">

                    <CardContent>
                      <img src={pic.images} alt="gallery images" />
                    </CardContent>

                    <CardFooter className="flex justify-between pt-2">
                      <AlertDialog>
                        <AlertDialogTrigger className="px-3 py-1 text-sm bg-red-50 border border-red-200 text-red-600 rounded hover:bg-red-100 transition-colors flex items-center gap-1 cursor-pointer duration-500">Delete <Trash2 size={16} /></AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your event
                              and remove the data from servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteGallery(pic.id)} >Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </CardFooter>
                  </Card>
                );
              })
            )
            :
            (
              <div className='col-span-full h-[90vh] flex justify-center items-center'>
                <p className='text-4xl md:text-6xl lg:text-8xl text-gray-300'>No gallery</p>
              </div>
            )
        }
      </div>
    </div>
  )
}

export default Deletegallery
