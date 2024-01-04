"use client";
import { useUser } from "@clerk/nextjs";
import vacationimg from "../../../../public/images/vacationimg.png";
import Image from "next/image";
import { redirect } from "next/navigation";
import { APIProvider } from "@vis.gl/react-google-maps";
import SearchBar from "../../components/SearchBar";
import Link from "next/link";
import { useTripData } from "@/app/context/TripDataContext";
import { stringToBase64 } from "@/lib/base64Utils";

export default function (Component) {
  const currentUser = useUser();
  const { tripData, setTripData } = useTripData();
  const guestId = "womdon231j2mklmksA";

  // Don't proceed until user data is loaded
  if (!currentUser.isLoaded) {
    return <div>Loading...</div>;
  }

  // if (!currentUser.isSignedIn){
  //   return redirect("/sign-in")
  // }

  const customUrl = currentUser.isSignedIn
    ? stringToBase64(
        `${currentUser.user.id}&${tripData.location}&${tripData.startDate}&${tripData.endDate}&${tripData.title}&${tripData.description}`
      )
    : stringToBase64(
        `${tripData.guestId}&${tripData.location}&${tripData.startDate}&${tripData.endDate}&${tripData.title}&${tripData.description}`
      );

  return (
    <div className="h-5/6">
      <APIProvider
        apiKey={process.env.GOOGLE_MAPS_API_KEY}
        libraries={["places"]}
      >
        <main className="flex justify-between p-16 bg-gray-400 items-center border border-b-8 border-solid border-b-slate-700">
          <div className="flex flex-col justify-center items-center space-y-3">
            <h1 className="text-4xl font-bold text-white mb-4">
              {" "}
              {currentUser.isSignedIn
                ? `Hello, ${currentUser.user.firstName}.`
                : "Hello, Guest"}{" "}
              Here are your planned trips.
            </h1>
          </div>
          <Image
            src={vacationimg}
            alt="vacation"
            className="w-1/2 border-solid border-x-orange-300 border-4"
          />
        </main>
      </APIProvider>
    </div>
  );
}
