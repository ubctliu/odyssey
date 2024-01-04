import { PrismaClient } from '@prisma/client';
//UPDATE WITH DAY INFO

// we don't need to worry about same days, as each trip will have Day 1 to Day x, correct?
export default async function createDay({ day }) {
  const prisma = new PrismaClient();

  try {

    const newDay = await prisma.day.create({
      data: {
        date: day.date,
        trip: day.tripId,
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