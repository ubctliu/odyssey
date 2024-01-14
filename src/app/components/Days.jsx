'use client'
import React, { useState, useEffect } from 'react';
import Pencil from '../../../public/Icons/PencilIcon';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRegCalendarPlus } from "react-icons/fa6";
import { createEvent } from "@/lib/api";
import Collapsible from '@/app/components/Collapsible';


const handleCreateEvent = async (day, setVisibleEvents, setIsCreating) => {
  try {
    setIsCreating(true);
    const newEvent = await createEvent(day, {timeStart: new Date(), timeEnd: new Date()});
    // add to visible events on create event
    setVisibleEvents((prev) => [...prev, {...newEvent.data, isVisible: false}]);
    console.log("Created event...", newEvent);
  } catch (error) {
    console.error("Error occurred while trying to create event:", error);
  } finally {
    setIsCreating(false);
  }
}


// TODO: rename component to Day to fit convention
// Props: day, title, setEdit, edit, isLoading, visibleEvents, setVisibleEvents
export default function Days({ day, title, setEdit, edit, isLoading, visibleEvents, setVisibleEvents, readOnly}) {
const { notes, events } = day;
const [isCreating, setIsCreating] = useState(false);
  const handleEdit = () => { 
    setEdit(!edit);
    // close all open details when switching between edit/normal
    setVisibleEvents(
      visibleEvents.map((currEvent) => (
      { ...currEvent, isVisible: false }
    )));
  }

  return (
    <div className="flex h-auto bg-gray-100 p-4">
      <div className="border border-gray-300 shadow-lg rounded-lg p-6 bg-white max-w-lg w-full">
        <div className='group'>
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">{title} {readOnly === "readonly" ? <div></div> : <Pencil className='inline-block w-4 h-4 ml-2 hover:cursor-pointer group-hover:animate-bounce' onClick={handleEdit}/>}</h1>
        </div>
        <hr className='my-4'/>
        <div>
          <h2 className="text-xl font-semibold text-gray-700">Notes</h2>
          <p className="text-gray-600">{notes}</p>
          <hr className='my-4'/>
        </div>

        <div className="mt-4">
        <Collapsible className={"text-xl font-semibold text-gray-700"} title={"Events"}>
          <div className='group'>
          <div className="flex items-center">
            <span>{isCreating ? <AiOutlineLoading3Quarters className='inline-block w-4 h-4 ml-2 animate-spin mx-auto'/> : readOnly === "readonly" ? <div></div> : <FaRegCalendarPlus className={"inline-block w-4 h-4 ml-2 hover:cursor-pointer group-hover:animate-bounce hover:fill-cyan-700"} onClick={() => handleCreateEvent(day, setVisibleEvents, setIsCreating)}/>}</span>
          </div>      
          </div>
          {isLoading ? (
            <AiOutlineLoading3Quarters className=' animate-spin mx-auto'/>
          ) : (
            visibleEvents?.map((event, index) => (
              <div key={index} className="text-gray-600 py-2 hover:bg-gray-200 rounded">
                <div className="flex justify-between items-center">
                  <span>
                    {event.timeStart ? new Date(event.timeStart).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit'}) : "" - event.timeEnd ? new Date(event.timeEnd).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit'}) : ""}  {event.location ?? ""}
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
          </Collapsible>
        </div>
      </div>
    </div>
  );
}