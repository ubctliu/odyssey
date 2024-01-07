import createDay from '../lib/db/createDay.js';

export default async function createAllDays(trip) {
    console.log("createAllDays trip:", trip);
  const { startDate, endDate, id: tripId } = trip;
  console.log("createAllDays startDate:", startDate);
    console.log("createAllDays endDate:", endDate);
    console.log("createAllDays tripId:", tripId);

  const days = [];

  // Calculate the number of days between the start and end dates
  const diffInDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));

  // Create an array of day objects based on the difference in days
  for (let i = 0; i <= diffInDays; i++) {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i);

    // Add day with tripId and empty notes
    days.push({ day, tripId, notes: '' });
  }
    console.log("createAllDays days:", days);

  try {
      const newDay = await createDay(days);
        console.log("newDay:", newDay);
      return newDays;
    }
  catch (error) {
    console.log("Error occurred while creating days:", error);
    throw error;
  }
}
