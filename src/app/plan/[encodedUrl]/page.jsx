"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTripData } from "@/app/context/TripDataContext";
import { populateTripData } from "@/lib/populateTripData";
import DateRangeCalendar from "@/app/components/DateRangeCalendar";
import DatePicker from "@/app/components/DatePicker";
import {
  createTrip,
  fetchTrip,
  fetchTripWithDaysAndEvents,
  updateTrip,
  createDays,
  fetchUser,
  generateAndUploadAIImage,
} from "@/lib/api";
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
import { ImageToDB } from "@/lib/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const checkUserDetails = async (url, clerkId, setOwnedByUser) => {
  const userExists = await fetchUser(clerkId);
  const tripExists = await fetchTrip(url);
  // check if user exists and if the user exists, check if the active user matches the trip owner's
  if (userExists.data && tripExists?.data.userId === userExists.data.id) {
    setOwnedByUser(true);
    return;
  }
  setOwnedByUser(false);
};

const saveTrip = async (trip, clerkId, setOwnedByUser, setTripData) => {
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
      (async () => {
        try {
          const newTrip = await createTrip(trip);
          const allDays = await createDays(trip, setTripData);
        } catch (error) {
          console.error("An error occurred:", error);
        }
      })();
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
    days.push({
      key: i,
      date: day.toISOString(),
      tripId: tripData.tripId,
      notes: "",
    });
  }

  try {
    setTripData((prev) => ({
      ...prev,
      days: days,
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
  const [imgLoading, setImgLoading] = useState(false);
  const [signedIn, setSignedIn] = useState(true);

  useEffect(() => {
    // Don't proceed until user data is loaded
    if (!currentUser.isLoaded) {
      return;
    }

    if (!currentUser.isSignedIn) {
      setSignedIn(false);
      // return redirect("/sign-in");
    }
  }, []);

// if user is loaded & not signed in, don't save
  useEffect(() => {
    if (!currentUser.isLoaded || !currentUser.isSignedIn) {
      return;
    }

    saveTrip(tripData, currentUser.user.id, setOwnedByUser, setTripData);
  }, [currentUser.isLoaded])

  // on page load attempt to load trip details (no sign in requirement so it can be viewed by non-users)
  useEffect(() => {
    //createInitialEmptyDays(tripData, setTripData);
    loadTripDetails(url, setTripData, setDaysExist);
  }, [currentUser.isLoaded]);

  // useEffect(() => {
  //   console.log(tripData.days);
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
  };

  const handleImageUpload = (file) => {
    return new Promise((resolve, reject) => {
      if (file) {
        const storageRef = ref(ImageToDB, `upload/${v4()}`);
        uploadBytes(storageRef, file[0])
          .then(() => {
            getDownloadURL(storageRef)
              .then((url) => {
                setTripData((prev) => ({
                  ...prev,
                  imageUrl: url,
                }));
                console.log("File available at", url);
                resolve(url);
              })
              .catch((error) => {
                console.log("Error getting download URL:", error);
                reject(error);
              });
          })
          .catch((error) => {
            console.log("Error uploading image:", error);
            reject(error);
          });
      } else {
        reject(new Error("No file provided"));
      }
    });
  };

  const handleAiImg = async () => {
    setImgLoading(true);
    try {
      const aiImg = await generateAndUploadAIImage(tripData);
      loadTripDetails(url, setTripData, setDaysExist);
    } catch (error) {
      console.error("Error occurred while handling image", error);
    } finally {
      // Code to be executed regardless of whether an error occurred or not
    }
    setImgLoading(false);
  };
// TODO: make the button disappear after image is created
  return (
    <div className="max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="h-5/6 flex justify-center text-black">
        <main className="flex justify-between bg-white items-center border border-black rounded-xl border-b-slate-700">
          <div className="flex flex-col justify-center items-center">
            <div className="pt-4">
              {tripData.imageUrl ? imgLoading ?
      <AiOutlineLoading3Quarters className="animate-spin" /> :
                <Image className="border border-black" src={tripData.imageUrl} height={512} width={512} alt="image not here yet" /> 
      :  <button className="text-black mx-auto bg-white p-2 rounded-lg border transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100"
      onClick={handleAiImg}> Generate AI Image</button>}
            </div>
            <section className="top_title p-16">
              {ownedByUser ? (
                <div className="">
                  <div className="flex items-center">
                    <button
                      className="text-black mx-auto bg-white p-2 rounded-lg border transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100"
                      onClick={handleAiImg}
                    >
                      {" "}
                      Generate AI Image
                    </button>
                  </div>
                  <br />
                  <form>
                    <div className="space-y-12">
                      <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-3xl font-bold underline leading-7 text-gray-900 mx-auto text-center">
                          Edit Trip Details
                        </h2>
                        <br />
                        <p className="mt-1 text-md leading-6 text-gray-600">
                          This information could be shared with trip-mates so
                          please double check your inputs.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-4">
                            <label class="block font-medium leading-6 text-gray-900">
                              Title
                            </label>
                            <div className="mt-2">
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                  type="text"
                                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                  placeholder="Title..."
                                  value={tripData.title}
                                  onChange={(e) =>
                                    setTripData((prev) => ({
                                      ...prev,
                                      title: e.target.value,
                                    }))
                                  }
                                ></input>
                              </div>
                            </div>
                          </div>

                          <div className="col-span-full">
                            <label className="block font-medium leading-6 text-gray-900">
                              Description
                            </label>
                            <p className="mt-3 text-md leading-6 text-gray-600">
                              Write a few sentences about your trip!
                            </p>
                            <div className="mt-2">
                              <textarea
                                rows="3"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                value={tripData.description}
                                onChange={(e) =>
                                  setTripData((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                  }))
                                }
                              ></textarea>
                            </div>
                          </div>

                          <div className="col-span-full">
                            <label
                              htmlFor="dropzone-file"
                              className="block font-medium leading-6 text-gray-900"
                            >
                              Trip Banner Image
                              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                  <svg
                                    className="mx-auto h-12 w-12 text-gray-300"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                  <p className="mb-2 text-sm text-black">
                                    <span className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                      Click to upload
                                    </span>{" "}
                                    or drag and drop
                                  </p>
                                  <p className="text-xs leading-5 text-gray-600">
                                    PNG, JPG, GIF up to 10MB
                                  </p>
                                </div>
                                <input
                                  id="dropzone-file"
                                  type="file"
                                  className="hidden"
                                  accept=".png, .jpg"
                                  onChange={(e) =>
                                    handleImageUpload(e.target.files)
                                  }
                                />
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                      <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Start Date{" "}
                        <span className="mt-1 text-sm leading-6 text-gray-600">
                          {" "}
                          (You can choose to edit your start and end date here)
                        </span>
                      </h2>
                      <DatePicker
                        className="block text-sm font-medium leading-6 text-gray-900"
                        startOrEndDate="startDate"
                      />
                      <h2 class="text-base font-semibold leading-7 text-gray-900">
                        End Date
                      </h2>
                      <DatePicker
                        className="block text-sm font-medium leading-6 text-gray-900"
                        startOrEndDate="endDate"
                      />
                    </div>

                    <div className="col-span-full">
                      <label className="block font-medium leading-6 text-gray-900">
                        Notes
                      </label>
                      <p className="mt-3 text-md leading-6 text-gray-600">
                        Feel free to add any additional notes for your trip
                        here!
                      </p>
                      <div className="mt-2">
                        <textarea
                          rows="4"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={(e) =>
                            setTripData((prev) => ({
                              ...prev,
                              notes: e.target.value,
                            }))
                          }
                        ></textarea>
                      </div>
                    </div>
                    <section name="days" className="contents">
                      <div className={"flex justify-around"}>
                        <button
                          type="button"
                          className={
                            "bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-2 rounded mt-2"
                          }
                          onClick={() => {
                            setType("restaurant");
                            setRender(true);
                          }}
                        >
                          Show nearby restaurants
                        </button>
                        <button
                          type="button"
                          className={
                            "bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-2 rounded mt-2"
                          }
                          onClick={() => {
                            setType("tourist_attraction");
                            setRender(true);
                          }}
                        >
                          Show tourist attractions
                        </button>
                      </div>
                      <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY}>
                        {render && <SuggestionBox type={type}></SuggestionBox>}
                      </APIProvider>
                      <Collapsible title="Days" className="">
                        {tripData.days?.map((day) => (
                          <CompleteDays
                            key={day.id}
                            day={day}
                            setTripData={setTripData}
                          />
                        ))}
                      </Collapsible>
                    </section>
                  </form>
                </div>
              ) : (
                <form className="">
                  <label>Title</label>
                  <input
                    className="bg-white text-black p-3 rounded-lg border border-black tracking-wide container px-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100"
                    value={tripData.title}
                    placeholder="Title..."
                    readOnly
                  />
                  <label>Description</label>
                  <input
                    className="bg-white text-black p-3 rounded-lg border border-black tracking-wide container px-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100"
                    value={tripData.description}
                    placeholder="Description..."
                    readOnly
                  />
                  <label>Image URL</label>
                  <input
                    className="bg-white text-black p-3 rounded-lg border border-black tracking-wide container px-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100"
                    value={tripData.imageUrl}
                    placeholder="Banner Image URL..."
                    readOnly
                  />
                  <label>Start Date</label>
                  <DatePicker
                    className="bg-white text-black p-3 rounded-lg border border-black tracking-wide container px-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100"
                    startOrEndDate="startDate"
                    readOnly
                  />
                  <label>End Date</label>
                  <DatePicker
                    className="bg-white text-black p-3 rounded-lg border border-black tracking-wide container px-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100"
                    startOrEndDate="endDate"
                    readOnly
                  />
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
                      {tripData.days.map((day) => (
                        <CompleteDays
                          key={day.id}
                          day={day}
                          setTripData={setTripData}
                          readOnly={"readonly"}
                        />
                      ))}
                    </Collapsible>
                  </section>
                </form>
              )}
            </section>
            <div className="flex mx-2 mb-4 space-x-2">
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
              {signedIn ? (
                <button
                  className="text-black bg-white p-2 rounded-lg border transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100"
                  onClick={() =>
                    saveTrip(
                      tripData,
                      currentUser.user.id,
                      setOwnedByUser,
                      setTripData
                    )
                  }
                >
                  <span className="flex items-center">
                    Save Trip Details <FaSave className="ml-1" />
                  </span>
                </button>
              ) : (
                <button
                  className="text-black bg-white p-2 rounded-lg border transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-red-100"
                  type={"button"}
                >
                  <span className="flex items-center">
                    Must be signed in to save! <FaSave className="ml-1" />
                  </span>
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
