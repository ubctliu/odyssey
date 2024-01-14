import { PrismaClient } from '@prisma/client';

export default async function createDay(days) {
  const prisma = new PrismaClient();
  console.log("createDay days:", days);

  try {
    // Transform the input data to match the Day model
    const transformedDays = days.map(day => ({
      date: day.day, // Rename 'day' to 'date'
      tripId: day.tripId,
      notes: day.notes,
      lodging: day.lodging || '',
    }));

    const newDays = await prisma.day.createMany({
      data: transformedDays,
    });

    // const existingTrip = await prisma.trip.findUnique({
    //     where: {
    //       id: days[0].tripId,
    //     },
    //     include: {
    //       days:{
    //         include: {
    //           events: true
    //         },
    //       },
    //     },
    //   });

    //   if (!existingTrip) {
    //     console.log("Trip doesn't exist");
    //     return existingTrip; // equal to null
    //   }

    // setTripData((prev) => ({ ...prev, days: existingTrip.days }));

    return newDays;
  } catch (error) {
    console.log("Error occurred while creating days:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
