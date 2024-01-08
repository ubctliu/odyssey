export const populateTripData = (dbTrip, setTripData) => {
  const tripDataFromDB = {
    location: dbTrip.location,
    startDate: new Date(dbTrip.startDate),
    endDate: new Date(dbTrip.endDate),
    title: dbTrip.title ?? "",
    description: dbTrip.description ?? "",
    imageUrl: dbTrip.title ?? "",
    // isLocationSet: false,
    // isDateSet: false,
    // key: 'selection',
    // clerkId: "",
    // days: [], needs logic to pull related days into array
    url: dbTrip.url,
    notes: dbTrip.url ?? ""
  };
  
  // set the trip data pulled from DB into the tripData context
  setTripData((prev) => ({
    ...prev,
    ...tripDataFromDB
  }));
  console.log("Loaded trip details from database:", dbTrip);
};

