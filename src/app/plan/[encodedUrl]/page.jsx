"use client";
import { useUser } from "@clerk/nextjs";
import vacationimg from "../../../../public/images/vacationimg.png";
import Image from "next/image";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTripData } from "@/app/context/TripDataContext";
import { populateTripData } from "@/lib/populateTripData";
import DateRangeCalendar from "@/app/components/DateRangeCalendar";
import DatePicker from "@/app/components/DatePicker";
import { createTrip, fetchTrip, fetchTripWithDaysAndEvents, updateTrip } from "@/lib/api";
import createAllDays from "@/lib/createAllDays";
import Days from "@/app/components/Days";
import CompleteDays from "@/app/components/CompleteDays";


/* feature is tested and working but one thing to keep in mind is that tripData is lost on hard refresh
  right now which means that we kind of have to work around it atm unless we choose to store this info 
  in session
*/
const saveTrip = async (trip) => {
  try {
    const tripExists = await fetchTrip(trip.url);
    if (!tripExists.data) {
      const newTrip = await createTrip(trip);
      const allDays = await createAllDays(trip)
    } else {
      const updatedTrip = await updateTrip(trip);
      console.log("Trip details updated:", updatedTrip);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const loadTripDetails = async (url, setTripData) => {
  try {
    const tripExists = await fetchTripWithDaysAndEvents(url);
    // console.log("trip data", tripExists.data)
    if (!tripExists) {
      return;
    } else {
      populateTripData(tripExists.data, setTripData);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

//TODO: look into getting imageUrl working - atm there will probably be an issue with external url rendering
// w/o allowing it in next.config.js
export default function () {
  const currentUser = useUser();
  // console.log(currentUser);
  const { tripData, setTripData } = useTripData();
  const pathname = usePathname();
  const url = pathname.split("/plan/")[1];

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
    // createAllDays(tripData);
    loadTripDetails(url, setTripData);
    // console.log("tripdata after populating", tripData);
  }, []);

  // another useEffect for updating state for changes
  // useEffect(() => {
  // });

  return (
    <div className="h-5/6 flex justify-center">
      <main className="flex justify-between p-16 bg-gray-400 items-center border border-b-8 border-solid border-b-slate-700">
        <div className="flex flex-col justify-center items-center">
          <section className="top_title">
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
          <DatePicker className={"bg-white text-black p-3 rounded-lg border border-black tracking-wide container px-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100"} startOrEndDate={"startDate"}/>
          <label>End Date</label>
          <DatePicker className={"bg-white text-black p-3 rounded-lg border border-black tracking-wide container px-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100"} startOrEndDate={"endDate"}/>
          <label>Notes</label>
          <textarea
                className="bg-white text-black p-3 rounded-lg border border-black tracking-wide container px-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100 w-full"
                id="notes"
                name="notes"
                placeholder="Notes (optional)"
                rows="4"
                onChange={e => (prev) => ({
                  ...prev,
                  notes: e.target.value
                })}
              />
             <label>Days</label>
             <section name={"days"} className={"contents"}>
              { /*renders trip days (only problem rn is that it is running a lot of times because of 
              the useEffect rerendering)*/
               tripData.days.map((day) => <CompleteDays key={day.id} day={day} setTripData={setTripData}/>)}
             </section>
          </form>
            {/* This will be the section to display trip information*/}
          </section>
          <h3 className="text-4xl font-bold text-white mb-4">
            Where are you staying?
          </h3>
          <form className="space-x-2">
            <label htmlFor="lodging">Lodging Options: </label>
            <select
              className="bg-white text-black p-2 rounded-lg border border-black"
              name="hotel_airbnbs"
              id="hotel_airbnbs"
            >
              <option value="hotel">Hotel</option>
              <option value="airbnb">Airbnb</option>
              <option value="other">Other</option>
            </select>
            <input
              className="bg-white text-black p-2 rounded-lg border border-black"
              placeholder="Please specify if other"
            ></input>
          </form>
          <h4 className="text-4xl font-bold text-white mb-4">
            Duration of stay
          </h4>
          <form className="bg-white text-black p-2 rounded-lg border border-black">
            <label htmlFor="duration"></label>
            <select>
              <option value="date">1 Week</option>
              <option value="date">2 Weeks</option>
              <option value="date">3 Weeks</option>
              <option value="date">4 Weeks</option>
            </select>
          </form>
          <h3 className="text-4xl font-bold text-white mb-4">
            Please describe your activities for each day during the week:
          </h3>
          <form className="space-x-2">
            <select
              className="bg-white text-black p-2 rounded-lg border border-black"
              name="hotel_airbnbs"
              id="hotel_airbnbs"
            >
              <option value="hotel">Day 1</option>
              <option value="airbnb">Day 2</option>
              <option value="other">Day 3</option>
              <option value="other">Day 4</option>
              <option value="other">Day 5</option>
              <option value="other">Day 6</option>
              <option value="other">Day 7</option>
            </select>
            <input
              className="bg-white text-black p-2 rounded-lg border border-black"
              placeholder="Please specify details for food or activites"
            ></input>
          </form>
          <a
            href="/"
            className="bg-white text-black p-2 rounded-lg border border-black hover:bg-black hover:text-white"
          >
            Share My Trip!
          </a>
          <button className={"text-black bg-white p-2 rounded-lg border transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100"}
          onClick={() => saveTrip(tripData)}>
            Save Trip Details
          </button>
        </div>
      </main>
    </div>
  );
}
