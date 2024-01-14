import { PrismaClient } from '@prisma/client';

// Trip doesn't need to check if another identical trip already exists - may need to handle duplicate trip urls (maybe with current timestamp in custom url?)
export default async function createTrip(trip) {
  console.log("createTrip trip:", trip);
  const prisma = new PrismaClient();
  try {
    // temporary solution, consider passing down info on call
    const currentUser = await prisma.user.findUnique({
      where: {
        clerkId: trip.clerkId
      }
    });
    console.log("Current user:", currentUser);

    const newTrip = await prisma.trip.create({
      data: {
        location: trip.location,
        startDate: trip.startDate,
        endDate: trip.endDate,
        notes: trip.notes,
        url: trip.url,
        title: trip.title,
        description: trip.description,
        imageUrl: trip.imageUrl,
        placeId: trip.placeId,
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