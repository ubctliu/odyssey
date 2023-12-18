import Link from "next/link"
import Image from "next/image"
import vacation from '../../public/images/vacation.png'
import TitleTypeWriter from "./components/TitleTypeWriter"
import PlaneIcon from "../../public/Icons/PlaneIcon"
import { auth } from "@clerk/nextjs";

export default async function Component() {
  const { userId } = await auth();


  return (
    
    <div>
      <nav className="flex justify-between items-center p-6 bg-white shadow-md border-b-black border-solid">
        <div className="flex items-center">
          <PlaneIcon className="w-6 h-6 mr-2 hover:animate-spin" />
          <p className="font-semibold text-lg">Odyssey</p>
        </div>
        
        <div className="flex justify-center items-center">
          <Link
            className="text-black hover:text-white hover:bg-black p-2 rounded-lg border border-black"
            href="/new-itinerary"
          >
            + Create a New Itinerary
          </Link>
        </div>

        <div className="flex justify-center items-center">
          {userId ? (
            <Link
              className="text-black hover:text-white hover:bg-black p-2 rounded-lg border border-black"
              href="/dashboard"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                className="text-black hover:text-white hover:bg-black p-2 rounded-lg border border-black"
                href="/sign-in"
              >
                Login
              </Link>
              <Link
                className="text-black hover:text-white hover:bg-black p-2 rounded-lg ml-4 border border-black"
                href="/sign-up"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
      <main className="px-6 py-8">
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex justify-center">Welcome to Odyssey</h2>
          <span className=" font-semibold text-black mb-4 flex justify-center">
            <TitleTypeWriter />
          </span>
          <Image src={vacation} className="mx-auto" />
          <h2 className="text-2xl font-semibold text-gray-800 m-6 flex justify-center">Why Odyssey?</h2>
          <p className="text-gray-600">
            We provide a unique platform for travelers to create, and share itineraries from around the world.
            Whether you're planning a short city break or a month-long journey across continents, Odyssey helps you
            create the perfect itinerary.
          </p>
        </section>
      </main>
     
    </div>
  )
}

