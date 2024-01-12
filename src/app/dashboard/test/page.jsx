"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { redirect } from "next/navigation";
import SearchBar from "../../components/SearchBar";
import Link from "next/link";
import { useTripData } from "@/app/context/TripDataContext";
import { stringToBase64 } from "@/lib/base64Utils";
import LazyLoad from "react-lazyload";
import { images } from "../../../../next.config";

export default function (Component) {
  const currentUser = useUser();
  const { tripData, setTripData } = useTripData();
  const guestId = "womdon231j2mklmksA";
  const takeoff = "/videos/planetakeoff.mp4";

  // Don't proceed until user data is loaded
  if (!currentUser.isLoaded) {
    return <div>Loading...</div>;
  }

  // if (!currentUser.isSignedIn){
  //   return redirect("/sign-in")
  // }

  const customUrl = currentUser.isSignedIn
    ? stringToBase64(
        `${currentUser.user.id}&${tripData.location}&${tripData.startDate}&${tripData.endDate}&${tripData.title}&${tripData.description}`
      )
    : stringToBase64(
        `${tripData.guestId}&${tripData.location}&${tripData.startDate}&${tripData.endDate}&${tripData.title}&${tripData.description}`
      );

  const imageIds = Array.from(
    { length: 3 },
    () => Math.floor(Math.random() * 250) + 1
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % imageIds.length);
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
        className="top-0 left-0 w-full h-50 object-fit"
        >
        </video>
          </div>
      <main className="absolute h-1/2 w-1/2 mx-auto flex p-16 items-center border border-b-6 border-solid rounded-2xl border-b-slate-100 shadow-2xl backdrop-blur-md bg-white/30">
      <h1 className="top-0 text-4xl font-bold text-slate-900 mb-4 animate-fade-in-down pt-20">
        {currentUser.isSignedIn
          ? `Hello, ${currentUser.user.firstName}.`
          : "Hello, Guest"}{" "}
        Here are your planned trips.
      </h1>
        <div className="flex flex-wrap justify-center items-center space-x-6 space-y-6">
        <Carousel>
          {imageIds.map((id) => {
            return (
              <div key={id} className="flex flex-col justify-center items-center w-1/4">
          <img
            src={`https://picsum.photos/id/${id}/181/177.jpg`}
            alt="Random images from mock data"
            className="border rounded-lg transition-transform duration-300 ease-in-out hover:scale-110 animate-fade-in"
            />
        <p className="mt-2 text-center text-black font-bold">
          Title for each trip {id}
        </p>
      </div>
    );
  })}
</Carousel>
        </div>
      </main>
    </div>
  );
}
