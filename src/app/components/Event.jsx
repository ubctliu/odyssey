export default function Event({event, index, visibleEvents, setVisibleEvents}) {
return (
  <div key={index} className="text-gray-600 py-2 hover:bg-gray-200 rounded">
                <div className="flex justify-between items-center">
                  <span>
                    {event.timeStart ? new Date(event.timeStart).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit'}) : "" - event.timeEnd ? new Date(event.timeEnd).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit'}) : ""}  {event.location ?? ""}
                  </span>
                  <span onClick={() => setVisibleEvents(
                      visibleEvents.map((currEvent) => (
                      currEvent.id === event.id ? { ...currEvent, isVisible: !currEvent.isVisible } : currEvent
                    )))} className="cursor-pointer text-blue-500">
                    Details
                  </span>
                </div>
                {event.isVisible && (
                  <div className="mt-2 pl-4 border-l-2 border-gray-300">
                    <p>Location: {event.location}</p>
                    <p>Notes: {event.notes}</p>
                  </div>
                )}
              </div>
);
}