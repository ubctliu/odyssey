import createEvent from '@/lib/db/events/createEvent';
import { NextResponse } from 'next/server';

// POST /api/events/new
// Required fields in body: { day, event }  - subject to change
export async function POST(req) {
  if (req.method === "POST") {
    const { day, event } = await req.json();

    try {
      const newEvent = await createEvent(day, event);
      return NextResponse.json({ status: 201 }, { data: newEvent });
    } catch (error) {
      return NextResponse.json({ status: 500 }, { message: `${error}: Internal server error`});
    }
  } else {
    return NextResponse.json({ status: 405 }, { message: "Method not allowed" });
  }
}