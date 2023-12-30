"use client"
import { createContext, useContext, useState } from 'react';

const TripDataContext = createContext();

export const TripDataProvider = ({ children }) => {
  const [tripData, setTripData] = useState({
    location: "",
    startDate: new Date(),
    endDate: new Date(),
    title: "",
    description: "",
    isLocationSet: false,
    isDateSet: false,
    key: 'selection'
  });

  return (
    <TripDataContext.Provider value={{ tripData, setTripData }}>
      {children}
    </TripDataContext.Provider>
  );
};

export const useTripData = () => useContext(TripDataContext);