import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { FaTimes } from 'react-icons/fa';
import { APIProvider } from '@vis.gl/react-google-maps';
import SearchBar from "./SearchBar";
import { stringToBase64 } from '@/lib/base64Utils';
import Link from 'next/link';

export default function NewItineraryModal({ onClose }) {
  const currentUser = useUser();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  // Add any other form fields or functions as needed

  const handleLocationChange = (data) => {
    setLocation(data);
  }

  const customUrl = stringToBase64(`${currentUser.user.id}&${location}&${date}`);

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
                placeholder="Title (Optional)"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <SearchBar onLocationData={handleLocationChange} className={"border p-2 w-full"}/>
            </div>
            <div className="mb-4">
              <input
                className="border p-2 w-full"
                id="date"
                name="date"
                placeholder="Date (Required)"
                type="text"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <textarea
                className="border p-2 w-full"
                id="description"
                name="description"
                placeholder="Description (Optional)"
                rows="4"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <Link 
            href={`/plan/${customUrl}`}
            className="bg-blue-500 text-white px-4 py-2 rounded">
              Save
            </Link>
          </form>
        </div>
      </div>
    </div>
    </APIProvider>
  );
}
