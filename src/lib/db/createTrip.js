import { PrismaClient } from '@prisma/client';

// Trip doesn't need to check if another identical trip already exists
export default async function createTrip({ trip, user }) {
  const prisma = new PrismaClient();

  try {

    const newTrip = await prisma.trip.create({
      data: {
        clerkId: user.id,
        location: trip.location,
        startDate: trip.startDate,
        endDate: trip.endDate,
        notes: trip.notes,
        user
      }
    });

    console.log("Trip created:", trip);
    return newTrip;
  } catch (error) {
    console.log("Error occurred while creating trip:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}