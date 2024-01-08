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
    days: []
  };

  // reset the base variables
  setTripData({defaultTripData});
  const resetData = { ...tripData };

  // if keys don't exist in the default trip data, then delete it
  Object.keys(resetData).forEach((key) => {
    if (!defaultTripData.hasOwnProperty(key)) {
      delete resetData[key];
    }
  });

  //set trip data to the reset object
  setTripData(resetData);
};
