import { PrismaClient } from '@prisma/client';

// Rough version of delete - requires url
export default async function deleteTrip(url) {
  const prisma = new PrismaClient();

  try {

    const deletedTrip = await prisma.trip.delete({
      where: {
        url: url
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