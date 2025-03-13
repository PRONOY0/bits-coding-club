import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const CALENDAR_ID =
  "2153dbb17197506a8df99fda41cb76223ee67d41b9991e03aea88906446c25eb@group.calendar.google.com";

export async function PUT(req: NextRequest) {
  console.log("Called");
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { eventId, title, start, end } = await req.json();

  if (!eventId) {
    return NextResponse.json(
      { error: "Event ID is required" },
      { status: 400 }
    );
  }

  if (!start || !end) {
    return NextResponse.json(
      { error: "Start and End time are required" },
      { status: 400 }
    );
  }

  console.log(`Updating event ID: ${eventId} and ${CALENDAR_ID}`);

  try {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events/${eventId}`,
      {
        method: "PATCH", // Change from PUT to PATCH
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary: title,
          start: { dateTime: start, timeZone: "UTC" },
          end: { dateTime: end, timeZone: "UTC" },
        }),
      }
    );

    console.log("response", response);

    if (!response.ok) {
      throw new Error("Failed to update event");
    }

    const updatedEvent = await response.json();
    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { eventId: string } }) {
  console.log("DELETE Called");
  const session = await getServerSession(authOptions);
  const { eventId } = params;
  console.log("eventId", eventId);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!eventId) {
    return NextResponse.json(
      { error: "Event ID is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events/${eventId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    console.log(response);

    if (!response.ok) {
      throw new Error("Failed to delete event");
    }

    return NextResponse.json({ message: "Event deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
