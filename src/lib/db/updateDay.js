import { PrismaClient } from '@prisma/client';
import getDayIdByTripId from '../getDayIdByTripId';

export default async function updateDay(day) {
  const prisma = new PrismaClient();
  const tripId = day.tripId;
  const dayId = getDayIdByTripId(tripId); //need to fix this

  try {

    const updatedDay = await prisma.day.update({
      where: {
        dayId: day.id
      },
      data: {
        notes: day.notes
      }
    });

    console.log("Day updated:", updatedDay);
    return updateDay;
  } catch (error) {
    console.log("Error occurred while updating day:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}