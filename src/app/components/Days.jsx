'use client'
import React, { useState, useEffect } from 'react';
import Pencil from '../../../public/Icons/PencilIcon';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRegCalendarPlus } from "react-icons/fa6";
import { createEvent } from "@/lib/api";
import { useTripData } from '@/app/context/TripDataContext';


const handleCreateEvent = async (day, setVisibleEvents, setIsCreating) => {
  try {
    setIsCreating(true);
    const newEvent = await createEvent(day, {location: "", timeStart: new Date(), timeEnd: new Date()});
        // add to visible events on create event
    setVisibleEvents((prev) => [...prev, {...newEvent.data, isVisible: false}]);
    console.log("Created event...", newEvent);
  } catch (error) {
    console.error("Error occurred while trying to create event:", error);
  } finally {
    setIsCreating(false);
  }
}


// TODO: rework implementation & rename component to Day to fit convention
// Props: title, notes, day, dayid
export default function Days({ day, title, setEdit, edit, isLoading, visibleEvents, setVisibleEvents}) {
const { notes, events } = day;
const [isCreating, setIsCreating] = useState(false);
const { tripData, setTripData } = useTripData();
  const handleEdit = () => { 
    setEdit(!edit);
  }

  return (
    <div className="flex h-auto bg-gray-100 p-4">
      <div className="border border-gray-300 shadow-lg rounded-lg p-6 bg-white max-w-lg w-full">
        <div className='group'>
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">{title} <Pencil className='inline-block w-4 h-4 ml-2 hover:cursor-pointer group-hover:animate-bounce' onClick={handleEdit}/></h1>
        </div>
        <hr className='my-4'/>
        <div>
          <h2 className="text-xl font-semibold text-gray-700">Notes</h2>
          <p className="text-gray-600">{notes}</p>
          <hr className='my-4'/>
        </div>

        <div className="mt-4">
          <div className='group'>
          <h2 className="text-xl font-semibold text-gray-700">Events</h2>
          {isCreating ? <AiOutlineLoading3Quarters className='inline-block w-4 h-4 ml-2 animate-spin mx-auto'/> : <FaRegCalendarPlus className={"inline-block w-4 h-4 ml-2 hover:cursor-pointer group-hover:animate-bounce"} onClick={() => handleCreateEvent(day, setVisibleEvents, setIsCreating)}/>}
          </div>
          {isLoading ? (
            <AiOutlineLoading3Quarters className=' animate-spin mx-auto'/>
          ) : (
            visibleEvents?.map((event, index) => (
              <div key={index} className="text-gray-600 py-2 hover:bg-gray-200 rounded">
                <div className="flex justify-between items-center">
                  <span>
                    {console.log(event)}
                    {new Date(event.timeStart).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit'})} -  {new Date(event.timeEnd).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit'})}
                  </span>
                  <span onClick={() => setVisibleEvents(
                      visibleEvents.map((currEvent) => (
                      currEvent.id === event.id ? { ...currEvent, isVisible: !currEvent.isVisible } : currEvent
                    )))} className="cursor-pointer text-blue-500">
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