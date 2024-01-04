'use client'
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import { useTripData } from '../context/TripDataContext';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const DateRangeCalendar = () => {
  const { tripData, setTripData } = useTripData();
  const [openCalendar, setOpenCalendar] = useState(false);

  const handleChange = (ranges) => {
    setTripData(prev => ({
      ...prev,
      ...ranges.selection,
      isDateSet: true
    }))
  }

  const handleClick = () => {
    setOpenCalendar((prev) => !prev)
  }

  return (
    <div className='calendar'>
      <input readOnly required
        className="border p-2 w-full"
        placeholder='Date Range (required)'
        onClick={handleClick}
        id="date"
        name="date"
        value={
          tripData.endDate.getDate() == new Date().getDate() ? '' :
          `${format(tripData.startDate, 'MM/dd/yyyy')} - ${format(tripData.endDate, 'MM/dd/yyy')}`
        }
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