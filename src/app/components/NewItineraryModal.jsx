import { FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import React from 'react';

export default function NewItineraryModal() {
  const [showModal, setShowModal] = useState(true);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-4/6">
          <div className="text-center">
            <FaTimes className="cursor-pointer" onClick={closeModal} />
            <h2 className="text-xl font-bold mb-4">New Itinerary</h2>
            <form>
              <div className="mb-4">
                <input
                  className="border p-2 w-full"
                  id="title"
                  name="title"
                  placeholder="Title"
                  type="text"
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <input
                  className="border p-2 w-full"
                  id="date"
                  name="date"
                  placeholder="Date"
                  type="text"
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              {/* Additional form fields */}
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
}