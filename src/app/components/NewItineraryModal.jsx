import { useUser } from '@clerk/nextjs';
import { FaTimes } from 'react-icons/fa';
import { APIProvider } from '@vis.gl/react-google-maps';
import SearchBar from "./SearchBar";
import { stringToBase64 } from '@/lib/base64Utils';
import Link from 'next/link';
import DateRangeCalendar from './DateRangeCalendar';
import { useTripData } from '../context/TripDataContext';

export default function NewItineraryModal({ onClose }) {
  const currentUser = useUser();
 const { tripData, setTripData } = useTripData();
  const guestId = "womdon231j2mklmksA"; // just random characters for now - should add logic to randomize later

  // Add any other form fields or functions as needed

  // Don't proceed until user data is loaded
  if (!currentUser.isLoaded) {
    return <div>Loading...</div>
  }
  
   // TODO: rework custom url to be shorter & include it in tripData context (in /plan/new & /components/NewItineraryModel)
  const customUrl = currentUser.isSignedIn ? stringToBase64(`${currentUser.user.id}&${tripData.location}&${tripData.startDate}&${tripData.endDate}&${Math.floor(Math.random() * 1000)}`) : stringToBase64(`${tripData.guestId}&${tripData.location}&${tripData.startDate}&${tripData.endDate}&${Math.floor(Math.random() * 1000)}`);

  return (
    <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY} libraries={['places']}>
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-4/6">
        <div className="text-center">
          <FaTimes className="cursor-pointer" onClick={onClose} />
          <h2 className="text-xl font-bold  text-black mb-4">New Itinerary</h2>
          <form className='text-black'>
            <div className="mb-4">
              <input
                className="bg-white text-black p-3 rounded-lg border border-black tracking-wide container px-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100"
                id="title"
                name="title"
                placeholder="Title (optional)"
                type="text"
                onChange={e => setTripData((prev) => ({
                  ...prev,
                  title: e.target.value
                }))}/>
            </div>
            <div className="mb-4">
              <SearchBar setLocationData={setTripData} className={"bg-white text-black p-3 rounded-lg border border-black tracking-wide container px-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100"}/>
            </div>
            <div className="mb-4">
              <DateRangeCalendar className={"bg-white text-black p-3 rounded-lg border border-black tracking-wide container px-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100"} />
            </div>
            <div>
              
            </div>
            <div className="mb-4">
              <textarea
                className="bg-white text-black p-3 rounded-lg border border-black tracking-wide container px-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100"
                id="description"
                name="description"
                placeholder="Description (optional)"
                rows="4"
                onChange={e => setTripData((prev) => ({
                  ...prev,
                  description: e.target.value
                }))}
              />
            </div>
            {
              (tripData.isDateSet && tripData.isLocationSet) ?
              currentUser.isSignedIn ?
              <Link 
            href={`/plan/${customUrl}`}
            onClick={() => setTripData((prev) => ({
              ...prev,
              url: customUrl,
              clerkId: currentUser.user.id
            }))}
            className="bg-blue-500 text-white px-4 py-2 rounded">
              Save
            </Link> : 
            <Link 
            href={`/plan/${customUrl}`}
            onClick={() => setTripData((prev) => ({
              ...prev,
              url: customUrl,
              clerkId: currentUser.user.id
            }))}
            className="bg-orange-400 text-white px-4 py-2 rounded">
              Continue as Guest
            </Link>:
            <Link 
            href={""}
            className="bg-gray-400 text-white px-4 py-2 rounded">
              Missing required fields!
            </Link>
            }
            
          </form>
        </div>
      </div>
    </div>
    </APIProvider>
  );
}
