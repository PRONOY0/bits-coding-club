import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Types
type Project = {
    id?: string;
    title?: string;
    description?: string;
    image?: string;
    teamName?: string;
    type: string;
    liveLink?: string;
    gitHubLink?: string;
    tags?: string[];
    content?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

type Update = {
    id?: string;
    title?: string;
    category?: string;
    shortDescription?: string;
    date?: string;
    image?: string;
    content?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

type Event = {
    id?: string;
    title?: string;
    category?: string;
    content?: string;
    image?: string;
    date?: Date;
    time?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

type Testimonial = {
    id?: string;
    name?: string;
    batch?: string;
    feedback?: string;
    image?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

type Gallery = {
    id?: string;
    images?: string;
};

// App Context interface
interface AppContextType {
    projects: Project[];
    updates: Update[];
    events: Event[];
    testimonials: Testimonial[];
    gallery: Gallery[];
    loading: boolean;
    error: string | null;
    refetchData: () => void;
}

// Default context value
const defaultContextValue: AppContextType = {
    projects: [],
    updates: [],
    events: [],
    testimonials: [],
    gallery: [],
    loading: false,
    error: null,
    refetchData: () => { }
};

// Create context
const AppContext = createContext<AppContextType>(defaultContextValue);

// Props interface for the provider
interface AppProviderProps {
    children: ReactNode;
}

// API URLs
const apiUrls = [
    "/api/projects",
    "/api/updates",
    "/api/testimonials",
    "/api/events",
    "/api/Gallery"
];

// Provider component
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [updates, setUpdates] = useState<Update[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [gallery, setGallery] = useState<Gallery[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const responses = await Promise.all(
                apiUrls.map(url => axios.get(url))
            );

            // Set data based on responses with proper indexing as specified
            setProjects(responses[0].data.projects || []);
            setUpdates(responses[1].data.updates || []);
            setTestimonials(responses[2].data.testimonials || []);
            setEvents(responses[3].data.events || []);
            setGallery(responses[4].data.gallery || []);

        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Failed to fetch data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Initial data fetch
    useEffect(() => {
        fetchData();
    }, []);

    // Context value
    const contextValue: AppContextType = {
        projects,
        updates,
        events,
        testimonials,
        gallery,
        loading,
        error,
        refetchData: fetchData
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook for using the context
export const useAppContext = () => {
    const context = useContext(AppContext);

    if (context === undefined) {
        throw new Error("useAppContext must be used within an AppProvider");
    }

    return context;
};