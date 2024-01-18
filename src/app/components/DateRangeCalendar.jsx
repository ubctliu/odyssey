'use client'
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import { useTripData } from '../context/TripDataContext';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const DateRangeCalendar = ({ className }) => {
  const { tripData, setTripData } = useTripData();
  const [openCalendar, setOpenCalendar] = useState(false);
  const [dateRange, setDateRange] = useState("");

  const handleChange = (ranges) => {

    setTripData(prev => ({
      ...prev,
      ...ranges.selection,
      isDateSet: true
    }))
    
    setDateRange(`${ranges.selection.startDate.toLocaleDateString('en-US')} - ${ranges.selection.endDate.toLocaleDateString('en-US')}`)
  }

  const handleClick = () => {
    setOpenCalendar((prev) => !prev)
  }

  return (
    <div className='calendar'>
      <input readOnly required
        className={className}
        onClick={handleClick}
        id="date"
        name="date"
        placeholder='Date Range (required)'
        value={dateRange}
      />
      {openCalendar && <DateRange
        ranges={[tripData]}
        onChange={handleChange}
        minDate={new Date()} // does not let the user pick dates that have passed.
        />
      }
    </div>
  )
}

export default DateRangeCalendar