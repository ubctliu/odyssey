'use client'
import { Calendar } from 'react-date-range';
import { useTripData } from '../context/TripDataContext';
import { useState } from 'react';

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
          `${tripData[startOrEndDate].toLocaleDateString('en-US')}`
        }
      />
      {openCalendar && <Calendar className={className}
        date={tripData[startOrEndDate]}
        onChange={item => setTripData((prev) => ({
          ...prev,
          [startOrEndDate]: item
        }))}
      />}
      </div>
  )
}

export default DatePicker;