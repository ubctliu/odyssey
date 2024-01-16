import PlaneIcon from '../../../public/Icons/PlaneIcon';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { auth } from "@clerk/nextjs";

export default function TopNavBar() {
  const { userId } = auth();
  
  return (
    <div className="h-5/6">
      <nav className="flex justify-between items-center p-6 bg-white shadow-md border-b-black border-solid w-screen">
      <div className="flex items-center">
        <div className="flex items-center ml-16">
          <PlaneIcon className="w-7 h-7 mr-2 hover:animate-[spin_2s_ease-in-out]" />
          <Link href="/" className="font-semibold text-xl">Odyssey</Link>
        </div>
        </div>
        <div className="flex items-center mr-7">
        <div className="flex items-center space-x-10 text-sm font-medium text-slate-500 dark:text-slate-200 subpixel-antialiased">
          {userId ? (
            <div>
            <Link
              className="text-black text-base hover:text-stone-400 p-3"
              href="/"
            >
              Home
            </Link>
            <Link
              className="text-black text-base hover:text-stone-400 p-3"
              href="/about"
            >
              About
            </Link>
            <Link
              className="text-black text-base hover:text-stone-400 p-3"
              href="/dashboard/test"
            >
              Dashboard
            </Link>
            <Link
              className="text-black text-base hover:text-stone-400 p-3"
              href="/contact"
            >
              Contact
            </Link>
            </div>
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
          <UserButton afterSignOutUrl="/" />
        </div>
        </div>
      </nav>
    </div>
  );
}