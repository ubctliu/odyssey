import fetchUser from '@/lib/db/users/fetchUser';
import { NextResponse } from 'next/server';


// GET /api/users/[clerkId]
// Required fields in body: Clerk user object
export async function GET(req) {
  const userId = req.nextUrl.pathname.split("/api/users/")[1];
  if (req.method === "GET") {
    try {
      const fetchedUser = await fetchUser(userId);
      return NextResponse.json({ status: 201, data: fetchedUser });
    } catch (error) {
      return NextResponse.json({ status: 500 }, { message: `${error}: Internal server error`});
    }
  } else {
    return NextResponse.json({ status: 405 }, { message: "Method not allowed" });
  }
}