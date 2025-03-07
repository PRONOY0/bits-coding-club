import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function TimelineDemo() {
    const data = [
        {
            title: "1. Application Submission",
            content: (
                <div>
                    <p className="text-muted-foreground mb-2">
                        Fill out the online application form with your details, coding experience, and areas of interest.
                    </p>
                    <p className="text-sm text-muted-foreground">Deadline: June 30, 2023</p>
                </div>
            ),
        },
        {
            title: "2. Coding Challenge",
            content: (
                <div>
                    <p className="text-muted-foreground mb-2">
                        Shortlisted candidates will receive a coding challenge to assess their problem-solving skills.
                    </p>
                    <p className="text-sm text-muted-foreground">Expected date: July 5-7, 2023</p>
                </div>
            ),
        },
        {
            title: "3. Interview",
            content: (
                <div>
                    <p className="text-muted-foreground mb-2">
                        Selected candidates will be invited for an interview with the club&apos;s core team to discuss their experience and motivation.
                    </p>
                    <p className="text-sm text-muted-foreground">Expected date: July 10-12, 2023</p>
                </div>
            ),
        },
        {
            title: "4. Results",
            content: (
                <div>
                    <p className="text-muted-foreground mb-2">
                        Final results will be announced and successful candidates will be welcomed to the club.
                    </p>
                    <p className="text-sm text-muted-foreground">Expected date: July 15, 2023</p>
                </div>
            ),
        },

    ];
    return (
        <div className="w-full">
            <Timeline data={data} />
        </div>
    );
}
