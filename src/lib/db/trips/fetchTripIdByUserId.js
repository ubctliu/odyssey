import { PrismaClient } from '@prisma/client';

// Syntax: fetchTripId(userId) by default - fetchTripId(userId) for retrieving related days/events as well
// Fetches trip from DB else return
export default async function fetchTripIdByUserId(userId) {
  const prisma = new PrismaClient();
  try {
    const trips = await prisma.user.findUnique({ // trips should be an array of trips
      where: {
        clerkId: userId,
      }, 
      select: { 
        trips: true,
      },
    });

    if (!trips) {
      console.log("Trips don't exist");
      return trips;
    }

    console.log("Trip data fetched:", trips);
    return trips;

  } catch (error) {
    console.log("Error occurred while fetching trips:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}