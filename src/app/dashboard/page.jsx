
'use client';

import { useState } from "react";
import Image from "next/image";
import TitleTypeWriter from "@/app/components/TitleTypeWriter";
import NewItineraryModal from "@/app/components/NewItineraryModal"; // Assuming NewItineraryModal is a separate component
import vacation from '../../../public/images/vacation.png';
import { useTripData } from "@/app/context/TripDataContext";
import { resetTripData } from "@/lib/resetTripData";

export default function Component() {
  const [showModal, setShowModal] = useState(false);
  const { tripData, setTripData } = useTripData();

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
          <span className=" font-semibold text-black mb-4 flex justify-center">
            <TitleTypeWriter />
          </span>
          <div className="flex justify-center items-center">
            <button
              className="text-white bg-orange-400 p-4 rounded-lg border transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-50"
              onClick={() => { openModal(); resetTripData(tripData, setTripData); }}
            >
              Get Started
            </button>
          </div>
          <Image src={vacation} alt="vacation photo" className="mx-auto" />
        </section>
      </main>
     
    </div>
  );
}
