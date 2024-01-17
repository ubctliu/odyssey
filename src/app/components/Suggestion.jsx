import Image from "next/image";

export default function Suggestion({suggestion}) {
  console.log(suggestion);
  return (
  <div className={"flex flex-col max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md space-y-auto pb-5"}>
  <Image src={suggestion.photos?.[0].getUrl() ?? '/images/image_not_found.png'} alt={suggestion.name} width="480" height="360" className="max-w-full h-96 object-cover" unoptimized />
  {`${suggestion.name} - ${suggestion.vicinity} `} 
  <br />
  {`⭐${suggestion.rating ? suggestion.rating + "/5" : "Rating not available."} (${suggestion.user_ratings_total})`}
  </div>
  );
}