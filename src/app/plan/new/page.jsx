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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLocationSet, setIsLocationSet] = useState(false);
  const [isDateSet, setIsDateSet] = useState(false);
  const guestId = "womdon231j2mklmksA";

  // Don't proceed until user data is loaded
  if (!currentUser.isLoaded) {
    return <div>Loading...</div>
  }
  
  // if (!currentUser.isSignedIn){
  //   return redirect("/sign-in")
  // }

  const customUrl = currentUser.isSignedIn ? stringToBase64(`${currentUser.user.id}&${location}&${date}&${title}&${description}`) : stringToBase64(`${guestId}&${location}&${date}&${title}&${description}`);

  return (
    <div className="h-5/6">
       <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY} libraries={['places']}>
      <main className="flex justify-between p-16 bg-gray-400 items-center border border-b-8 border-solid border-b-slate-700">
        <div className="flex flex-col justify-center items-center space-y-3">
          <h1 className="text-4xl font-bold text-white mb-4"> {currentUser.isSignedIn ? `Hello, ${currentUser.user.firstName}.` : "Hello, Guest"} Where are you going?</h1>
          <form className="space-y-2">
          <label htmlFor="title" className="block mb-2 text-medium font-medium text-gray-900 dark:text-white">Title</label>
          <input className="bg-white text-black p-2 rounded-lg border border-black" placeholder="Title (optional)" value={title} onChange={e => setTitle(e.target.value)}/> 
          <label htmlFor="location" className="block mb-2 text-medium font-medium text-gray-900 dark:text-white">Location</label>
          <SearchBar onLocationData={setLocation} setIsLocationSet={setIsLocationSet} className={"bg-white text-black p-2 rounded-lg border border-black"} />
          <label htmlFor="date" className="block mb-2 text-medium font-medium text-gray-900 dark:text-white">Date</label>
          <input required className="bg-white text-black p-2 rounded-lg border border-black" placeholder="Date Range (required)" value={date} onChange={e => 
            {
              setDate(e.target.value);
              setIsDateSet(date !== "");
            }
          }/>
          <label htmlFor="description" className="block mb-2 text-medium font-medium text-gray-900 dark:text-white">Description</label>
          <textarea
                className="bg-white text-black p-4 rounded-lg border border-black"
                id="description"
                name="description"
                placeholder="Description (optional)"
                rows="4"
                onChange={(e) => setDescription(e.target.value)}
              />
          </form>     
          { (isDateSet && isLocationSet) ?
            <Link
          href={`/plan/${customUrl}`} 
          className="bg-white text-black p-2 rounded-lg border border-black hover:bg-black hover:text-white"
          >
          Plan My Trip!
          </Link> :
          <Link
          href={""}
          className="bg-gray-400 text-white p-2 rounded-lg border border-black hover:text-white"
          >
          Missing required fields!
          </Link>
          }
        </div>
        <Image src={vacationimg} alt="vacation" className="w-1/2 border-solid border-x-orange-300 border-4" />
      </main>
      </APIProvider>
    </div>
  )
}