"use client";
import { useUser } from "@clerk/nextjs";
// import vacationimg from "../../../../public/images/vacationimg.png";
import Image from "next/image";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTripData } from "@/app/context/TripDataContext";
import { populateTripData } from "@/lib/populateTripData";
import DateRangeCalendar from "@/app/components/DateRangeCalendar";
import DatePicker from "@/app/components/DatePicker";
import { createTrip, fetchTrip, fetchTripWithDaysAndEvents, updateTrip, createDays, fetchUser } from "@/lib/api";
import Days from "@/app/components/Days";
import CompleteDays from "@/app/components/CompleteDays";
import Collapsible from "@/app/components/Collapsible";
import SuggestionBox from "@/app/components/SuggestionBox";
import { APIProvider } from "@vis.gl/react-google-maps";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CiShare2 } from "react-icons/ci";
import { FaClipboard, FaSave } from "react-icons/fa";
import Link from "next/link";
import { set, setDay } from "date-fns";

const checkUserDetails = async (url, clerkId, setOwnedByUser) => {
  const userExists = await fetchUser(clerkId);
    const tripExists = await fetchTrip(url);
    // check if user exists and if the user exists, check if the active user matches the trip owner's
    if (userExists.data && tripExists?.data.userId === userExists.data.id) {
      setOwnedByUser(true);
      return;
    }
    setOwnedByUser(false);
}

const saveTrip = async (trip, clerkId, setOwnedByUser) => {
  console.log(trip);
  try {
    const userExists = await fetchUser(clerkId);
    const tripExists = await fetchTrip(trip.url);
    // check if user exists and if the user exists, check if the active user matches the trip owner's
    // if (!userExists || userExists.id !== tripExists.userId) {
    //   console.log("User doesn't match the one in the database or doesn't exist");
    //   setOwnedByUser(false);
    //   return;
    // }
    // setOwnedByUser(true);
    if (!tripExists.data) {
      const newTrip = await createTrip(trip);
      setTimeout(async () => {
        const allDays = await createDays(trip);
        // Rest of the code related to allDays
      }, 3000);
    } else {
      const updatedTrip = await updateTrip(trip);
      console.log("Trip details updated:", updatedTrip);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const loadTripDetails = async (url, setTripData, setDaysExist) => {
  try {
    const tripExists = await fetchTripWithDaysAndEvents(url);
    if (!tripExists) {
      if (setDaysExist) {
        setDaysExist(false);
      }
      return;
    } else {
      if (setDaysExist) {
        setDaysExist(tripExists.data.days.length > 0);
      }
      populateTripData(tripExists.data, setTripData);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

// unused for now until we figure out how to allow for editing/saving w/o db connection
const createInitialEmptyDays = async (tripData, setTripData) => {
  if (tripData.days.length !== 0) {
    return;
  }
  const days = [];

  const start = new Date(tripData.startDate);
  const end = new Date(tripData.endDate);

// Calculate the number of days between the start and end dates
const diffInDays = Math.floor((end - start) / (1000 * 60 * 60 * 24));

// Create an array of day objects based on the difference in days
for (let i = 0; i <= diffInDays; i++) {
let day = new Date(start);
day.setDate(day.getDate() + i);

// Log each day for debugging
console.log("Day " + i + ":", day);

// Add day with tripId and empty notes
days.push({ key: i ,date: day.toISOString(), tripId: tripData.tripId, notes: '' });
}

try {
  setTripData((prev) => ({
    ...prev,
    days: days
  }));
} catch (error) {
  console.error("Error setting initial days:", error);
}
};
// TODO: consider adding visibleDays or some state variable to hold the changable days?
export default function () {
  const currentUser = useUser();
  const { tripData, setTripData } = useTripData();
  const [ownedByUser, setOwnedByUser] = useState(true);
  const pathname = usePathname();
  const [type, setType] = useState("");
  const url = pathname.split("/plan/")[1];
  const [render, setRender] = useState(false);
  const [daysExist, setDaysExist] = useState(false);
  const [copyClicked, setCopyClicked] = useState(false);

  useEffect(() => {
    // Don't proceed until user data is loaded
    if (!currentUser.isLoaded) {
      return;
    }

    if (!currentUser.isSignedIn) {
      return redirect("/sign-in");
    }

  }, []);

  useEffect(() => {
    //createInitialEmptyDays(tripData, setTripData);
    loadTripDetails(url, setTripData, setDaysExist);
  }, []);

  // useEffect(() => {
  // }, [tripData.days]);

  // editting safeguards against non-users/different users
  // useEffect(() => {
  //   if (currentUser.isLoaded) {
  //     const timeoutId = setTimeout(() => {
  //     checkUserDetails(url, currentUser.user.id, setOwnedByUser);
  //   }, 1000);
  //   return () => clearTimeout(timeoutId);
  //   }
  // }, [currentUser.isLoaded])

  const handleShare = async () => {
    const protocol = window.location.href;
    await saveTrip(tripData);
    navigator.clipboard.writeText(protocol);
    setCopyClicked(true);
    setTimeout(() => {
      setCopyClicked(false);
    }, 3000);
  }

return (
    <div className="h-5/6 flex justify-center text-black">
      <main className="flex justify-between p-16 bg-gray-200 items-center border border-b-8 border-solid border-b-slate-700">
        <div className="flex flex-col justify-center items-center">
          <section className="top_title">
            {ownedByUser ? (
              <form className="">
                <label>Title</label>
                <input className="bg-white text-black p-3 rounded-lg border border-black tracking-wide container px-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100" value={tripData.title} placeholder="Title..." 
                onChange={e => setTripData((prev) => ({
                  ...prev,
                  title: e.target.value
                }))}/>
                <label>Description</label>
                <input className="bg-white text-black p-3 rounded-lg border border-black tracking-wide container px-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100" value={tripData.description} placeholder="Description..." 
                onChange={e => setTripData((prev) => ({
                  ...prev,
                  description: e.target.value
                }))}/>
                <label>Image URL</label>
                <input className="bg-white text-black p-3 rounded-lg border border-black tracking-wide container px-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100" value={tripData.imageUrl} placeholder="Banner Image URL..." 
                onChange={e => setTripData((prev) => ({
                  ...prev,
                  imageUrl: e.target.value
                }))}/>
                <label>Start Date</label>
                <DatePicker className="bg-white text-black p-3 rounded-lg border border-black tracking-wide container px-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100" startOrEndDate="startDate"/>
                <label>End Date</label>
                <DatePicker className="bg-white text-black p-3 rounded-lg border border-black tracking-wide container px-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100" startOrEndDate="endDate"/>
                <label>Notes</label>
                <textarea
                  className="bg-white text-black p-3 rounded-lg border border-black tracking-wide container px-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100 w-full"
                  id="notes"
                  name="notes"
                  placeholder="Notes (optional)"
                  rows="4"
                  onChange={e => setTripData((prev) => ({
                    ...prev,
                    notes: e.target.value
                  }))}
                />
                <section name="days" className="contents">
                    <div className={"flex justify-around"}>
              <button type="button" className={"bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-2"} onClick={() => {setType("restaurant"); setRender(true);}}>Show nearby restaurants</button>
              <button type="button" className={"bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-2"} onClick={() => {setType("tourist_attraction"); setRender(true);}}>Show tourist attractions</button>
              </div>
              <APIProvider
              apiKey={process.env.GOOGLE_MAPS_API_KEY}>
              {render && <SuggestionBox type={type}></SuggestionBox>}
              </APIProvider>
                  <Collapsible title="Days" className="">
                    {tripData.days.map((day) => <CompleteDays key={day.id} day={day} setTripData={setTripData} />)}
                  </Collapsible>
                </section>
              </form>
            ) : (
              <form className="">
                <label>Title</label>
                <input className="bg-white text-black p-3 rounded-lg border border-black tracking-wide container px-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100" value={tripData.title} placeholder="Title..." readOnly />
                <label>Description</label>
                <input className="bg-white text-black p-3 rounded-lg border border-black tracking-wide container px-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100" value={tripData.description} placeholder="Description..." readOnly />
                <label>Image URL</label>
                <input className="bg-white text-black p-3 rounded-lg border border-black tracking-wide container px-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100" value={tripData.imageUrl} placeholder="Banner Image URL..." readOnly />
                <label>Start Date</label>
                <DatePicker className="bg-white text-black p-3 rounded-lg border border-black tracking-wide container px-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100" startOrEndDate="startDate" readOnly />
                <label>End Date</label>
                <DatePicker className="bg-white text-black p-3 rounded-lg border border-black tracking-wide container px-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100" startOrEndDate="endDate" readOnly />
                <label>Notes</label>
                <textarea
                  className="bg-white text-black p-3 rounded-lg border border-black tracking-wide container px-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100 w-full"
                  id="notes"
                  name="notes"
                  placeholder="Notes (optional)"
                  rows="4"
                  readOnly
                />
                <section name="days" className="contents">
                  <Collapsible title="Days" className="">
                    {tripData.days.map((day) => <CompleteDays key={day.id} day={day} setTripData={setTripData} readOnly={"readonly"}/>)}
                  </Collapsible>
                </section>
              </form>
            )}
          </section>
          <div className="flex mx-2">
            <button
              className="text-black bg-white p-2 rounded-lg border transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100"
              onClick={handleShare}
            >
              {copyClicked ? (
                <span className="flex items-center">
                  Copied to Clipboard <FaClipboard className="ml-1" />
                </span>
              ) : (
                <span className="flex items-center">
                  Share My Trip! <CiShare2 className="ml-1" />
                </span>
              )}
            </button>
            <button
              className="text-black bg-white p-2 rounded-lg border transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100"
              onClick={() => saveTrip(tripData, currentUser.user.id, setOwnedByUser)}
            >
              <span className="flex items-center">
                Save Trip Details <FaSave className="ml-1" />
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}