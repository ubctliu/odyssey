"use client"
import { useUser } from "@clerk/nextjs";
import vacationimg from "../../public/images/vacationimg.png"
import Image from "next/image"
import Link from "next/link";
import { createUser } from "@/lib/api";
import { useEffect, useState } from "react";
import { useTripData } from "@/app/context/TripDataContext";
import { resetTripData } from "@/lib/resetTripData";
import TitleTypeWriter from "@/app/components/TitleTypeWriter";
import NewItineraryModal from "@/app/components/NewItineraryModal"; 

const userExists = async (user) => {
  try {
    const newUser = await createUser(user);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
  
export default function (Component) {
  const [showModal, setShowModal] = useState(false);
  const currentUser = useUser();
  const { tripData, setTripData } = useTripData();

  useEffect(() => {
    if (currentUser.isLoaded && currentUser.user) {
      userExists(currentUser.user);
    }
  }, [currentUser.isLoaded]);
  
  
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="h-5/6">
      <main className="flex justify-between p-16 bg-gray-400 items-center border border-b-8 border-solid border-b-slate-700">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to Odyssey</h1>
          {/* <TitleTypeWriter className={"text-2xl font-semibold text-white mb-4"} /> */}
          <Link
            className="text-white bg-emerald-400 hover:text-white hover:bg-emerald-500 p-2 rounded-lg border"
            href="/plan/new"
            onClick={() => resetTripData(tripData, setTripData)}
          >
            + Create a New Itinerary
          </Link>
          {showModal && <NewItineraryModal onClose={closeModal} />}
          <button
              className="text-white bg-orange-400 hover:text-white hover:bg-orange-500 p-2 rounded-lg border"
              onClick={() => { openModal(); resetTripData(tripData, setTripData); }}
            >
              Quickstart
            </button>
        </div>
        <Image src={vacationimg} alt="vacation" className="w-1/2 border-solid border-x-orange-300 border-4" />

      </main>
    </div>
  )
}