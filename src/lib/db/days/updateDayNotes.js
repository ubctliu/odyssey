import { PrismaClient } from '@prisma/client';

export default async function updateDayNotes(day) {
  const prisma = new PrismaClient();

  try {

    const updatedDay = await prisma.day.update({
      where: {
        id: day.id
      },
      data: {
        notes: day.notes,
      }
    });

    console.log("Day notes updated:", updatedDay);
    return updatedDay;
  } catch (error) {
    console.log("Error occurred while updating day notes:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}