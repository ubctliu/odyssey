import createDay from '@/lib/db/createDay';
import { NextResponse } from 'next/server';

// POST /api/days/new
// Required fields in body: { Day object, Trip object } - I think?
export async function POST(req) {
  if (req.method === "POST") {
    const { day, trip} = await req.json();
    try {
      const newDay = await createDay(trip);

      return NextResponse.json({ status: 201 }, { data: newDay });
    } catch (error) {
      return NextResponse.json({ status: 500 }, { message: `${error}: Internal server error`});
    }
  } else {
    return NextResponse.json({ status: 405 }, { message: "Method not allowed" });
  }
}