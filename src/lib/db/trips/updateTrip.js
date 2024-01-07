import { PrismaClient } from '@prisma/client';

// Try to update existing trip
export default async function updateTrip(trip) {
  const prisma = new PrismaClient();

  try {

    const updatedTrip = await prisma.trip.update({
      where: {
        url: trip.url
      },
      data: {
      /* TODO: These currently don't exist in the schema - need to add */
        description: trip.description,
        title: trip.title,
        location: trip.location,
        startDate: trip.startDate,
        endDate: trip.endDate,
        notes: trip.notes,
        imageUrl: trip.imageUrl
      }
    });

    console.log("Trip updated:", updatedTrip);
    return updatedTrip;
  } catch (error) {
    console.log("Error occurred while updating trip:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}