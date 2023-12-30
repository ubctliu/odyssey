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
          <PlaneIcon className="w-6 h-6 mr-2 hover:animate-spin" />
          <a href="/" className="font-semibold text-lg">Odyssey</a>
        </div>
        <div>
        <div className="flex justify-between space-x-4">
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
          <UserButton afterSignOutUrl="/" />
        </div>
        </div>
      </nav>
    </div>
  );
}