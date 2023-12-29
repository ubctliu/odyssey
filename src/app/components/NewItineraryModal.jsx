import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { FaTimes } from 'react-icons/fa';
import { APIProvider } from '@vis.gl/react-google-maps';
import SearchBar from "./SearchBar";
import { stringToBase64 } from '@/lib/base64Utils';
import Link from 'next/link';
import DateRangeCalendar from './DateRangeCalendar';

export default function NewItineraryModal({ onClose }) {
  const currentUser = useUser();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [isLocationSet, setIsLocationSet] = useState(false);
  const [isDateSet, setIsDateSet] = useState(false);
  const guestId = "womdon231j2mklmksA"; // just random characters for now - should add logic to randomize later

  // Add any other form fields or functions as needed

  // Don't proceed until user data is loaded
  if (!currentUser.isLoaded) {
    return <div>Loading...</div>
  }
  
  const customUrl = currentUser.isSignedIn ? stringToBase64(`${currentUser.user.id}&${location}&${date}&${title}&${description}`) : stringToBase64(`${guestId}&${location}&${date}&${title}&${description}`);

  return (
    <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY} libraries={['places']}>
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-4/6">
        <div className="text-center">
          <FaTimes className="cursor-pointer" onClick={onClose} />
          <h2 className="text-xl font-bold mb-4">New Itinerary</h2>
          <form>
            <div className="mb-4">
              <input
                className="border p-2 w-full"
                id="title"
                name="title"
                placeholder="Title (optional)"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <SearchBar onLocationData={setLocation} setIsLocationSet={setIsLocationSet} className={"border p-2 w-full"}/>
            </div>
            <div className="mb-4">
              {/* <input required
                className="border p-2 w-full"
                id="date"
                name="date"
                placeholder="Date Range (required)"
                type="text"
                onChange={(e) => {
                  setDate(e.target.value);
                  setIsDateSet(date !== "");
                }}
              /> */}
              <DateRangeCalendar 
                dateRange={setDate}
              />
            </div>
            <div>
              
            </div>
            <div className="mb-4">
              <textarea
                className="border p-2 w-full"
                id="description"
                name="description"
                placeholder="Description (optional)"
                rows="4"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            {
              (isDateSet && isLocationSet) ?
              currentUser.isSignedIn ?
              <Link 
            href={`/plan/${customUrl}`}
            className="bg-blue-500 text-white px-4 py-2 rounded">
              Save
            </Link> : 
            <Link 
            href={`/plan/${customUrl}`}
            className="bg-orange-400 text-white px-4 py-2 rounded">
              Continue as Guest
            </Link>:
            <Link 
            href={""}
            className="bg-gray-400 text-white px-4 py-2 rounded">
              Missing required fields!
            </Link>
            }
            
          </form>
        </div>
      </div>
    </div>
    </APIProvider>
  );
}
