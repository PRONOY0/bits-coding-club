"use client";
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation';
import axios from 'axios';
import { ArrowLeft, Clock, ExternalLink, Github, Share2, Tag, Users } from 'lucide-react';
import { Project } from '@prisma/client';
import Loader from '@/components/Loader/page';
import { useRouter } from 'next/navigation';

const ProjectById = () => {
  const router = useRouter();
  const pathname = usePathname();
  const urls = pathname.split("/");
  const [projects, setProjects] = useState<Project[]>([]);
  const basePath = pathname.split("/").slice(0, -1).join("/");

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  useEffect(() => {
    const fetchprojects = async () => {
      try {
        const response = await axios.get(`/api/projects/${urls[2]}`);
        if (response.status === 200) {
          const data = response.data.project;
          setProjects(Array.isArray(data) ? data : [data]);
        }

      } catch (error) {
        console.log(error);
      }
    }

    fetchprojects();
  }, []);

  const handleShare = async () => {
    const url = window.location.href; // Get current URL

    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title, // Page title
          text: "Check out this project!", // Custom text
          url: url, // Current URL
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  const handleBack = () => {
    router.push(basePath); // Navigate to the base path
  };

  console.log(projects);

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {
        projects.length !== 0 ?
          (
            projects.map((project) => {
              return (
                <div key={project.id}>
                  <div className="bg-gray-50 min-h-screen pb-12">
                    {/* Header with back button */}
                    <div className="bg-white shadow">
                      <div className="max-w-5xl mx-auto px-4 py-4">
                        <button
                          onClick={handleBack}
                          className="flex items-center text-gray-600 hover:text-gray-900 transition cursor-pointer"
                        >
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          <span>Back to projects</span>
                        </button>
                      </div>
                    </div>

                    {/* Hero Section */}
                    <div className="relative h-64 md:h-80 lg:h-96 w-full overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${project.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full max-w-5xl mx-auto">
                        <div className="flex gap-2 items-center mb-3">
                          <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {project.type}
                          </span>
                          <span className="text-gray-200 text-sm flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {formatDate(project.createdAt)}
                          </span>
                        </div>
                        <h1 className="text-white text-2xl md:text-4xl font-bold my-5">
                          {project.title}
                        </h1>
                      </div>
                    </div>

                    {/* Main content */}
                    <div className="max-w-4xl mx-auto px-4 md:px-8">
                      {/* Project card */}
                      <div className="bg-white shadow-md rounded-lg -mt-10 relative z-10 overflow-hidden">
                        {/* Team banner */}
                        <div className="border-l-4 border-purple-500 bg-purple-50 p-4 md:p-6 flex items-center justify-between">
                          <div className="flex items-center">
                            <Users className="h-5 w-5 text-purple-700 mr-2" />
                            <p className="text-purple-800 font-medium">Built by <span className="font-bold">{project.teamName}</span></p>
                          </div>
                          <div className="flex space-x-2">
                            {project.gitHubLink && (
                              <a
                                href={project.gitHubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition"
                              >
                                <Github className="h-5 w-5" />
                              </a>
                            )}
                            {project.liveLink && (
                              <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-500 transition"
                              >
                                <ExternalLink className="h-5 w-5" />
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Project description */}
                        <div className="p-6 md:p-8">
                          <div className="prose max-w-none">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Project Overview</h2>
                            <p className="text-gray-700 whitespace-pre-line mb-6">{project.description}</p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-8">
                              {project.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium flex items-center"
                                >
                                  <Tag className="h-3 w-3 mr-1" />
                                  {tag}
                                </span>
                              ))}
                            </div>

                            {/* Project content if available */}
                            {project.content && (
                              <>
                                <h2 className="text-xl font-bold text-gray-800 mb-4 mt-8">Project Details</h2>
                                <div className="text-gray-700 whitespace-pre-line">
                                  {project.content}
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Project links */}
                        {(project.liveLink || project.gitHubLink) && (
                          <div className="bg-gray-50 p-6 border-t border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Links</h3>
                            <div className="flex flex-col sm:flex-row gap-4">
                              {project.liveLink && (
                                <a
                                  href={project.liveLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-center bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 transition flex-1"
                                >
                                  <ExternalLink className="h-5 w-5 mr-2" />
                                  View Live Project
                                </a>
                              )}

                              {project.gitHubLink && (
                                <a
                                  href={project.gitHubLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-center bg-gray-800 text-white px-4 py-3 rounded-md hover:bg-gray-900 transition flex-1"
                                >
                                  <Github className="h-5 w-5 mr-2" />
                                  View Source Code
                                </a>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Metadata footer */}
                      <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="flex flex-col space-y-1">
                            <span className="text-sm text-gray-500">
                              Created: {formatDate(project.createdAt)}
                            </span>
                            <span className="text-sm text-gray-500">
                              Last updated: {formatDate(project.updatedAt)}
                            </span>
                          </div>
                          <div className="flex space-x-3">
                            <button className="bg-gray-100 cursor-pointer text-gray-700 px-4 py-2 rounded-md flex items-center text-sm font-medium hover:bg-gray-200 transition-colors" onClick={handleShare}>
                              <Share2 className="h-4 w-4 mr-2" />
                              Share Project
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

export default ProjectById