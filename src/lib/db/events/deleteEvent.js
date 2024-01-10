import { PrismaClient } from '@prisma/client';

export default async function deleteEvent( event ) {
  const prisma = new PrismaClient();

  try {

    const deletedEvent = await prisma.event.delete({
      where: {
        id: event.id,
      }
    });

    return deletedEvent; 
  } catch (error) {
    console.log("Error occurred while deleting event:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}