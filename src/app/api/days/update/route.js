import updateUser from '@/lib/db/updateUser';
import { NextResponse } from 'next/server';

// PUT /api/users/update
// Required fields in body: Clerk user object
export async function PUT(req) {
  if (req.method === "PUT") {
    const { user } = await req.json();
    try {
      const updatedUser = await updateUser(user);
      return NextResponse.json({ status: 201 }, { data: updatedUser });
    } catch (error) {
      return NextResponse.json({ status: 500 }, { message: `${error}: Internal server error`});
    }
  } else {
    return NextResponse.json({ status: 405 }, { message: "Method not allowed" });
  }
}