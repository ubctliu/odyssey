import { PrismaClient } from '@prisma/client';

export default async function updateEvent(events) {
  const prisma = new PrismaClient();
  // const returnArray = [];
  try {
    // Process each event update in a loop
    for (const event of events) {
      const updatedEvent = await prisma.event.update({
        where: { id: event.id },
        data: {
          notes: event.notes,
          location: event.location
        }
      });
      // returnArray.push(updatedEvent);
    }

    // console.log("Updated events successfully:", returnArray);
  } catch (error) {
    console.log("Error occurred while updating events:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
