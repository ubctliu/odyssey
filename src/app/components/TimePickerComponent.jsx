import 'rc-time-picker/assets/index.css';
import React from 'react';
import { useState } from 'react';
import moment from 'moment'; //JavaScript library for parsing, validating, manipulating, and formatting dates.
import TimePicker from 'rc-time-picker';

//for some reason all time is showing up as 8:something PM for me...
const TimePickerComponent = ({ className, value }) => {
  const format = 'hh:mm a';
  const parsedValue = moment(value, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(format);
  const [selectedTime, setSelectedTime] = useState(moment(parsedValue, format));

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
      minuteStep={5} //creates 5 minute intervals
    />
  );
};

export default TimePickerComponent;
