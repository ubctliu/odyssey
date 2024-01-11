import updateEvent from '@/lib/db/events/updateEvent';
import { NextResponse } from 'next/server';

// PUT /api/events/update
export async function PUT(req) {
  if (req.method === "PUT") {
    const events  = await req.json();
    try {
      const updatedEvent = await updateEvent(events);
      return NextResponse.json({ status: 201 }, { data: updatedEvent });
    } catch (error) {
      return NextResponse.json({ status: 500 }, { message: `${error}: Internal server error`});
    }
  } else {
    return NextResponse.json({ status: 405 }, { message: "Method not allowed" });
  }
}