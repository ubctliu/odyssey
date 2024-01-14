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
import { createTrip, fetchTrip, fetchTripWithDaysAndEvents, updateTrip, createDays, fetchUser, generateAndUploadAIImage } from "@/lib/api";
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
    loadTripDetails(url, setTripData, setDaysExist);
    console.log(tripData);
  }, []);

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

  const handleImageUpload = (file) => {
    return new Promise((resolve, reject) => {
      if (file) {
        const storageRef = ref(ImageToDB, `upload/${v4()}`);
        uploadBytes(storageRef, file[0])
          .then(() => {
            setTimeout(() => {
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
            }, 3000);
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
    const aiImg = await generateAndUploadAIImage(tripData);
    loadTripDetails(url, setTripData, setDaysExist);
    setImgLoading(false);
    
  }

  

return (
  <div className="max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    <div className="h-5/6 flex justify-center text-black">
      <main className="flex justify-between bg-white items-center border border-black rounded-xl border-b-slate-700">
      <div className="flex flex-col justify-center items-center">
        <div className="pt-4">
      {tripData.imageUrl && imgLoading == false ? (
                <Image className="border border-black" src={tripData.imageUrl} height={512} width={512} alt="image not here yet" />
                ) : ( <AiOutlineLoading3Quarters className="animate-spin" /> )}
                </div>
          <section className="top_title p-16">
            {ownedByUser ? (
              <div className="">
                <div className="flex items-center">
              <button className="text-black mx-auto bg-white p-2 rounded-lg border transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100"
              onClick={handleAiImg}> Generate AI Image</button>
              </div>
              <form className="px-16">
                <h1 className="text-3xl font-semibold mx-auto pb-4"> Edit Trip Details</h1>
                <hr className="h-2 pb-2"/>
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
                  <label>Image</label>
                  {/* <input
                    className="bg-white text-black p-3 rounded-lg border border-black tracking-wide container px-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100"
                    type="file"
                    accept=".pdf, .png, .jpg"
                    onChange={e => {
                      const file = e.target.files[0];
                      if (file) {
                        // Handle the file upload logic here
                        // You can access the file using `file` variable
                        // Update the `imageUrl` in the `tripData` state accordingly
                        setTripData(prev => ({
                          ...prev,
                          imageUrl: URL.createObjectURL(file)
                        }));
                      }
                    }}
                  /> */}
                  <label for="dropzone-file" class="flex flex-col items-center justify-center h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg class="w-8 h-8 mb-4 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p class="mb-2 text-sm text-black"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                        <p class="text-xs text-black ">JPG or PDF</p>
                    </div>
                    <input id="dropzone-file" type="file" class="hidden" accept=".pdf, .png, .jpg"
                    onChange={e => handleImageUpload(e.target.files)}
                    />
                </label>
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
                    {tripData.days.map((day) => <CompleteDays key={day.id} day={day} setTripData={setTripData}/>)}
                  </Collapsible>
                </section>
              </form>
              </div>
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
                    {tripData.days.map((day) => <CompleteDays key={day.id} day={day} setTripData={setTripData} readOnly />)}
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
  </div>
  );
}