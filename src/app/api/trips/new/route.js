import createTrip from '@/lib/db/createTrip';
import { NextResponse } from 'next/server';

// POST /api/trips/new
// Required fields in body: { Trip object }  - subject to change
export async function POST(req) {
  if (req.method === "POST") {
    const { trip } = await req.json();
    try {
      const newTrip = await createTrip(trip);

      return NextResponse.json({ status: 201 }, { data: newTrip });
    } catch (error) {
      return NextResponse.json({ status: 500 }, { message: `${error}: Internal server error`});
    }
  } else {
    return NextResponse.json({ status: 405 }, { message: "Method not allowed" });
  }
}