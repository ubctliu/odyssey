import fetchTripIdByUserId from '@/lib/db/trips/fetchTripIdByUserId';
import { NextResponse } from 'next/server';


// GET /api/trips/[clerkId]/trips
export async function GET(req) {
  const userId = req.nextUrl.pathname.split("/api/users/")[1].replace("/trips", "");;
  if (req.method === "GET") {
    try {
      const fetchedTripData = await fetchTripIdByUserId(userId); //trips:[{},{}]
      console.log("fetchedTripData from ROUTE", fetchedTripData) 
      return NextResponse.json({ status: 201, data: fetchedTripData });
    } catch (error) {
      return NextResponse.json({ status: 500 }, { message: `${error}: Internal server error`});
    }
  } else {
    return NextResponse.json({ status: 405 }, { message: "Method not allowed" });
  }
}