'use client';
import { useRef, useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import TitleTypeWriter from "@/app/components/TitleTypeWriter";
import NewItineraryModal from "@/app/components/NewItineraryModal"; // Assuming NewItineraryModal is a separate component
import { useTripData } from "@/app/context/TripDataContext";
import { resetTripData } from "@/lib/resetTripData";
import { fetchTripIdByUserId } from "@/lib/api";
import Link from 'next/link';
import { redirect } from 'next/navigation'

const fetchTripInfo = async (clerkId, setUserTripData) => {
  try {
    const fetchedUserData = await fetchTripIdByUserId(clerkId);
    const fetchedTripData = fetchedUserData.data.trips;
    setUserTripData(fetchedTripData);
  } catch (error) {
    console.error('Error:', error);
  }
};

export default function Component() {
  const [showModal, setShowModal] = useState(false);
  // const [currentIndex, setCurrentIndex] = useState(0);
  const [userTripData, setUserTripData] = useState([]);
  const { tripData, setTripData } = useTripData();
  const currentUser = useUser();
  const takeoff = "/videos/planetakeoff.mp4";
  const defaultDashboardImage = "/images/defaultDashboardImage.jpg";
  const url = userTripData.url

  useEffect(() => {
    if (!currentUser.isLoaded) {
      return;
    }

    fetchTripInfo(currentUser.user.id, setUserTripData);
  }, [currentUser.isLoaded]);

  const imageIds = Array.from(
    { length: 3 },
    () => Math.floor(Math.random() * 250) + 1
  );

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % imageIds.length);
  };

  const openModal = () => {
    setShowModal(true);
    console.log('url', url)
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="h-screen flex flex-col justify-normal items-center bg-slate-350">
      <div>
        <video
          src={takeoff}
          autoPlay
          loop
          muted
          playsInline
          className="top-0 left-0 w-full h-50 object-fit z-0"
        >
        </video>
      </div>
      <main className="mt-2 absolute h-1/2 w-3/4 lg:h-3/4 mx-auto flex flex-col p-4 items-center border border-b-6 border-solid rounded-2xl border-b-slate-100 shadow-2xl backdrop-blur-md bg-white/30">
        <h1 className="flex items-center justify-center text-4xl font-bold text-slate-900 mb-4 animate-fade-in-down pt-5">
          {currentUser.isSignedIn
            ? `Hello, ${currentUser.user.firstName}.`
            : "Hello, Guest"}{" "}
          Here are your planned trips.
        </h1>
        <div className="flex flex-col space-x-6 space-y-6 items-center">
          {/* Center the Carousel and its contents */}
          <div className="flex items-center justify-center w-1/2 h-3/4 lg:w-full lg:h-full lg:space-x-6 lg:space-y-6">
            <Carousel>
              {userTripData.map((trip) => {
                return (
                  <div key={trip.id} className="mx-auto flex align-center items-center w-1/2 h-4/5 lg:w-1/2 lg:h-3/5">
                    <Link key={trip.id} href={`/plan/${trip.url}`} className="text-xl">
                      <img
                        src={trip.imageUrl ? trip.imageUrl : defaultDashboardImage}
                        alt="Trip banner image"
                        className="border mt-7 w-1/2 h-3/4 relative rounded-lg transition-transform duration-300 ease-in-out hover:scale-110 animate-fade-in"
                      />
                      <p className="mt-2 mb-2 text-center text-black font-semibold">
                        {trip.title ? trip.title : trip.location}
                        <br />
                        <div className="hover:text-slate-200 mb-4 text-sm">See Trip Details</div>
                      </p>
                    </Link>
                  </div>
                );
              })}
            </Carousel>
          </div>

          {showModal && <NewItineraryModal onClose={closeModal} />}
            <section className="mb-8">
              <span className=" font-semibold text-black mb-4 flex justify-center">
                {/* <TitleTypeWriter /> */}
              </span>
              <div className="flex justify-center items-center">
                <button
                  className="text-white bg-orange-400 p-4 rounded-lg border transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-orange-500 duration-50"
                  onClick={() => { openModal(); resetTripData(tripData, setTripData); }}
                >
                Create a New Trip
                </button>
              </div>
            </section>
        </div>
      </main>
    </div>
  );
};
