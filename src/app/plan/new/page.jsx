"use client";
import { useUser } from "@clerk/nextjs";
import vacationimg from "../../../../public/images/vacationimg.png"
import Image from "next/image"
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { APIProvider } from '@vis.gl/react-google-maps';
import SearchBar from "../../components/SearchBar";
import Link from "next/link";
import { stringToBase64 } from "@/lib/base64Utils";

export default function (Component) {
  const currentUser = useUser();
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  if (!currentUser.isSignedIn){
    return redirect("/sign-in")
  }
  
  const handleDateChange = (e) => {
    setDate(e.target.value);
  }

  const handleLocationChange = (data) => {
    setLocation(data);
  }

  const customUrl = stringToBase64(`${currentUser.user.id}&${location}&${date}`);

  return (
    <div className="h-5/6">
       <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY} libraries={['places']}>
      <main className="flex justify-between p-16 bg-gray-400 items-center border border-b-8 border-solid border-b-slate-700">
        <div className="flex flex-col justify-center items-center space-y-3">
          <h1 className="text-4xl font-bold text-white mb-4"> {currentUser.isSignedIn ? `Hello, ${currentUser.user.firstName}.` : ""} Where are you going?</h1>
          <form>
          <label htmlFor="countries" className="block mb-2 text-medium font-medium text-gray-900 dark:text-white">Location</label>
          <SearchBar onLocationData={handleLocationChange} className={"bg-white text-black p-2 rounded-lg border border-black"} />
            {/* <button type="submit"> Enter Location</button> */}
          </form>      
          <form>
          <label htmlFor="countries" className="block mb-2 text-medium font-medium text-gray-900 dark:text-white">Date</label>
            <input className="bg-white text-black p-2 rounded-lg border border-black" name="query" placeholder="Date Range" value={date} onChange={handleDateChange}/>
            {/* <button type="submit"> Enter Date Range</button> */}
          </form>     
          <Link
          href={`/plan/${customUrl}`} 
          className="bg-white text-black p-2 rounded-lg border border-black hover:bg-black hover:text-white"
          >
          Plan My Trip!
          </Link>
        </div>
        <Image src={vacationimg} alt="vacation" className="w-1/2 border-solid border-x-orange-300 border-4" />
      </main>
      </APIProvider>
    </div>
  )
}