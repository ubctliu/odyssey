// import updateDayNotes from '@/lib/db/days/updateDay';
// import { NextResponse } from 'next/server';

// // PUT /api/days/update
// // Required fields in body: day notes
// export async function PUT(req) {
//   if (req.method === "PUT") {
//     const notes = await req.json();
//     console.log(notes);
//     try {
//       const updatedDay = await updateDay(notes);
//       return NextResponse.json({ status: 201 }, { data: updatedDay });
//     } catch (error) {
//       return NextResponse.json({ status: 500 }, { message: `${error}: Internal server error`});
//     }
//   } else {
//     return NextResponse.json({ status: 405 }, { message: "Method not allowed" });
//   }
// }