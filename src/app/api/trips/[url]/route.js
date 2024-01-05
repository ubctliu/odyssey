import fetchTrip from '@/lib/db/fetchTrip';
import { NextResponse } from 'next/server';


// GET /api/trips/[url]
export async function GET(req) {
  const url = req.nextUrl.pathname.split("/api/trips/")[1];
  if (req.method === "GET") {
    try {
      const fetchedTrip = await fetchTrip(url);
      return NextResponse.json({ status: 201, data: fetchedTrip });
    } catch (error) {
      return NextResponse.json({ status: 500 }, { message: `${error}: Internal server error`});
    }
  } else {
    return NextResponse.json({ status: 405 }, { message: "Method not allowed" });
  }
}