'use client'
import React, { useState, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const DateRangeCalendar = (  ) => {
  const [openDate, setOpenDate] = useState(false)
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  })

  const handleChange = (ranges) => {
    setSelectedDateRange(ranges.selection)
  }

  const handleClick = () => {
    setOpenDate((prev) => !prev)
  }

  return (
    <div className='calendar'>
      <input required
        className="border p-2 w-full"
        onClick={handleClick}
        id="date"
        name="date"
        placeholder={
          selectedDateRange.endDate.getDate() == new Date().getDate() ? 'Date Range (Required)' :
          `${format(selectedDateRange.startDate, 'MMM/dd/yyyy')} to ${format(selectedDateRange.endDate, 'MMM/dd/yyy')}`
        }
        // type="text"
        // onChange={(e) => {
        //   setDate(ranges.selection);
        //   setIsDateSet(date !== "");
        //   }
        // }
        // value={selectedDateRange}
      />
      {openDate && <DateRange
        ranges={[selectedDateRange]}
        onChange={handleChange}
        minDate={new Date()}
        />
      }
    </div>
  )
}

export default DateRangeCalendar