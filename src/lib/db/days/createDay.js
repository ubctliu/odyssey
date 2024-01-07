import { PrismaClient } from '@prisma/client';

export default async function createDay({ day }) {
  const prisma = new PrismaClient();

  try {

    const newDay = await prisma.day.create({
      data: {
        date: day.date,
        trip: day.tripId,
        lodging: day.lodging,
        notes: day.notes
      }
    });

    console.log("Day created:", day);
    return newDay;
  } catch (error) {
    console.log("Error occurred while creating day:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}