async function getDayIdByTripId(tripId) {
  const trip = await prisma.trip.findDayId({
  where: { id: tripId },
  include: { days: true }, // Include the related days
});

  // Check if the trip exists
  if (!trip) {
    console.error('Trip not found');
    return null;
  }

  // right now this checks the first day only... need to change to handle any day
  // more specifically, the day that the user clicks 
  const updatedDay = trip.days[0];

  // Check if the day you wish to update exists
  if (!updatedDay) {
    console.error('Day not found for the trip');
    return null;
  }

  // Return the day ID
  return updatedDay.id;
}

export default getDayIdByTripId;