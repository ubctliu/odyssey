"use client";
import { useUser } from "@clerk/nextjs";
// import Image from "next/image";
import { APIProvider } from "@vis.gl/react-google-maps";
import SearchBar from "../../components/SearchBar";
import Link from "next/link";
import { useTripData } from "@/app/context/TripDataContext";
import { stringToBase64 } from "@/lib/base64Utils";
import DateRangeCalendar from "@/app/components/DateRangeCalendar";
import { useState } from "react";
// import { resetTripData } from "@/lib/resetTripData";

export default function (Component) {
  const currentUser = useUser();
  const { tripData, setTripData } = useTripData();
  const [autoCompleted, setAutoCompleted] = useState(false);
  const guestId = "womdon231j2mklmksA";
  // const fuji = "/images/fuji.png";

  // Don't proceed until user data is loaded
  if (!currentUser.isLoaded) {
    return <div>Loading...</div>;
  }

  // if (!currentUser.isSignedIn){
  //   return redirect("/sign-in")
  // }

  // useEffect(() => {
  //   resetTripData(tripData, setTripData);
  // }, [])

  // TODO: rework custom url to be shorter & include it in tripData context (in /plan/new & /components/NewItineraryModel)
  const customUrl = currentUser.isSignedIn
    ? stringToBase64(
        `${currentUser.user.id}&${tripData.location}&${tripData.startDate}&${
          tripData.endDate
        }&${Math.floor(Math.random() * 1000)}`
      )
    : stringToBase64(
        `${tripData.guestId}&${tripData.location}&${tripData.startDate}&${
          tripData.endDate
        }&${Math.floor(Math.random() * 1000)}`
      );

  return (
    <div className="max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="h-5/6 flex justify-center text-black">
        <APIProvider
          apiKey={process.env.GOOGLE_MAPS_API_KEY}
          libraries={["places"]}
        >
          <main className="flex justify-between bg-white items-center border border-black rounded-xl border-b-slate-700">
            <div className="flex flex-col justify-center items-center space-y-3 p-6">
              <h1 className="text-3xl text-gray-800 font-bold md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight dark:text-gray-200">
                {" "}
                {currentUser.isSignedIn
                  ? `Hello, ${currentUser.user.firstName}.`
                  : "Hello, Guest"}{" "}
                Where are you{" "}
                <span className="text-blue-600 dark:text-blue-500">going?</span>
              </h1>
              <p class="mt-3 text-base text-gray-500">
                Enter your dream destination and dates below.
              </p>
              <form>
                <label
                  htmlFor="title"
                  className="block mb-2 text-medium font-bold text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  className="bg-white text-black p-3 rounded-lg border border-black tracking-wide container px-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100"
                  placeholder="Title (optional)"
                  value={tripData.title}
                  onChange={(e) =>
                    setTripData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
                <label
                  htmlFor="location"
                  className="block mb-2 text-medium font-bold text-gray-900 dark:text-white"
                >
                  Location
                </label>
                <SearchBar
                  setLocationData={setTripData}
                  className={
                    "bg-white text-black p-3 rounded-lg border border-black tracking-wide container px-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100"
                  }
                  newTripCreation={true}
                  setAutoCompleted={setAutoCompleted}
                />
                <label
                  htmlFor="date"
                  className="block mb-2 text-medium font-medium text-gray-900 dark:text-white"
                />
                <span className="font-bold">Date</span>
                <DateRangeCalendar
                  className={
                    "bg-white text-black p-3 rounded-lg border border-black tracking-wide container px-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100"
                  }
                />
                <label
                  htmlFor="description"
                  className="block mb-2 text-medium font-bold text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  className="bg-white text-black p-3 rounded-lg border border-black tracking-wide container px-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100"
                  id="description"
                  name="description"
                  placeholder="Description (optional)"
                  rows="4"
                  onChange={(e) => (prev) => ({
                    ...prev,

                    description: e.target.value,
                  })}
                />
              </form>
              {tripData.isDateSet && tripData.isLocationSet && autoCompleted ? (
                <Link
                  href={`/plan/${customUrl}`}
                  onClick={() =>
                    setTripData((prev) => ({
                      ...prev,
                      url: customUrl,
                      clerkId: currentUser.user?.id ?? "",
                    }))
                  }
                  className="bg-white text-black p-2 rounded-lg border border-black hover:bg-blue-500 hover:text-white"
                >
                  Plan My Trip!
                </Link>
              ) : (
                <Link
                  href={""}
                  className="bg-gray-400 text-white p-2 rounded-lg border border-black hover:text-white"
                >
                  Missing required fields!
                </Link>
              )}
            </div>
          </main>
        </APIProvider>
      </div>
    </div>
  );
}
