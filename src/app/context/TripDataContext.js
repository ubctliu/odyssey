"use client"
import { createContext, useContext, useState } from 'react';

const TripDataContext = createContext();

export const TripDataProvider = ({ children }) => {
  const [tripData, setTripData] = useState({
    location: "",
    startDate: "",
    endDate: "",
    title: "",
    description: "",
    isLocationSet: false,
    isDateSet: false
  });

  return (
    <TripDataContext.Provider value={{ tripData, setTripData }}>
      {children}
    </TripDataContext.Provider>
  );
};

export const useTripData = () => useContext(TripDataContext);