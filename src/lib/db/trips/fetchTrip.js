import { PrismaClient } from '@prisma/client';

// Syntax: fetchTrip(url) by default - fetchTrip(url, true) for retrieving related days/events as well
// Fetches trip from DB else return          dataIncluded false by default to avoid overfetching
export default async function fetchTrip(url, dataIncluded=false) {
  const prisma = new PrismaClient();
  try {
    const existingTrip = await prisma.trip.findUnique({
      where: {
        url: url,
      },
      include: {
        days:{
          include: {
            events: dataIncluded ? {} : false
          },
        },
      },
    });

    if (!existingTrip) {
      console.log("Trip doesn't exist");
      return existingTrip; // equal to null
    }


    // console.log("Trip fetched:", existingTrip);
    return existingTrip;
  } catch (error) {
    console.log("Error occurred while fetching trip:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}