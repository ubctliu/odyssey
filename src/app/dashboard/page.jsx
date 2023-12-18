import { auth } from "@clerk/nextjs";
import PlaneIcon from "../../../public/Icons/PlaneIcon"
import { UserButton } from "@clerk/nextjs";
import vacationimg from "../../../public/images/vacationimg.png"
import Image from "next/image"
import { redirect } from "next/navigation";


export default async function (Component) {
  const { userId } = auth();
  if (!userId){
    return redirect("/sign-in")
  }

  return (
    <div className="h-5/6">
      <nav className="flex justify-between items-center p-6 bg-white shadow-md border-b-black border-solid w-screen">
        <div className="flex items-center">
          <PlaneIcon className="w-6 h-6 mr-2 hover:animate-spin" />
          <p className="font-semibold text-lg">Odyssey</p>
        </div>
        <div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>
      <main className="flex justify-between p-16 bg-gray-400 items-center border border-b-8 border-solid border-b-slate-700">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to Odyssey</h1>
          <p className="text-2xl font-semibold text-white mb-4">Create and share your travel itineraries</p>
          <a href="/" className="bg-white text-black p-2 rounded-lg border border-black hover:bg-black hover:text-white">+ Get Started</a>
        </div>
        <Image src={vacationimg} alt="vacation" className="w-1/2 border-solid border-x-orange-300 border-4" />

      </main>
    </div>
  )
}