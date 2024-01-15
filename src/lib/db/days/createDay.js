import { PrismaClient } from '@prisma/client';

export default async function createDay(days) {
  const prisma = new PrismaClient();
  // console.log("createDay days:", days);
  const totalNewDays = [];

  try {
    // Transform the input data to match the Day model
    const transformedDays = days.map(day => ({
      date: day.day, // Rename 'day' to 'date'
      tripId: day.tripId,
      notes: day.notes,
      lodging: day.lodging || '',
    }));

    const newDayPromises = transformedDays.map(async (day) => {
      return prisma.day.create({
        data: day,
      });
    });

    totalNewDays.push(...await Promise.all(newDayPromises));

    // const newDays = await prisma.day.createMany({
    //   data: transformedDays,
    // });

    return totalNewDays;
  } catch (error) {
    console.log("Error occurred while creating days:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
