import { PrismaClient } from '@prisma/client';

// Rough version of delete - requires trip id and user id
export default async function deleteTrip({ trip, user }) {
  const prisma = new PrismaClient();

  try {

    const deletedTrip = await prisma.trip.delete({
      where: {
        id: trip.id,
        userId: user.id
      }
    });

    return deletedTrip; 
  } catch (error) {
    console.log("Error occurred while deleting trip:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}