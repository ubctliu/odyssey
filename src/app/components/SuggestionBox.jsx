"use client";
import { useTripData } from "../context/TripDataContext";
import Collapsible from "@/app/components/Collapsible";
import Suggestion from "@/app/components/Suggestion";
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

/* fetch google places nearby search results 
  params: placesService (PlacesService(div)), 
          locationData ({lat: latitude, lng: longitude}),
          type (desired search type) */
const fetchSearchResults = async (placesService, locationData, type) => {
  const filter = ["lodging", "university", "gym"]; 
  // remove unwanted results using google types
  // https://developers.google.com/maps/documentation/javascript/supported_types 
  const request = {
    location: {lat: locationData.latValue, lng: locationData.lngValue },
    radius: 50000,
    keyword: type === "restaurant" ? "michelin" : "",
    // ['museum', 'park', 'restaurant']
    type: type || "tourist_attraction", // default tourist attraction
    rankby: "prominence", // default prominence
  };
  
  try {
    //TODO: add more results + make results more relevant
    const response = await new Promise((resolve) => {
      placesService.nearbySearch(request, (results, status, next_page_token) => {
        const filteredResults = results.filter(place => {
          const name = place.name.toLowerCase();
          const types = place.types;
          return !filter.some(keyword => types.includes(keyword));
        });
        // console.log(next_page_token);
        resolve({ filteredResults, status, next_page_token });
      });
    });

    if (response.status === 'OK' && response.filteredResults.length > 0) {
      console.log("suggestions", response.filteredResults);
      return response.filteredResults;
    } else {
      console.error('Nearby search failed:', response.status);
      return [];
    }
  } catch (error) {
    console.error('Error during nearby search:', error);
    return [];
  }

};

const geocodePlaceId = async (tripData, geocodingService, setLocationData) => {
  try {
    const response = await new Promise((resolve) => {
      console.log("geocoding service", geocodingService);
      geocodingService.geocode({ placeId: tripData.placeId }, (results, status) => {
        resolve({ results, status });
      });
    });
    
    if (response.status === 'OK' && response.results.length > 0) {
      const { lat, lng } = response.results[0].geometry.location;
      const latValue = lat();
      const lngValue = lng();
      setLocationData({ latValue, lngValue });
    } else {
      console.error('Geocoding failed:', response.status);
    }
  } catch (error) {
    console.error('Geocoding failed:', error);
  }
};


export default function SuggestionBox({type}) {
  console.log("Type received in SuggestionBox:", type);
  const placesLibrary = useMapsLibrary('places');
  const [placesService, setPlacesService] = useState(null);
  const geocodingLibrary = useMapsLibrary('geocoding');
  const [geocodingService, setGeocodingService] = useState(null);
  const { tripData, setTripData } = useTripData();
  const [locationData, setLocationData] = useState({});
  const [suggestions, setSuggestions] = useState();

   // set geocoder service

   useEffect(() => {
    if (!geocodingLibrary) {
      return;
    };

    try {
      setGeocodingService(new geocodingLibrary.Geocoder());
      console.log("Geocoding service loaded successfully!");
    } catch (error) {
      console.error("Error loading geocoding service:", error);
    }
  }, [geocodingLibrary]);

  useEffect(() => {
    if (!geocodingService){
      return;
    } 
    geocodePlaceId(tripData, geocodingService, setLocationData);
    console.log("loaded geocoding services!")
  }, [geocodingService]);


  useEffect(() => {
    if (!placesLibrary) {
      return;
    };
    
    try {
      const div = document.querySelector("#testId");
      setPlacesService(new placesLibrary.PlacesService(div));
      console.log("Places service loaded successfully!");
    } catch (error) {
      console.error("Error loading places service:", error);
    }
  }, [placesLibrary]);

  useEffect(() => {
    if (!placesService){
      return;
    } 
    const fetchData = async () => {
      try {
        const suggestionsData = await fetchSearchResults(placesService, locationData, type);
        setSuggestions(suggestionsData);
        console.log("loaded places services!");
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        // Handle errors if needed
      }
    }
    fetchData();
  }, [placesService, locationData, type]);


  return (
    <>
      <Collapsible className={""} title={"Suggestions"}>
      <div className="mb-3">
        <Carousel className="max-w-3xl mt-2">
        {Array.isArray(suggestions) &&
          suggestions.map((result) => (
            <Suggestion key={result.place_id} suggestion={result} />
          ))}
          </Carousel>
          </div>
          <div id={"testId"}>
          </div>
      </Collapsible>
    </>
  );
}