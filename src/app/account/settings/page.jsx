"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import vacationimg from "../../../../public/images/vacationimg.png"
import { useEffect, useState } from "react";
import { fetchUser, updateUser } from "@/lib/api";

const updateUserInfo = async (user, accountInfo) => {
try {
  const newUser = { ...user, email: accountInfo.email, phoneNumber: accountInfo.phoneNumber };
  const updatedUser = await updateUser(newUser);
  console.log("User details updated:", updatedUser);
} catch (error) {
  console.error("An error occurred:", error);
}
};


export default function () {
const currentUser = useUser();
const [accountInfo, setAccountInfo] = useState({ email: "", phoneNumber: ""});

useEffect(() => {
  const fetchInitialUserInfo = async (user) => {
    try {
      const fetchedUser = await fetchUser(user.id);
      setAccountInfo({ email: fetchedUser.data.email ?? "", phoneNumber: fetchedUser.data.phoneNumber ?? "" });
  } catch (error) {
    console.error("Error occurred while fetching account information:", error);
  }
  };
  
  if (currentUser.isLoaded && currentUser.user) {
    fetchInitialUserInfo(currentUser.user);
  }

}, [currentUser.isLoaded]);

return (
  <div className="h-5/6">
  <main className="flex justify-between p-16 bg-gray-400 items-center border border-b-8 border-solid border-b-slate-700">
    <div className="flex flex-col justify-center items-center space-y-4">
      <h1 className="text-4xl font-bold text-white mb-4">Account Settings</h1>
      <form className="space-y-2">
        <label htmlFor="email"className="block mb-2 text-medium font-medium text-gray-900 dark:text-white">
          Email
        </label>
        <input className="bg-white text-black p-2 rounded-lg border border-black " value={accountInfo.email} placeholder="example@domain.com" 
        onChange={e => setAccountInfo((prev) => ({
          ...prev,
          email: e.target.value
        }))}>
        </input>
        <label htmlFor="phoneNumber"className="block mb-2 text-medium font-medium text-gray-900 dark:text-white">
          Phone Number
        </label>
        <input className="bg-white text-black p-2 rounded-lg border border-black" value={accountInfo.phoneNumber} placeholder="XXX-XXX-XXXX"
          onChange={e => setAccountInfo((prev) => ({
            ...prev,
            phoneNumber: e.target.value
          }))}>
        </input>
      </form>
      <button
        className="text-white bg-emerald-400 hover:text-white hover:bg-emerald-500 p-2 rounded-lg border"
        onClick={() => updateUserInfo(currentUser.user, accountInfo)}
      >
        Update
      </button>
    </div>
    <Image src={vacationimg} alt="vacation" className="w-1/2 border-solid border-x-orange-300 border-4" />

  </main>
</div>
  // <section className="flex flex-col items-center justify-center">
  //   <h1 className="text-3xl antialiased">Account Settings</h1>
  //   <form>
  //     <input>
  //     </input>
  //   </form>
  // </section>
);
}