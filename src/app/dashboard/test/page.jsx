"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import SearchBar from "../../components/SearchBar";
import Link from "next/link";
import { useTripData } from "@/app/context/TripDataContext";
import { stringToBase64 } from "@/lib/base64Utils";
import LazyLoad from "react-lazyload";

export default function (Component) {
  const currentUser = useUser();
  const { tripData, setTripData } = useTripData();
  const guestId = "womdon231j2mklmksA";

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
    <div className="h-screen flex flex-col justify-normal items-center bg-slate-350 bg-blur"
        // style={{ backgroundImage: `url(/images/vacationimg.png)`, backgroundSize: 'cover', backgroundPosition: 'center', blur: '2px'}}
    >
      <h1 className="text-4xl font-bold text-slate-900 mb-4">
        {currentUser.isSignedIn
          ? `Hello, ${currentUser.user.firstName}.`
          : "Hello, Guest"}{" "}
        Here are your planned trips.
      </h1>
      <main className="h-1/2 w-1/2 mx-auto flex p-16 items-center border border-b-6 border-solid border-b-slate-100 shadow-2xl backdrop-blur-md bg-white/30">
        <div className="flex flex-wrap justify-center items-center space-x-6 space-y-6">
          {[currentIndex, currentIndex + 1, currentIndex + 2].map((index) => {
            const id = imageIds[index % imageIds.length];
            return (
              <div
                key={id}
                className="flex flex-col justify-center items-center w-1/4"
              >
                <LazyLoad height={200} once>
                  <img
                    src={`https://picsum.photos/id/${id}/181/177.jpg`}
                    alt="Random images from mock data"
                    className="border rounded-lg transition-transform duration-300 ease-in-out hover:scale-110 animate-fade-in"
                  />
                </LazyLoad>
                <p className="mt-2 text-center text-black font-bold">
                  Title for each trip {id}
                </p>
              </div>
            );
          })}
        </div>
        <button
          type="button"
          tabIndex="0"
          onClick={nextImage}
          className="flex items-center justify-venter p-2 bg-gray-200 text-white rounded-full overflow-hidden hover:bg-gray-300 transition-colors duration-200"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="chevron-right"
            className="svg-inline--fa fa-chevron-right fa-w-10 text-black w-6 h-6"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path
              fill="currentColor"
              d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
            ></path>
          </svg>
        </button>
      </main>
    </div>
  );
}
