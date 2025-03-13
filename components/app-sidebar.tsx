"use client"

import * as React from "react"
import {
  Ticket,
  Calendar,
  Quote,
  LayoutGrid,
  BellIcon,
  ImagePlus,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
      isActive: true,
      items: [
        {
          title: "Add to Calendar",
          url: "/admin/calendar",
        },
        {
          title: "Update Details",
          url: "/admin/calendar/Update-calendar",
        },
      ],
    },
    {
      title: "Events",
      url: "/admin/events",
      icon: Ticket,
      items: [
        {
          title: "Plan Event",
          url: "/admin/events",
        },
        {
          title: "Edit Details",
          url: "/admin/events/edit-events",
        },
        {
          title: "Clear Event",
          url: "/admin/events/delete-events",
        },
      ],
    },
    {
      title: "Testimonials",
      url: "/admin/testimonials",
      icon: Quote,
      items: [
        {
          title: "Add Testimonial",
          url: "/admin/testimonials",
        },
        {
          title: "Edit Testimonial",
          url: "/admin/testimonials/edit-testimonials",
        },
        {
          title: "Remove Testimonial",
          url: "/admin/testimonials/delete-testimonials",
        },
      ],
    },
    {
      title: "Projects",
      url: "/admin/projects",
      icon: LayoutGrid,
      items: [
        {
          title: "Add Project",
          url: "/admin/projects",
        },
        {
          title: "Edit Details",
          url: "/admin/projects/edit-projects",
        },
        {
          title: "Remove Project",
          url: "/admin/projects/delete-projects",
        },
      ],
    },
    {
      title: "Updates",
      url: "/admin/updates",
      icon: BellIcon,
      items: [
        {
          title: "Post an Update",
          url: "/admin/updates",
        },
        {
          title: "Edit Details",
          url: "/admin/updates/edit-updates",
        },
        {
          title: "Remove Update",
          url: "/admin/updates/delete-updates",
        },
      ],
    },
    {
      title: "Gallery",
      url: "/admin/gallery",
      icon: ImagePlus,
      items: [
        {
          title: "Add Image to Gallery",
          url: "/admin/gallery",
        },
        {
          title: "Remove Image",
          url: "/admin/gallery/delete-gallery",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
