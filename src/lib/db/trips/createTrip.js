import { PrismaClient } from '@prisma/client';

// Trip doesn't need to check if another identical trip already exists - may need to handle duplicate trip urls (maybe with current timestamp in custom url?)
export default async function createTrip(trip) {
  const prisma = new PrismaClient();
  try {
    // temporary solution, consider passing down info on call
    const currentUser = await prisma.user.findUnique({
      where: {
        clerkId: trip.clerkId
      }
    });

    const newTrip = await prisma.trip.create({
      data: {
        location: trip.location,
        startDate: trip.startDate,
        endDate: trip.endDate,
        notes: trip.notes,
        url: trip.url,
        userId: currentUser.id
      }
    });

    console.log("Trip created:", newTrip);
    return newTrip;
  } catch (error) {
    console.log("Error occurred while creating trip:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}