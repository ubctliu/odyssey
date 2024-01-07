import { PrismaClient } from '@prisma/client';
import getDayIdByTripId from '../../getDayIdByTripId';

export default async function deleteDay( day ) {
  const prisma = new PrismaClient();
  const tripId = day.tripId;
  const dayId = getDayIdByTripId(tripId);

  try {

    const deletedDay = await prisma.day.delete({
      where: {
        id: dayId,
      }
    });

    return deletedDay; 
  } catch (error) {
    console.log("Error occurred while deleting day:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}