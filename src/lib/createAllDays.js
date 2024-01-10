import createDay from "@/lib/db/days/createDay";
import fetchTripByUrl from '@/lib/db/trips/fetchTripId';

export default async function createAllDays(trip) {
  const { startDate, endDate, url } = trip;
    const tripByUrl = await fetchTripByUrl(url);
    const tripId = tripByUrl.id;

    
  console.log("createAllDays startDate:", startDate);
    console.log("createAllDays endDate:", endDate);
    console.log("createAllDays tripId:", tripId);

  const days = [];

    const start = new Date(startDate);
    const end = new Date(endDate);

// Calculate the number of days between the start and end dates
const diffInDays = Math.floor((end - start) / (1000 * 60 * 60 * 24));

// Create an array of day objects based on the difference in days
for (let i = 0; i <= diffInDays; i++) {
  let day = new Date(start);
  day.setDate(day.getDate() + i);

  // Log each day for debugging
  console.log("Day " + i + ":", day);

  // Add day with tripId and empty notes
  days.push({ day, tripId, notes: '' });
}

  try {
      const newDays = await createDay(days);
        console.log("newDay:", newDays);
      return newDays;
    }
  catch (error) {
    console.log("Error occurred while creating days:", error);
    throw error;
  }
}