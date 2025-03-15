import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

const CALENDAR_ID =
  "2153dbb17197506a8df99fda41cb76223ee67d41b9991e03aea88906446c25eb@group.calendar.google.com";

interface CalendarEventUpdatePayload {
  summary?: string;
  start?: {
    dateTime: string;
    timeZone: string;
  };
  end?: {
    dateTime: string;
    timeZone: string;
  };
}

export async function PUT(req: NextRequest) {
  console.log("Called");
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const requestData = await req.json();
  const { eventId, title, start, end } = requestData;

  if (!eventId) {
    return NextResponse.json(
      { error: "Event ID is required" },
      { status: 400 }
    );
  }

  console.log(`Updating event ID: ${eventId} and ${CALENDAR_ID}`);

  try {
    const fetchResponse = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events/${eventId}`,
      {
        method: "GET", // Change from PUT to PATCH
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!fetchResponse.ok) {
      throw new Error("Failed to fetch existing event");
    }

    const existingEvent = await fetchResponse.json();

    const updatePayload: CalendarEventUpdatePayload = {};

    if (title !== undefined) {
      updatePayload.summary = title;
    }

    if (start !== undefined) {
      updatePayload.start = {
        dateTime: start,
        timeZone: existingEvent.start?.timeZone || "UTC",
      };
    }

    if (end !== undefined) {
      updatePayload.end = {
        dateTime: end,
        timeZone: existingEvent.end?.timeZone || "UTC",
      };
    }

    console.log(`Updating event ID: ${eventId}, payload:`, updatePayload);

    const updateResponse = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events/${eventId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatePayload),
      }
    );

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json();
      console.error("Google Calendar API error:", errorData);
      throw new Error(
        `Failed to update event: ${errorData.error?.message || "Unknown error"}`
      );
    }

    const updatedEvent = await updateResponse.json();
    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { eventId: string } }
) {
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
