export const resetTripData = (tripData, setTripData) => {
  const defaultTripData = {
    location: "",
    startDate: new Date(),
    endDate: new Date(),
    title: "",
    description: "",
    imageUrl: "",
    isLocationSet: false,
    isDateSet: false,
    key: 'selection',
    clerkId: "",
    url: "",
    notes: "",
    days: [],
    placeId: ""
  };

  // reset the base variables
  const resetData = { ...defaultTripData };

  // if keys don't exist in the default trip data, then delete it
  Object.keys(resetData).forEach((key) => {
    if (!defaultTripData.hasOwnProperty(key)) {
      delete resetData[key];
    }
  });

  console.log(resetData);

  //set trip data to the reset object
  setTripData(resetData);
};
