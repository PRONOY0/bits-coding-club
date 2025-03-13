import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest } from "next/server";

const CALENDAR_ID =
  "2153dbb17197506a8df99fda41cb76223ee67d41b9991e03aea88906446c25eb@group.calendar.google.com";
const API_URL = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`;

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        Accept: "application/json",
      },
    });

    if (!res.ok) throw new Error("Failed to fetch events at backend");

    const data = await res.json();
    return NextResponse.json(data.items || []);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, start, end } = await req.json();

  try {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary: title, // Google Calendar uses 'summary'
          description: "Created via Next.js Calendar",
          start: { dateTime: start, timeZone: "UTC" },
          end: { dateTime: end, timeZone: "UTC" },
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create event");
    }

    const event = await response.json();
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({error: `Internal Server Error due to ${error}`},{ status: 500, statusText:`Internal Server error due to ${error}` });
  }
}
