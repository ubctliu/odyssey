import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getDayIdByTripId(tripId, clickedDay) {
  const trip = await prisma.trip.findDayId({
    where: { id: tripId },
    include: { days: true }, // Include the related days
});

  // Check if the trip exists
  if (!trip) {
    console.error('Trip not found');
    return null;
  }

  // finds the day that matches the clicked day
  const clickedDay = trip.days.find(day => day.date === clickedDay);

  // Check if the day you wish to update exists
  if (!updatedDay) {
    console.error('Day not found for the trip');
    return null;
  }

  // Return the day ID
  return clickedDay.id;
}

export default getDayIdByTripId;