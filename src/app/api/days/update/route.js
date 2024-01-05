import updateDay from '@/lib/db/updateDay';
import { NextResponse } from 'next/server';

// PUT /api/days/update
// Required fields in body: Trip object
export async function PUT(req) {
  if (req.method === "PUT") {
    const { day } = await req.json();
    try {
      const updatedDay = await updateDay(day);
      return NextResponse.json({ status: 201 }, { data: updatedDay });
    } catch (error) {
      return NextResponse.json({ status: 500 }, { message: `${error}: Internal server error`});
    }
  } else {
    return NextResponse.json({ status: 405 }, { message: "Method not allowed" });
  }
}