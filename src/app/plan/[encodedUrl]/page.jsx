"use client";
import { useUser } from "@clerk/nextjs";
import vacationimg from "../../../../public/images/vacationimg.png";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useTripData } from "@/app/context/TripDataContext";
import DateRangeCalendar from "@/app/components/DateRangeCalendar";
import DatePicker from "@/app/components/DatePicker";

export default function (props) {
  const currentUser = useUser();
  const { tripData, setTripData } = useTripData();

  useEffect(() => {
    // Don't proceed until user data is loaded
    if (!currentUser.isLoaded) {
      return;
    }

    if (!currentUser.isSignedIn) {
      return redirect("/sign-in");
    }

    // set clerkId in tripData
    setTripData((prev) => ({
      ...prev,
      clerkId: currentUser.user.id
    }))
    console.log(tripData);
    // setTripState(props.params.encodedUrl);
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
          <input className="bg-white text-black p-3 rounded-lg border border-black tracking-wide container px-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:bg-gray-100" value={tripData.title} placeholder="Title..." 
          onChange={e => setTripData((prev) => ({
            ...prev,
            title: e.target.value
          }))}/>
          <label>Start Date</label>
          <DatePicker className={"bg-white text-black p-3 rounded-lg border border-black tracking-wide container px-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:bg-gray-100"} startOrEndDate={"startDate"}/>
          <label>End Date</label>
          <DatePicker className={"bg-white text-black p-3 rounded-lg border border-black tracking-wide container px-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:bg-gray-100"} startOrEndDate={"endDate"}/>
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
        </div>
      </main>
    </div>
  );
}
