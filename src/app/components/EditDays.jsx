import React, { useState } from 'react';
import Pencil from '../../../public/Icons/PencilIcon';
import { AiOutlineLoading3Quarters } from "react-icons/ai";


export default function EditDays({ notes, title, setNotes, edit, setEdit, events, isLoading, toggleVisibility, setIsLoading, dayid }) {
    const [eventNotes, setEventNotes] = useState(events.map((event) => event.notes));
    const [eventLocations, setEventLocations] = useState(events.map((event) => event.location));
    const [dayNotes, setDayNotes] = useState(notes);
  
    const handleNotesChange = (event) => {
        setDayNotes(event.target.value);
    };
  
    const handleEventNotesChange = (index, event) => {
      const updatedEventNotes = [...eventNotes];
      updatedEventNotes[index] = event.target.value;
      setEventNotes(updatedEventNotes);
    };
  
    const handleEventLocationChange = (index, event) => {
      const updatedEventLocations = [...eventLocations];
      updatedEventLocations[index] = event.target.value;
      setEventLocations(updatedEventLocations);
    };
  
    const handleSaveDayNotes = () => {
        
        console.log('Saving day notes:', dayNotes, 'for day:', dayid);
      };
  
    const handleSaveEvent = () => {
        events.forEach((event, index) => {
          const updatedEvent = {
            ...event,
            location: eventLocations[index],
            notes: eventNotes[index]
          };
          console.log('Saving event:', updatedEvent);
        });
      };
  
    const handleEdit = () => {
      setEdit(!edit);
    };
  
    return (
      <div className="flex h-auto bg-gray-100 p-4">
        <div className="border border-gray-300 shadow-lg rounded-lg p-6 bg-white max-w-lg w-full">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            {title} <Pencil className="inline-block w-4 h-4 ml-2 hover:cursor-pointer" onClick={handleEdit} />
          </h1>
          <hr className="my-4" />
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Notes</h2>
            <input
              type="text"
              className="text-gray-600 border border-gray-300 rounded p-2 w-full"
              value={dayNotes}
              onChange={handleNotesChange}
            />
            <div className='flex justify-center'>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4"
              onClick={handleSaveDayNotes}
            >
              Save Notes
            </button>
            </div>
            <hr className="my-4" />
          </div>
  
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-gray-700">Events</h2>
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin mx-auto" />
            ) : (
              events.map((event, index) => (
                <div key={index} className="text-gray-600 py-2">
                  <div className="flex justify-between items-center">
                    <span>
                      {event.timeStart.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} -{' '}
                      {event.timeEnd.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                    </span>
                    <span onClick={() => toggleVisibility(index)} className="cursor-pointer text-blue-500">
                      Details
                    </span>
                  </div>
                  {event.isVisible && (
                    <div className="mt-2 pl-4 border-l-2 border-gray-300">
                      <p>
                        Location:
                        <input
                          type="text"
                          className="text-gray-600 border border-gray-300 rounded p-2 w-full"
                          value={eventLocations[index]}
                          onChange={(event) => handleEventLocationChange(index, event)}
                        />
                      </p>
                      <p>
                        Notes:
                        <input
                          type="text"
                          className="text-gray-600 border border-gray-300 rounded p-2 w-full"
                          value={eventNotes[index]}
                          onChange={(event) => handleEventNotesChange(index, event)}
                        />
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4 ml-4"
              onClick={handleSaveEvent}
            >
              Save Event Change
            </button>
          </div>
        </div>
      </div>
    );
  }