"use client"
import React, {useRef, useState} from 'react';
import { useAutocomplete } from '@vis.gl/react-google-maps';

const SearchBar = () => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

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
    <input className={"bg-white text-black p-2 rounded-lg border border-black"} ref={inputRef} value={inputValue} onChange={handleInputChange} />
  );
};

export default SearchBar;