import createUser from '@/lib/createUser';
import { NextResponse } from 'next/server';

// POST /api/users/new
// Required fields in body: Clerk user object
export async function POST(req) {
  if (req.method === "POST") {
    const { user } = await req.json();
    try {
      const newUser = await createUser(user);

      return NextResponse.json({ status: 201 }, { data: newUser });
    } catch (error) {
      return NextResponse.json({ status: 500 }, { message: `${error}: Internal server error`});
    }
  } else {
    return NextResponse.json({ status: 405 }, { message: "Method not allowed" });
  }
}