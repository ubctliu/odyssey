import Image from "next/image";
export default function Suggestion({suggestion}) {
  return (
  <div className={"flex flex-col"}>
  <Image src={suggestion.photos[0].getUrl()} width="600" height="450" className="max-w-xl max-h-96"></Image>
  {`${suggestion.name} ⭐${suggestion.rating ? suggestion.rating + "/5" : "Rating not available."}`}
  </div>
  );
}