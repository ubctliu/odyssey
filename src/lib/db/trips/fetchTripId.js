import { PrismaClient } from '@prisma/client';

// Syntax: fetchTrip(url) by default - fetchTrip(url, true) for retrieving related days/events as well
// Fetches trip from DB else return          dataIncluded false by default to avoid overfetching
export default async function fetchTripByUrl(url) {
  const prisma = new PrismaClient();
  try {
    const tripid = await prisma.trip.findUnique({
      where: {
        url: url,
      }});

    if (!tripid) {
      console.log("Trip doesn't exist");
      return tripid;
    }
    console.log("Trip fetched:", tripid);
    return tripid;
  } catch (error) {
    console.log("Error occurred while fetching trip:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}