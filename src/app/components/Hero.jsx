import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useTripData } from "@/app/context/TripDataContext";
import { resetTripData } from "@/lib/resetTripData";
import NewItineraryModal from "./NewItineraryModal";
import AOS from "aos";
import 'aos/dist/aos.css';

import Link from "next/link";

const beach = "/images/beach.png";
// const userExists = async (user) => {
//     try {
//       const newUser = await createUser(user);
//     } catch (error) {
//       console.error("An error occurred:", error);
//     }
//   };

const Hero = () => {
    const [showModal, setShowModal] = useState(false);
    const currentUser = useUser();
    const { tripData, setTripData } = useTripData();
  
    // useEffect(() => {
    //   if (currentUser.isLoaded && currentUser.user) {
    //     userExists(currentUser.user);
    //   }
    // }, [currentUser.isLoaded]);

    useEffect(() => {
      AOS.init({duration:2000})
    });
  
    const openModal = () => {
      setShowModal(true);
    };
  
    const closeModal = () => {
      setShowModal(false);
    };
    return (
        <section
        className="w-screen flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container pl-20" data-aos='fade-right'>
            <div
            className="relative x1:w-2/5 flex flex-col justify-center items-start w-full max-xl:padding-x animate-slideIn">
                <h1 className="mt-10 font-palanquin text-8xl max-sm:text-[72px] max-sm:leading-[82] font-bold animate-slideIn">
                    <span className="xl:bg-white xl:whitespace-nowrap relative z-10 pr-10">Plan your trip with</span>
                    <br />
                    <span className="text-coral-red inline-block mt-3">Odyssey</span>
                </h1>
                <p className="font-montserrat text-slate-gray text-lg leading-8 mt-6 mb-14 sm:max-w-sm">Get started below</p>
                <Link
            className="text-white bg-neutral-950 hover:text-white hover:bg-yellow-500 p-2 rounded-lg border"
            href="/plan/new"
            onClick={() => resetTripData(tripData, setTripData)}>
            Create a New Itinerary
          </Link>
            <div class="py-6 flex items-center text-sm text-neutral-900 uppercase before:flex-[1_1_0%] before:border-t before:me-6 after:flex-[1_1_0%] after:border-t after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">Or</div>
          {showModal && <NewItineraryModal onClose={closeModal} />}
          <button
            className="text-white bg-amber-400 hover:text-white hover:bg-amber-500 p-2 rounded-lg border"
            onClick={() => {
              openModal();
              resetTripData(tripData, setTripData);
            }}>
            Quick-start
          </button>
            </div>
            <div className="flex justify-center items-center xl:min-h-screen max-xl:py-40 bg-primary bg-hero bg-center pr-5 animate-slideIn" data-aos='fade-left'>
                <img src={beach} 
                alt="A view of the beach from a plane"
                width={1000}
                height={500}
                className="object-contain relative z-10"
                />
            </div>
        </section>
        )
        
}
    

export default Hero;