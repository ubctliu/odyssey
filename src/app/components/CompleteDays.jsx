'use client';

import getDayNumberSuffix from "@/lib/getDayNumberSuffix";
import react, { useState, useEffect } from "react";
import EditDays from "./EditDays";
import Days from "./Days";
import { fetchEvent } from "@/lib/api";

const CompleteDays = ({ day }) => {

    const dayid = day.id;
    const currentDateTime = new Date(day.date);
    const dayOfWeek = currentDateTime.getDay();
    const month = currentDateTime.getMonth();
    const dayNumber = currentDateTime.getDate();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const title = `${days[dayOfWeek]}, ${months[month]} ${dayNumber}${getDayNumberSuffix(dayNumber)}`;

    // Use props or state for notes
    const [notes, setNotes] = useState(day.notes);
    const [edit, setEdit] = useState(false);
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
  

    
      return (
        <div>
          {edit ? (
            <EditDays
              toggleVisibility={toggleVisibility}
              title={title}
              notes={notes}
              setNotes={setNotes}
              dayid={dayid}
              edit={edit}
              setEdit={setEdit}
              events={events}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          ) : (
            <Days
              toggleVisibility={toggleVisibility}
              title={title}
              notes={notes}
              dayid={dayid}
              edit={edit} 
              setEdit={setEdit}
              events={events}
              isLoading={isLoading}
              setIsLoading={setIsLoading}      
            />
          )}
        </div>
      );
  };
  
  export default CompleteDays;

