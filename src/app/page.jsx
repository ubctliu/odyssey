import Link from "next/link"
import Image from "next/image"
import vacation from '../../public/images/vacation.png'
import TitleTypeWriter from "./components/TitleTypeWriter"

export default async function Component() {

  return (
    <div>
      <main className="px-6 py-8">
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex justify-center">Welcome to Odyssey</h2>
          <span className=" font-semibold text-black mb-4 flex justify-center">
            <TitleTypeWriter />
          </span>
          <div className="flex justify-center items-center">
          <Link
            className="text-white bg-orange-400 hover:text-white hover:bg-orange-500 p-5 rounded-lg border"
            href="/plan/new"
          >
            Get Started
          </Link>
        </div>
        <div className="bg-fixed">
          <Image src={vacation} alt="Vacation Image" className="mx-auto" width="768" height="768" />
        </div>
        </section>
      </main>
     
    </div>
  )
}

