'use client'
import React from 'react';
import { DateRange } from 'react-date-range';
import { useState } from 'react';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const DateRangeCalendar = (props) => {
  const [openDate, setOpenDate] = useState(false)
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  })

  const handleChange = (ranges) => {
    setDate(ranges.selection)
  }

  const handleClick = () => {
    setOpenDate((prev) => !prev)
  }

  return (
    <div className='calendar'>
      <span onClick={handleClick}>
        Select a Date Range
      </span>
      {openDate && <DateRange
        ranges={[date]}
        onChange={handleChange}
        />
      }
    </div>
  )
}

export default DateRangeCalendar