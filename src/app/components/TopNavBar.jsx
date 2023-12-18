import React from 'react';

import PlaneIcon from '../../../public/Icons/PlaneIcon';
import { UserButton } from '@clerk/nextjs';

export default function TopNavBar() {
  return (
    <div className="h-5/6">
      <nav className="flex justify-between items-center p-6 bg-white shadow-md border-b-black border-solid w-screen">
        <div className="flex items-center">
          <PlaneIcon className="w-6 h-6 mr-2 hover:animate-spin" />
          <a href="/" className="font-semibold text-lg">Odyssey</a>
        </div>
        <div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>
    </div>
  );
}