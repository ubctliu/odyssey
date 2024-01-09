import { PrismaClient } from '@prisma/client';

export default async function updateEvent(updatedEvents) {
  const prisma = new PrismaClient();

  try {
    // Process each event update in a loop
    for (const event of updatedEvents) {
      await prisma.event.updateMany({
        where: { id: event.id },
        data: {
          notes: event.notes,
          location: event.location
        }
      });
    }

    console.log("Events updated successfully");
  } catch (error) {
    console.log("Error occurred while updating events:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
