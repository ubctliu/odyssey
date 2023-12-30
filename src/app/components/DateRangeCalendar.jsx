'use client'
import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const DateRangeCalendar = ( { dateRangeData, setDateRangeData } ) => {
  const [openCalendar, setOpenCalendar] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const handleChange = (ranges) => {
    setSelectedDateRange(ranges.selection)
    setDateRangeData("true")
  }

  const handleClick = () => {
    setOpenCalendar((prev) => !prev)
  }

  dateRangeData = selectedDateRange

  return (
    <div className='calendar'>
      <input required
        className="border p-2 w-full"
        onClick={handleClick}
        id="date"
        name="date"
        value={
          selectedDateRange.endDate.getDate() == new Date().getDate() ? 'Date Range (Required)' :
          `${format(selectedDateRange.startDate, 'MMM/dd/yyyy')} to ${format(selectedDateRange.endDate, 'MMM/dd/yyy')}`
        }
      />
      {openCalendar && <DateRange
        ranges={[selectedDateRange]}
        onChange={handleChange}
        minDate={new Date()} // does not let the user pick dates that have passed.
        />
      }
    </div>
  )
}

export default DateRangeCalendar