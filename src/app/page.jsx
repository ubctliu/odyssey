"use client";
import { useUser } from "@clerk/nextjs";
import Hero from "./components/Hero";
import Banner from "./components/Banner";
import About from "./about/page";
import { createUser } from "@/lib/api";
import { useEffect, useState } from "react";
import { useTripData } from "@/app/context/TripDataContext";

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
    <div>
      <Banner />
        {/* <About /> */}
      <br/>
        <Hero />
        <br />
      <main className="p-16 bg-neutral-900 border border-b-8 border-solid border-b-slate-700">
        <div className="flex flex-col items-center">
        </div>
      </main>
    </div>
  );
}
