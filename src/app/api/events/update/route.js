import updateEvent from '@/lib/db/updateEvent';
import { NextResponse } from 'next/server';

// TODO
// PUT /api/events/new
// Required fields in body: { }  - subject to change
export async function PUT(req) {
  if (req.method === "PUT") {
    const {} = await req.json();
    try {
      const updatedEvent = await updateEvent();

      return NextResponse.json({ status: 201 }, { data: updatedEvent });
    } catch (error) {
      return NextResponse.json({ status: 500 }, { message: `${error}: Internal server error`});
    }
  } else {
    return NextResponse.json({ status: 405 }, { message: "Method not allowed" });
  }
}