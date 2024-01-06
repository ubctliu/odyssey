import deleteDay from '@/lib/db/deleteDay';
import { NextResponse } from 'next/server';

// DELETE /api/days/delete
// Required fields in body: { Day object } - I think?
export async function DELETE(req) {
  if (req.method === "DELETE") {
    const { day } = await req.json();
    try {
      const deletedDay = await deleteDay(day);

      return NextResponse.json({ status: 201 }, { data: deletedDay });
    } catch (error) {
      return NextResponse.json({ status: 500 }, { message: `${error}: Internal server error`});
    }
  } else {
    return NextResponse.json({ status: 405 }, { message: "Method not allowed" });
  }
}