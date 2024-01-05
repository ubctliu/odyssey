import { PrismaClient } from '@prisma/client';

// Fetches trip from DB else return
export default async function fetchTrip(url) {
  const prisma = new PrismaClient();

  try {
    const existingTrip = await prisma.trip.findUnique({
      where: {
        url: url
      }
    });

    if (!existingTrip) {
      console.log("Trip doesn't exist");
      return;
    }


    console.log("Trip fetched:", existingTrip);
    return existingUser;
  } catch (error) {
    console.log("Error occurred while fetching trip:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}