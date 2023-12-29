"use client"
import React, {useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAutocomplete } from '@vis.gl/react-google-maps';

const SearchBar = ({ className, setLocationData }) => {
  const inputRef = useRef(null);
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLocationData((prev) => 
      ({ 
        ...prev,
        location: inputValue,
        isLocationSet: inputValue !== ""
      }));
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputValue, router]);
  

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
    <input required placeholder={"Location (required)"} className={className} ref={inputRef} value={inputValue} onChange={handleInputChange} />
  );
};

export default SearchBar;