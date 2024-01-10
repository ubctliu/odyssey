import updateDayNotes from '@/lib/db/days/updateDayNotes';
import { NextResponse } from 'next/server';

// PUT /api/days/update/notes
// Required fields in body: day
export async function PUT(req) {
  if (req.method === "PUT") {
    const day  = await req.json();
    try {
      console.log("from update notes", day);
      const updatedDay = await updateDayNotes(day);
      return NextResponse.json({ status: 201 }, { data: updatedDay });
    } catch (error) {
      return NextResponse.json({ status: 500 }, { message: `${error}: Internal server error`});
    }
  } else {
    return NextResponse.json({ status: 405 }, { message: "Method not allowed" });
  }
}