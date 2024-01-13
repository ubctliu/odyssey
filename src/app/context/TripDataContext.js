"use client"
import { createContext, useContext, useState } from 'react';

const TripDataContext = createContext();

// TODO: need to reset trip data context between trip creations
export const TripDataProvider = ({ children }) => {
  const [tripData, setTripData] = useState({
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
    placeId: "" // place id for google coords
  });

  return (
    <TripDataContext.Provider value={{ tripData, setTripData }}>
      {children}
    </TripDataContext.Provider>
  );
};

export const useTripData = () => useContext(TripDataContext);