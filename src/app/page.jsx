'use client'
import Link from "next/link";
import Image from "next/image";
import vacation from '../../public/images/vacation.png';
import TitleTypeWriter from "./components/TitleTypeWriter";
import Modal from "./components/NewItineraryModal";
import React, { useState } from "react";

export default function Component() {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      {showModal && <Modal />}
      <main className="px-6 py-8">
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex justify-center">Welcome to Odyssey</h2>
          <span className="font-semibold text-black mb-4 flex justify-center">
            <TitleTypeWriter />
          </span>
          <div className="flex justify-center items-center">
            <button
              className="text-white bg-emerald-400 hover:text-white hover:bg-emerald-500 p-2 rounded-lg border"
              onClick={handleButtonClick}
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