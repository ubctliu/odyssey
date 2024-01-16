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
    <div className="relative overflow-hidden animate-fade-in">
      <div className="mx-auto max-w-screen-md py-12 px-4 sm:px-6 md:max-w-screen-xl md:py-20 lg:py-32 md:px-8">
        <APIProvider
          apiKey={process.env.GOOGLE_MAPS_API_KEY}
          libraries={["places"]}
        >
          <div className="md:pe-8 md:w-1/2 xl:pe-0 xl:w-5/12 animate-slideIn">
            <h1 className="text-3xl text-gray-800 font-bold md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight dark:text-gray-200">
              {currentUser.isSignedIn
                ? `Hello, ${currentUser.user.firstName}.`
                : "Hello, Guest"}{" "}
              Where are you{" "}
              <span class="text-blue-600 dark:text-blue-500">going?</span>
            </h1>
            <p class="mt-3 text-base text-gray-500">
              Enter your dream destination and dates below.
            </p>

            <div class="py-6 flex items-center text-sm text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:me-6 after:flex-[1_1_0%] after:border-t after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600"></div>
            <form>
              <div class="mb-4">
                <input
                  type="text"
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  placeholder="Title (Optional)"
                  value={tripData.title}
                  onChange={(e) =>
                    setTripData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                ></input>
              </div>

              <div class="mb-4">
                <SearchBar
                  setLocationData={setTripData}
                  className={
                    "py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  }
                  newTripCreation={true}
                  setAutoCompleted={setAutoCompleted}
                />
              </div>

              <div class="mb-4">
                <DateRangeCalendar
                  className={
                    "py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  }
                />
              </div>

              <div className="mb-4">
                <textarea
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  id="description"
                  name="description"
                  placeholder="Description (optional)"
                  rows="4"
                  onChange={(e) => (prev) => ({
                    ...prev,

                    description: e.target.value,
                  })}
                />
              </div>

              <div class="grid">
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
                  className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-400 text-white hover:bg-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    Missing required fields!
                  </Link>
                )}
              </div>
            </form>
          </div>
        </APIProvider>
      </div>
      <div
        class="hidden md:block md:absolute md:top-0 md:start-1/2 md:end-0 h-full bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1607410509306-e840436e4b63?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      ></div>
    </div>
  );
}
