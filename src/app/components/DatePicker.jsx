'use client'
import { Calendar } from 'react-date-range';
import { useTripData } from '../context/TripDataContext';
import { useState } from 'react';

const DatePicker = ({ className, startOrEndDate, readOnly }) => {
  const { tripData, setTripData } = useTripData();
  const [openCalendar, setOpenCalendar] = useState(false);

  const handleClick = () => {
    setOpenCalendar((prev) => !prev)
  }
  return (
    <div>
      {readOnly === "readonly" ?  <input required
        className={className}
        defaultValue={`${tripData[startOrEndDate].toLocaleDateString('en-US')}`}
        readOnly={readOnly}
      />: <input required
        className={className}
        onClick={handleClick}
        defaultValue={`${tripData[startOrEndDate].toLocaleDateString('en-US')}`}
        readOnly={readOnly}
      />}
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