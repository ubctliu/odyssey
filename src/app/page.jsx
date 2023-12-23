'use client';

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TitleTypeWriter from "./components/TitleTypeWriter";
import NewItineraryModal from "./components/NewItineraryModal"; // Assuming NewItineraryModal is a separate component
import vacation from '../../public/images/vacation.png';

export default function Component() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {showModal && <NewItineraryModal onClose={closeModal} />}
      <main className="px-6 py-8">
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex justify-center">Welcome to Odyssey</h2>
          <span className="font-semibold text-black mb-4 flex justify-center">
            <TitleTypeWriter />
          </span>
          <div className="flex justify-center items-center">
            <button
              className="text-white bg-emerald-400 hover:bg-emerald-500 p-2 rounded-lg border"
              onClick={openModal}
            >
              + Create a New Itinerary
            </button>
          </div>
          <Image src={vacation} className="mx-auto" />
        </section>
      </main>
    </div>
  );
}
