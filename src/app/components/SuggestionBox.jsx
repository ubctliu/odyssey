"use client";
import { useTripData } from "../context/TripDataContext";
import Collapsible from "@/app/components/Collapsible";
import Suggestion from "@/app/components/Suggestion";
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useState } from "react";

const fetchSearchResults = async (placesService, locationData, type) => {
  const filter = ["seppuku", "cemetery", "lottery", "inn", "hotel", "airport", "club", "resort", "fairmont"]; //remove unwanted results
  const request = {
    location: {lat: locationData.latValue, lng: locationData.lngValue },
    radius: 50000,
    // keyword: keyword || "popular tourist location",
    // ['museum', 'park', 'restaurant']
    type: type || "tourist_attraction", // default tourist attraction
    rankby: google.maps.places.RankBy.PROMINENCE, // default prominence
  };

  console.log(request);
  try {
    //TODO: add more results + make results more relevant
    const response = await new Promise((resolve) => {
      placesService.nearbySearch(request, (results, status, next_page_token) => {
        const filteredResults = results.filter(place => {
          const name = place.name.toLowerCase();
          return !filter.some(keyword => name.includes(keyword));
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
        {Array.isArray(suggestions) &&
          suggestions.map((result) => (
            <Suggestion key={result.place_id} suggestion={result}>
            </Suggestion>
          ))}
          <div id={"testId"}>
          </div>
      </Collapsible>
    </>
  );
}