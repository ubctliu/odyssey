'use client'
import { Calendar } from 'react-date-range';
import { useTripData } from '../context/TripDataContext';
import { useState } from 'react';
import { format } from 'date-fns';

const DatePicker = ({ className, startOrEndDate }) => {
  const { tripData, setTripData } = useTripData();
  const [openCalendar, setOpenCalendar] = useState(false);

  const handleClick = () => {
    setOpenCalendar((prev) => !prev)
  }
  
  return (
    <div>
    <input readOnly required
        className={className}
        onClick={handleClick}
        value={
          `${format(tripData[startOrEndDate], 'MM/dd/yyyy')}`
        }
      />
      {openCalendar && <Calendar className={className}
        date={tripData[startOrEndDate]}
        onChange={item => {setTripData((prev) => ({
          ...prev,
          [startOrEndDate]: item
        })); console.log(tripData)}}
      />}
      </div>
  )
}

export default DatePicker;