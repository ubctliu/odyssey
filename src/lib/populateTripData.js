export const populateTripData = (dbTrip, setTripData) => {
  const tripDataFromDB = {
    location: dbTrip.location,
    startDate: new Date(dbTrip.startDate),
    endDate: new Date(dbTrip.endDate),
    title: dbTrip.title ?? "",
    description: dbTrip.description ?? "",
    imageUrl: dbTrip.imageUrl ?? "",
    placeId: dbTrip.placeId ?? "",
    // isLocationSet: false,
    // isDateSet: false,
    // key: 'selection',
    // clerkId: "",
    days: dbTrip.days.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    }),
    // days: [], needs logic to pull related days into array
    url: dbTrip.url,
    notes: dbTrip.notes ?? "",
  };
  
  // set the trip data pulled from DB into the tripData context
  setTripData((prev) => ({
    ...prev,
    ...tripDataFromDB
  }));

  // console.log("Loaded trip details from database:", dbTrip);
};

