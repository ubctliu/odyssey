'use client'

import React, { useState, useEffect } from 'react';
import getDayNumberSuffix from '../../lib/getDayNumberSuffix';
import Pencil from '../../../public/Icons/PencilIcon';
import { fetchEvent } from '../../lib/api';
import { AiOutlineLoading3Quarters } from "react-icons/ai";


// Props: title, notes, day, dayid
export default function Days() {
  const dayid = 1; // Replace with props as needed
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await fetchEvent(dayid);
        setEvents(addIsVisibleProperty(fetchedData.data));
        setIsLoading(false); // Set isLoading to false after data is fetched
      } catch (error) {
        console.error("Error fetching events:", error);
        setIsLoading(false); // Set isLoading to false in case of an error
      }
    }

    fetchData();
  }, []);

  const addIsVisibleProperty = (data) => {
    if (Array.isArray(data)) {
      return data.map((event) => {
        return {
          ...event,
          isVisible: false,
          timeStart: new Date(event.timeStart),
          timeEnd: new Date(event.timeEnd)
        };
      });
    }
    return [];
  };

  const toggleVisibility = index => {
    setEvents(events.map((event, i) => i === index ? { ...event, isVisible: !event.isVisible } : event));
  };

  const currentDateTime = new Date(); // Replace with props as needed
  const dayOfWeek = currentDateTime.getDay();
  const month = currentDateTime.getMonth();
  const dayNumber = currentDateTime.getDate();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const title = `${days[dayOfWeek]}, ${months[month]} ${dayNumber}${getDayNumberSuffix(dayNumber)}`;

  // Use props or state for notes
  const notes = 'Note 1: Meeting at noon Note 2: Buy groceries';

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
          {isLoading ? (
            <AiOutlineLoading3Quarters className=' animate-spin mx-auto'/>
          ) : (
            events.map((event, index) => (
              <div key={index} className="text-gray-600 py-2">
                <div className="flex justify-between items-center">
                  <span>
                    {event.timeStart.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} -  {event.timeEnd.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                  </span>
                  <span onClick={() => toggleVisibility(index)} className="cursor-pointer text-blue-500">
                    Details
                  </span>
                </div>
                {event.isVisible && (
                  <div className="mt-2 pl-4 border-l-2 border-gray-300">
                    <p>Location: {event.location}</p>
                    <p>Notes: {event.notes}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}