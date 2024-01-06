import { PrismaClient } from "@prisma/client";

export default async function fetchEventByDay(dayId = 1) {
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

    console.log("Events by day fetched:", eventsByDay);
    return eventsByDay;
  } catch (error) {
    console.error("Error occurred while fetching events by day:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}