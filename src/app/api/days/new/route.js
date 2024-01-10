import createDay from '@/lib/db/createDay';
import { NextResponse } from 'next/server';

// POST /api/days/new
// Required fields in body: { Day object } - I think?
export async function POST(req) {
  if (req.method === "POST") {
    const days  = await req.json();
    try {
      const newDays = await createDay(days);

      return NextResponse.json({ status: 201 }, { data: newDays });
    } catch (error) {
      return NextResponse.json({ status: 500 }, { message: `${error}: Internal server error`});
    }
  } else {
    return NextResponse.json({ status: 405 }, { message: "Method not allowed" });
  }
}