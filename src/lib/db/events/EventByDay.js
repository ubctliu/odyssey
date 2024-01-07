import { PrismaClient } from "@prisma/client";

export default async function fetchEventByDay(dayId) {
  const prisma = new PrismaClient();

  try {
    const eventsByDay = await prisma.event.findMany({
      where: {
        dayId: parseInt(dayId),
      },
      orderBy: {
        timeStart: "asc",
      },
    });

    return eventsByDay;
  } catch (error) {
    console.error("Error occurred while fetching events by day:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}