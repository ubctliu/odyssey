import React, { useState } from 'react';
import { useTripData } from '@/app/context/TripDataContext';
import Pencil from '../../../public/Icons/PencilIcon';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import SearchBar from './SearchBar';
import { APIProvider } from '@vis.gl/react-google-maps';


export default function EditDays({ day, title, edit, setEdit,isLoading, toggleVisibility, setIsLoading }) {
    // const [eventNotes, setEventNotes] = useState(events.map((event) => event.notes));
    // const [eventLocations, setEventLocations] = useState(events.map((event) => event.location));
    const {tripData, setTripData} = useTripData();
    const { notes, events } = day;
    const [visibleEvents, setVisibleEvents] = useState(events?.map((event) => ({ ...event, isVisible: false })));
    // const handleEventNotesChange = (index, event) => {
    //   const updatedEventNotes = [...eventNotes];
    //   updatedEventNotes[index] = event.target.value;
    //   setEventNotes(updatedEventNotes);
    // };
  
    // const handleEventLocationChange = (index, event) => {
    //   const updatedEventLocations = [...eventLocations];
    //   updatedEventLocations[index] = event.target.value;
    //   setEventLocations(updatedEventLocations);
    // };
  
    const handleSaveDayNotes = () => {
        console.log('Saving day notes:', dayNotes, 'for day:', day.id);
      };
  
    const handleSaveEvent = () => {
        events.forEach((event, index) => {
          const updatedEvent = {
            ...event,
            location: events[index],
            notes: events[index]
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
              value={day.notes}
              onChange={e => { 
                setTripData((prev) => ({
                  ...prev,
                  days: prev.days.map((curr) => 
                  curr.id === day.id ? { ...curr, notes: e.target.value } : curr)
                }
                ))}}
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
              visibleEvents?.map((event, index) => (
                <div key={index} className="text-gray-600 py-2">
                  <div className="flex justify-between items-center">
                    <span>
                      {new Date(event.timeStart).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} -{' '}
                      {new Date(event.timeEnd).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                    </span>
                    <span onClick={() => setVisibleEvents(
                      visibleEvents.map((currEvent) => (
                      currEvent.id === event.id ? { ...currEvent, isVisible: !currEvent.isVisible } : currEvent
                    )))} className="cursor-pointer text-blue-500">
                      Details
                    </span>
                  </div>
                  <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY} libraries={['places']}>
                  {event.isVisible && (
                    <div className="mt-2 pl-4 border-l-2 border-gray-300">
                      <p>
                        Location:
                        <SearchBar
                          setLocationData={setTripData}
                          className={"text-gray-600 border border-gray-300 rounded p-2 w-full"}
                          dayEvent={{ day, event }}
                          tripData={tripData}
                        />
                        {/* <input
                          type="text"
                          className="text-gray-600 border border-gray-300 rounded p-2 w-full"
                          value={tripData.days
                            .find((dayItem) => dayItem.id === day.id)
                            .events.find((eventItem) => eventItem.id === event.id).location}
                          onChange={e => { 
                            setTripData((prev) => ({
                              ...prev,
                              days: prev.days.map((curr) => 
                              curr.id === day.id ? { ...curr, events: events.map((currEvent) => 
                                currEvent.id === event.id ? { ...currEvent, location: e.target.value} : currEvent
                              )} : curr)
                            }
                            ))}}
                        /> */}
                      </p>
                      <p>
                        Notes:
                        <input
                          type="text"
                          className="text-gray-600 border border-gray-300 rounded p-2 w-full"
                          value={tripData.days
                            .find((dayItem) => dayItem.id === day.id)
                            .events.find((eventItem) => eventItem.id === event.id).notes}
                          onChange={e => { 
                            setTripData((prev) => ({
                              ...prev,
                              days: prev.days.map((curr) => 
                              curr.id === day.id ? { ...curr, events: day.events.map((currEvent) =>
                                currEvent.id === event.id ? { ...currEvent, notes: e.target.value} : currEvent
                              )} : curr)
                            }
                            ))}}
                        />
                      </p>
                    </div>
                  )}
                  </APIProvider>
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