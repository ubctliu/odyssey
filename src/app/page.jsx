import Link from "next/link"
import Image from "next/image"
import vacation from '../../public/images/vacation.png'
import TitleTypeWriter from "./components/TitleTypeWriter"
import TopNavBar from "./components/TopNavBar"

export default async function Component() {

  return (
    <div>
      <TopNavBar />
      <main className="px-6 py-8">
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex justify-center">Welcome to Odyssey</h2>
          <span className=" font-semibold text-black mb-4 flex justify-center">
            <TitleTypeWriter />
          </span>
          <div className="flex justify-center items-center">
          <Link
            className="text-white bg-emerald-400 hover:text-white hover:bg-emerald-500 p-2 rounded-lg border"
            href="/plan/new"
          >
            + Create a New Itinerary
          </Link>
        </div>
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

