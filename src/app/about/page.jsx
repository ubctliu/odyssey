import Image from "next/image";
import fuji from '../../../public/images/fuji.jpg';

export default function About() {
  return (
    <div className="flex items-center bg-center h-96 bg-fixed bg-aboutParallax bg-cover">,
      <article className="place-content-center ">
        <h1 className="flex justify-center text-5xl"> Why Odessey? </h1>
        <p className="ml-[500px] mr-[500px] text-gray-600">
          We provide a unique platform for travelers to create, and share itineraries from around the world.
          Whether you're planning a short city break or a month-long journey across continents, Odyssey helps you
          create the perfect itinerary.
        </p>
      </article>
    </div>

    // <div>
    //   <p className="flex justify-center text-gray-600">
    //     We provide a unique platform for travelers to create, and share itineraries from around the world.
    //     Whether you're planning a short city break or a month-long journey across continents, Odyssey helps you
    //     create the perfect itinerary.
    //   </p>
    // </div>

    // <section>
    //   <Image src={fuji} alt="vacation" className="w-1/2 border-solid border-x-orange-300 border-4" />
    // <h2 className="text-2xl font-semibold text-gray-800 m-6 flex justify-center">Why Odyssey?</h2>
          // <p className="flex justify-center text-gray-600">
          //   We provide a unique platform for travelers to create, and share itineraries from around the world.
          //   Whether you're planning a short city break or a month-long journey across continents, Odyssey helps you
          //   create the perfect itinerary.
          // </p>
    // </section>
  )
}
