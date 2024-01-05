'use client'
import React, { useState } from 'react';
import getDayNumberSuffix from '../../lib/getDayNumberSuffix';
import Pencil from '../../../public/Icons/PencilIcon';
import fetchEventByDay from '../../lib/db/EventByDay';
// props needed: title, notes, events 

export default function Days() {
  const dateTime = new Date(); // for now using current days date - will be replaced props later
  const dayOfWeek = dateTime.getDay();
  const month = dateTime.getMonth();
  const dayNumber = dateTime.getDate();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const title = `${days[dayOfWeek]}, ${months[month]} ${dayNumber}${getDayNumberSuffix(dayNumber)}`;


  // fake data for now - will be replaced with data from database later
  const notes = 'Note 1: Meeting at noon Note 2: Buy groceries';
 
  // all data passed from props or created based on props will be stored in this array with a added isVisible property which may be just mapped to it
  const [events, setEvents] = useState([
    { timeStart: '09:00 AM', timeEnd: '10:00 AM', description: 'swim', location: 'pool', notes: 'Bring swimsuit and towel', isVisible: false },
    { timeStart: '11:00 AM', timeEnd: '12:00 PM', description: 'idk', location: 'unknown', notes: 'TBD', isVisible: false },
    { timeStart: '03:00 PM', timeEnd: '04:00 PM', description: 'shop', location: 'mall', notes: 'Buy groceries', isVisible: false },
  ]);
  
  // function to toggle visibility of event details
  const toggleVisibility = index => {
    const newEvents = events.map((event, i) => {
      if (i === index) {
        return { ...event, isVisible: !event.isVisible };
      }
      return event;
    });
    setEvents(newEvents);
  };

  return (
    <div className="flex h-auto bg-gray-100 p-4">
      <div className="border border-gray-300 shadow-lg rounded-lg p-6 bg-white max-w-lg w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">{title} <Pencil className='inline-block w-4 h-4 ml-2 hover:cursor-pointer'/></h1>
        <hr className='my-4'/>
        <div>
          <h2 className="text-xl font-semibold text-gray-700">Notes</h2>
          <p className="text-gray-600">{notes}</p>
          <hr className='my-4'/>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-700">Events</h2>
          {events.map((event, index) => (
            <div key={index} className="text-gray-600 py-2">
              <div className="flex justify-between items-center" onClick={() => toggleVisibility(index)}>
                <span>{event.timeStart} - {event.timeEnd}</span>
                <button className="text-blue-500">Details</button>
              </div>
              {event.isVisible && (
                <div className="mt-2 pl-4 border-l-2 border-gray-300">
                  <p>Description: {event.description} </p>
                  <p>Location: {event.location}</p>
                  <p>Notes: {event.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
