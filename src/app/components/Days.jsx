'use client'
import React, { useState } from 'react';
import Pencil from '../../../public/Icons/PencilIcon';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRegCalendarPlus } from "react-icons/fa6";
import { createEvent } from "@/lib/api";
import Collapsible from '@/app/components/Collapsible';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Event from "@/app/components/Event";
import { useTripData } from '../context/TripDataContext';

// TODO: add conditionals to things that may be empty like setVisibleEvents, google api photos, etc...
const handleCreateEvent = async (day, setVisibleEvents, setIsCreating) => {
  try {
    setIsCreating(true);
    const newEvent = await createEvent(day, {timeStart: new Date(), timeEnd: new Date()});
    // add to visible events on create event
    setVisibleEvents((prev) => (
      prev && prev.length > 0
        ? [...prev, { ...newEvent.data, isVisible: false }]
        : [{ ...newEvent.data, isVisible: false }]
    ));
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
const { tripData, setTripData } = useTripData();
const [isCreating, setIsCreating] = useState(false);
  const handleEdit = () => { 
    setEdit(!edit);
    // close all open details when switching between edit/normal
    setVisibleEvents(
      visibleEvents?.map((currEvent) => (
      { ...currEvent, isVisible: false }
    )));
  }

  function onDragEnd(result, day) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const events = reorder(
      visibleEvents,
      result.source.index,
      result.destination.index
    );

    setTripData((prev) => ({
      ...prev,
      days: prev.days.map((currDay) =>
        day.id === currDay.id ? { ...currDay, events } : currDay
      ),
    }));
    
    setVisibleEvents(events);
  }

  
  const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
  };

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
      <span>
        {isCreating ? (
          <AiOutlineLoading3Quarters className='inline-block w-4 h-4 ml-2 animate-spin mx-auto'/>
        ) : readOnly === "readonly" ? (
          <div></div>
        ) : (
          <FaRegCalendarPlus
            className={"inline-block w-4 h-4 ml-2 hover:cursor-pointer group-hover:animate-bounce hover:fill-cyan-700"}
            onClick={() => handleCreateEvent(day, setVisibleEvents, setIsCreating)}
          />
        )}
      </span>
    </div>      
  </div>
  {isLoading ? (
    <AiOutlineLoading3Quarters className=' animate-spin mx-auto'/>
  ) : (
    <DragDropContext onDragEnd={(result) => onDragEnd(result, day)}>
      <Droppable droppableId="event-list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {visibleEvents?.map((event, index) => (
              <Draggable key={event.id} draggableId={String(event.id)} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Event
                      key={event.id}
                      event={event}
                      index={index}
                      visibleEvents={visibleEvents}
                      setVisibleEvents={setVisibleEvents}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )}
</Collapsible>
        </div>
      </div>
    </div>
  );
}