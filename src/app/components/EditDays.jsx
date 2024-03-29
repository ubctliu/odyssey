import { useState } from 'react';
import { useTripData } from '@/app/context/TripDataContext';
import Pencil from '../../../public/Icons/PencilIcon';
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import SearchBar from './SearchBar';
import { APIProvider } from '@vis.gl/react-google-maps';
import { updateDayEvents, updateDayNotes, deleteEvent } from "@/lib/api"
import TimePickerComponent from '@/app/components/TimePickerComponent';
import DatePicker from './DatePicker';

  // save events & handle loading animation for events
const handleSaveEvents = async (day, setIsSaving) => {
  try {
    setIsSaving((prev) => (
      { 
        ...prev,
        events: true
      }
    ));
  const updatedEvents = await updateDayEvents(day.events);
  console.log("Updating events...", updatedEvents);
  } catch (error) {
    console.error("Error occurred while trying to update events:", error);
  } finally {
    setIsSaving((prev) => (
      { 
        ...prev,
        events: false
      }
    ));
  }
};

  // save notes & handle loading animation for notes
const handleSaveNotes = async (day, setIsSaving) => {
  try {
    setIsSaving((prev) => (
      { 
        ...prev,
        notes: true
      }
    ));
    const updatedNotes = await updateDayNotes(day);
    console.log("Updating notes...", updatedNotes);
  } catch (error) {
    console.error("Error occurred while trying to update events:", error);
  } finally {
    setIsSaving((prev) => (
      { 
        ...prev,
        notes: false
      }
    ));
  }
};

const handleDeleteEvent = async (event, setIsSaving, setVisibleEvents) => {
  try {
    setIsSaving((prev) => (
      { 
        ...prev,
        delete: true,
        eventId: event.id
      }
    ));
    const deletedEvent = await deleteEvent(event);
    // delete from visible events on delete event
    setVisibleEvents((prev) => prev.filter((currEvent) => currEvent.id !== event.id));
    console.log("Deleted event...", deletedEvent);
  } catch (error) {
    console.error("Error occurred while trying to delete event:", error);
  } finally {
    setIsSaving((prev) => (
      { 
        ...prev,
        delete: false,
        eventId: null
      }
    ));
  }
}

export default function EditDays({ day, title, edit, setEdit, isLoading, visibleEvents, setVisibleEvents, readonly}) {
    // crude implementation for loading state
    const [isSaving, setIsSaving] = useState({notes: false, events: false, delete: false, eventId: null});
    const { tripData, setTripData } = useTripData();
    const { notes, events } = day;
  
    const handleEdit = () => {
      setEdit(!edit);
      // close all open details when switching between edit/normal
      setVisibleEvents(
        visibleEvents?.map((currEvent) => (
        { ...currEvent, isVisible: false }
      )));
    };
  
    return (
      <div className="flex h-auto bg-gray-100 p-4">
        <div className="border border-gray-300 shadow-lg rounded-lg p-6 bg-white max-w-lg w-full">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          <div className='group'>
            {title} <Pencil className="inline-block w-4 h-4 ml-2 hover:cursor-pointer group-hover:animate-bounce" onClick={handleEdit} />
            </div>
          </h1>
          <hr className="my-4" />
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Notes</h2>
            <input
              type="text"
              className="text-gray-600 border border-gray-300 rounded p-2 w-full"
              value={notes}
              onChange={e => { 
                setTripData((prev) => ({
                  ...prev,
                  days: prev.days.map((curr) => 
                  curr.id === day.id ? { ...curr, notes: e.target.value } : curr)
                }
                ))}}
            />
            <div className='flex justify-center'>
            {isSaving.notes ? <AiOutlineLoading3Quarters className="animate-spin mx-auto" /> : <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4" type="button"
              onClick={() => handleSaveNotes(day, setIsSaving)}
            >
              Save Notes
            </button>}
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
                      <TimePickerComponent 
                        value={event.timeStart}
                        dayEvent={{ day, event }}
                        tripData={tripData}
                        setVisibleEvents={setVisibleEvents}
                        visibleEvents={visibleEvents}
                        timeStartOrEnd={"timeStart"}
                        />-
                      <TimePickerComponent 
                        value={event.timeEnd}
                        dayEvent={{ day, event }}
                        tripData={tripData}
                        setVisibleEvents={setVisibleEvents}
                        visibleEvents={visibleEvents}
                        timeStartOrEnd={"timeEnd"}
                        />
                    </span>
                    <span onClick={() => setVisibleEvents(
                      visibleEvents.map((currEvent) => (
                      currEvent.id === event.id ? { ...currEvent, isVisible: !currEvent.isVisible } : currEvent
                    )))} className="cursor-pointer text-blue-500">
                      Details
                    </span>
                    {isSaving.delete && isSaving.eventId === event.id ? <AiOutlineLoading3Quarters className="animate-spin mx-auto" /> : 
                    <div className='group'>
                    <FaTrashAlt onClick={() => handleDeleteEvent(event, setIsSaving, setVisibleEvents)} className={"cursor-pointer group-hover:animate-bounce"} />
                    </div>
                    }
                  </div>
                  <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY} libraries={['places']}>
                  {event.isVisible && (
                    <div className="mt-2 pl-4 border-l-2 border-gray-300">
                      <p>
                        Location:
                        <SearchBar
                          setVisibleEvents={setVisibleEvents}
                          visibleEvents={visibleEvents}
                          className={"text-gray-600 border border-gray-300 rounded p-2 w-full"}
                          dayEvent={{ day, event }}
                          tripData={tripData}
                        />
                      </p>
                      <p>
                        Notes:
                        <input
                          type="text"
                          className="text-gray-600 border border-gray-300 rounded p-2 w-full"
                          value={tripData.days
                            .find((dayItem) => dayItem.id === day.id)
                            .events?.find((eventItem) => eventItem.id === event.id).notes}
                          onChange={e => {
                            setTripData((prev) => ({
                              ...prev,
                              days: prev.days.map((curr) => 
                              curr.id === day.id ? { ...curr, events: day.events.map((currEvent) =>
                                currEvent.id === event.id ? { ...currEvent, notes: e.target.value} : currEvent
                              )} : curr)
                            }
                            ))
                            setVisibleEvents(visibleEvents.map((currEvent) => (
                              currEvent.id === event.id ? { ...currEvent, notes: e.target.value } : currEvent)));
                          }}
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
          {isSaving.events ? <AiOutlineLoading3Quarters className="animate-spin mx-auto" /> :   
          <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4 ml-4" type="button"
              onClick={()=> handleSaveEvents(day, setIsSaving)}
            >
              Save Event Change
            </button>}
          </div>
        </div>
      </div>
    );
  }