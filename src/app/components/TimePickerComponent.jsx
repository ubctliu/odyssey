import 'rc-time-picker/assets/index.css';
import React from 'react';
import { useState } from 'react';
import moment from 'moment'; // JavaScript library for parsing, validating, manipulating, and formatting dates.
import TimePicker from 'rc-time-picker';
import { useTripData } from '../context/TripDataContext';

const TimePickerComponent = ({ className, value, dayEvent={} }) => {
  const format = 'hh:mm a';
  const parsedValue = moment(value, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(format);
  const [selectedTime, setSelectedTime] = useState(moment(parsedValue, format));
  const {tripData, setTripData} = useTripData();

  const onChange = (value) => {
    console.log(value && value.format(format));
    setSelectedTime(value);
    updateTime(value)
  };

  const updateTime = (value, dayEvent={}) => {
    setTripData((prev) => ({
      ...prev, 
      days: prev.days.map((selectedDay) =>
      dayEvent.day.id === selectedDay.id ? {...selectedDay, events: dayEvent.events.map((currEvent) =>
        currEvent.id === dayEvent.events.id ? {...currEvent, timeStart:value} : currEvent)} : selectedDay
      )
    }))
  }

  return (
    <TimePicker
      className={className}
      showSecond={false}
      value={selectedTime}
      onChange={onChange}
      format={format}
      use12Hours
      inputReadOnly
      minuteStep={5} // creates 5 minute intervals
    />
  );
};

export default TimePickerComponent;
