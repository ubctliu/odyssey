import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getDayIdByTripId(tripId, selectedDay) {
  try {
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: { days: true }, // Include the related days
    });

  // Check if the trip exists
  if (!trip) {
    console.error('Trip not found');
    return null;
  }

  // finds the day that matches the clicked day
  const clickedDay = trip.days.find(day => day.date === selectedDay);

  // Check if the day you wish to update exists
  if (!clickedDay) {
    console.error('Day not found for the trip');
    return null;
  }

  // Return the day ID
  return clickedDay.id;
  } catch (error) {
    console.error('Error occurred while fetching day ID', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

export default getDayIdByTripId;