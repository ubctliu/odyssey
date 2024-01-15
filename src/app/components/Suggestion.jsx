import Image from "next/image";
export default function Suggestion({suggestion}) {
  return (
  <div className={"flex flex-col"}>
  <Image src={suggestion.photos?.[0].getUrl() ?? '/images/image_not_found.png'} alt={suggestion.name} width="600" height="450" className="max-w-xl max-h-96" unoptimized></Image>
  {`${suggestion.name} ⭐${suggestion.rating ? suggestion.rating + "/5" : "Rating not available."}`}
  </div>
  );
}