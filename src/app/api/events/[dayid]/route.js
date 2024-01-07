// api/events/[dayid]/

import fetchEventByDay from '@/lib/db/events/EventByDay';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const dayid = req.nextUrl.pathname.split("/api/events/")[1];
    if (req.method === "GET") {
      try {
        const event = await fetchEventByDay(dayid);
        return NextResponse.json({ status: 201, data: event });
      } catch (error) {
        return NextResponse.json({ status: 500 }, { message: `${error}: Internal server error`});
      }
    } else {
      return NextResponse.json({ status: 405 }, { message: "Method not allowed" });
    }
  }