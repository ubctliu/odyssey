import deleteEvent from '@/lib/db/events/deleteEvent';
import { NextResponse } from 'next/server';

// TODO
// DELETE /api/events/delete
// Required fields in body: { }  - subject to change
export async function DELETE(req) {
  if (req.method === "DELETE") {
    const {} = await req.json();
    try {
      const deletedEvent = await deleteEvent(user);

      return NextResponse.json({ status: 201 }, { data: deletedEvent });
    } catch (error) {
      return NextResponse.json({ status: 500 }, { message: `${error}: Internal server error`});
    }
  } else {
    return NextResponse.json({ status: 405 }, { message: "Method not allowed" });
  }
}