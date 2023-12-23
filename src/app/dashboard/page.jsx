import { auth } from "@clerk/nextjs";
import vacationimg from "../../../public/images/vacationimg.png"
import Image from "next/image"
import { redirect } from "next/navigation";
import Link from "next/link";


export default async function (Component) {
  const { userId } = auth();
  if (!userId){
    return redirect("/sign-in")
  }

  return (
    <div className="h-5/6">
      <main className="flex justify-between p-16 bg-gray-400 items-center border border-b-8 border-solid border-b-slate-700">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to Odyssey</h1>
          <p className="text-2xl font-semibold text-white mb-4">Create and share your travel itineraries</p>
          <Link
            className="text-white bg-emerald-400 hover:text-white hover:bg-emerald-500 p-2 rounded-lg border"
            href="/plan/new"
          >
            + Create a New Itinerary
          </Link>
        </div>
        <Image src={vacationimg} alt="vacation" className="w-1/2 border-solid border-x-orange-300 border-4" />

      </main>
    </div>
  )
}