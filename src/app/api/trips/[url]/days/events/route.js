import fetchTrip from '@/lib/db/trips/fetchTrip';
import { NextResponse } from 'next/server';


// GET /api/trips/[url]/days/events
export async function GET(req) {
  const url = req.nextUrl.pathname.split("/api/trips/")[1].replace("/days/events", "");
  if (req.method === "GET") {
    try {
      const fetchedTrip = await fetchTrip(url, true);
      return NextResponse.json({ status: 201, data: fetchedTrip });
    } catch (error) {
      return NextResponse.json({ status: 500 }, { message: `${error}: Internal server error`});
    }
  } else {
    return NextResponse.json({ status: 405 }, { message: "Method not allowed" });
  }
}