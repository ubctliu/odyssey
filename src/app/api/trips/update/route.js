import updateTrip from '@/lib/db/trips/updateTrip';
import { NextResponse } from 'next/server';

// PUT /api/trips/update
// Required fields in body: Trip user object
export async function PUT(req) {
  if (req.method === "PUT") {
    const { trip } = await req.json();
    try {
      const updatedTrip = await updateTrip(trip);
      return NextResponse.json({ status: 201 }, { data: updatedTrip });
    } catch (error) {
      return NextResponse.json({ status: 500 }, { message: `${error}: Internal server error`});
    }
  } else {
    return NextResponse.json({ status: 405 }, { message: "Method not allowed" });
  }
}