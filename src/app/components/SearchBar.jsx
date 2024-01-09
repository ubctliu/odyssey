"use client"
import {useRef, useState, useEffect } from 'react';
import { useAutocomplete } from '@vis.gl/react-google-maps';
import { useTripData } from '../context/TripDataContext';

const SearchBar = ({ className, setLocationData, dayEvent={} }) => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const {tripData, setTripData} = useTripData();

  useEffect(() => {
    // if day event is provided, set event location instead of trip location
    const timeoutId = setTimeout(() => {
      (dayEvent && Object.keys(dayEvent).length > 0) ?
      setTripData((prev) => ({
        ...prev,
        days: prev.days.map((curr) => 
        curr.id === dayEvent.day.id ? { ...curr, events: dayEvent.day.events.map((currEvent) => 
          currEvent.id === dayEvent.event.id ? 
            {...currEvent,
            location: dayEvent
              ? inputValue || currEvent.location
              : inputValue,
            }
        : currEvent ),}: curr)
      })):
      setTripData((prev) => 
      ({ 
        ...prev,
        location: inputValue,
        isLocationSet: inputValue !== ""
      }))
    }, 300);
    console.log(tripData);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputValue]);
  
// set the location once on render 
  useEffect(() => {
    setInputValue(dayEvent && Object.keys(dayEvent).length > 0 ? tripData.days
      .find((dayItem) => dayItem.id === dayEvent.day.id)
      .events.find((eventItem) => eventItem.id === dayEvent.event.id).location: "");
  }, []);

  const onPlaceChanged = place => {
    if (place) {
      setInputValue(place.formatted_address || place.name);
    }

    // Keep focus on input element
    inputRef.current && inputRef.current.focus();
  };

  useAutocomplete({
    inputField: inputRef && inputRef.current,
    onPlaceChanged
  });

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  return (
    <input required placeholder={"Location (required)"} className={className} ref={inputRef} 
    value={inputValue} onChange={handleInputChange} />
  );
};

export default SearchBar;