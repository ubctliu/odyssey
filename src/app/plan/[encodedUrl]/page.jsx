"use client";
import { useUser } from "@clerk/nextjs";
import vacationimg from "../../../../public/images/vacationimg.png";
import Image from "next/image";
import { redirect } from "next/navigation";
import { base64ToString, stringToBase64 } from "@/lib/base64Utils";
import { useEffect, useState } from "react";

export default function (props) {
  const currentUser = useUser();
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const setTripState = (encodedUrl) => {
    const decodedUrlData = base64ToString(encodedUrl).split("&");
    const location = decodedUrlData[1]
    const date = decodedUrlData[2]
    const title = decodedUrlData[3];
    const description = decodedUrlData[4];
    setLocation(location);
    setDate(date);
    title ? setTitle(title) : setTitle(`Trip to ${location}`);
    description ? setDescription(description) : setDescription("");
  }

  useEffect(() => {
    // Don't proceed until user data is loaded
    if (!currentUser.isLoaded) {
      return;
    }

    if (!currentUser.isSignedIn) {
      return redirect("/sign-in");
    }

    setTripState(props.params.encodedUrl);
  }, [])

  return (
    <div className="h-5/6 flex justify-center">
      <main className="flex justify-between p-16 bg-gray-400 items-center border border-b-8 border-solid border-b-slate-700">
        <div className="flex flex-col justify-center items-center">
        <section className=""> {/* This will be the section to display trip information*/}

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