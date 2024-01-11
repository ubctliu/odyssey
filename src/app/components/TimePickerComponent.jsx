import 'rc-time-picker/assets/index.css';
import React from 'react';
import { useTripData } from '../context/TripDataContext';
import { useState } from 'react';
import moment from 'moment'; //JavaScript library for parsing, validating, manipulating, and formatting dates.
import TimePicker from 'rc-time-picker';

const format = 'h:mm a';
// const now = moment().hour(0).minute(0);

const TimePickerComponent = ({ className, value }) => {
  const [selectedTime, setSelectedTime] = useState(moment(value, format));

  const onChange = (value) => {
    console.log(value && value.format(format));
    setSelectedTime(value);
  };

  return (
    <TimePicker
      className={className}
      showSecond={false}
      value={selectedTime}
      onChange={onChange}
      format={format}
      use12Hours
      inputReadOnly
    />
  );
};

export default TimePickerComponent;
