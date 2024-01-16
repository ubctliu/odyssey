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
    days: dbTrip.days,
    // days: [], needs logic to pull related days into array
    url: dbTrip.url,
    notes: dbTrip.notes ?? "",
  };
  
  // set the trip data pulled from DB into the tripData context
  setTripData((prev) => ({
    ...prev,
    ...tripDataFromDB,
    days: tripDataFromDB.days.map((day) => ({
      ...day,
      events: day.events.sort((a, b) => {
        // compare order if available
        if (a.order !== undefined && b.order !== undefined) {
          return a.order - b.order;
        }
      
        // fallback to timeCreated if order is undefined
        return new Date(a.timeCreated) - new Date(b.timeCreated);
      })
    }))
  }));

  // console.log("Loaded trip details from database:", dbTrip);
};

