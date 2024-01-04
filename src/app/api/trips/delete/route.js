import deleteTrip from '@/lib/db/deleteTrip';
import { NextResponse } from 'next/server';

// DELETE /api/trips/delete
// Required fields in body: { Trip object, User object }  - subject to change
export async function DELETE(req) {
  if (req.method === "DELETE") {
    const { trip, user } = await req.json();
    try {
      const deletedTrip = await deleteTrip({ trip, user });

      return NextResponse.json({ status: 201 }, { data: deletedTrip });
    } catch (error) {
      return NextResponse.json({ status: 500 }, { message: `${error}: Internal server error`});
    }
  } else {
    return NextResponse.json({ status: 405 }, { message: "Method not allowed" });
  }
}