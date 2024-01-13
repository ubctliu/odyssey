"use client";
import React, { useEffect } from "react";
import FadeInOnScroll from "../components/FadeInOnScroll";
import AOS from "aos";
import "aos/dist/aos.css";

const ParallaxTextBlock = ({ text, alternate }) => {
  const sideOfScreen = alternate ? "justify-start" : "justify-end text-right";

  return (
    <div
      className={`h-80 flex items-center bg-cover bg-center text-white ${sideOfScreen}`}
    >
      <p
        className="pl-4 pr-4 pb-0 text-1xl w-1/2 "
        style={{ paddingBottom: "-5rem", paddingTop: "-5rem" }}
      >
        {text}
      </p>
    </div>
  );
};

const About = () => {
  useEffect(() => {
    AOS.init({duration:1700})
  })

  return (
    <div flex justify-center items-center>
      <div className="flex justify-center items-center max-h-screen bg-fixed bg-aboutParallax bg-cover">
        <FadeInOnScroll>
        <h1 className="mt-10 font-palanquin text-8xl max-sm:text-[72px] max-sm:leading-[82] font-bold" data-aos="fade-up">
          {" "}
          Why Odyssey?{" "}
        </h1>
        </FadeInOnScroll>
        </div>
      <div className="bg-fixed bg-aboutParallax bg-cover">
        <FadeInOnScroll>
        <p className="font-montserrat text-3xl font-bold pl-4 pr-4 pb-0 text-1xl w-1/2 transition-opacity duration-4 text-white" data-aos="fade-up">
          We provide a unique platform for travelers to create and share itineraries from around the world.
          Whether you're planning a short city break or a month-long journey across continents, Odyssey helps you create the perfect itinerary."
        </p>
          </FadeInOnScroll>
          <br />
          <br />
          <FadeInOnScroll>
          <p className="font-montserrat text-3xl font-bold pl-4 pr-4 pb-0 text-1xl w-1/2 transition-opacity duration-400 text-white" data-aos="fade-up">
          Tailored Itineraries: Whether you're a culture enthusiast, a nature lover, or a thrill-seeker, we've got you covered. Our intuitive platform allows you to craft customized itineraries that match your travel style and preferences."
          </p>
          </FadeInOnScroll>
          <br />
          <br />
          <FadeInOnScroll>
        <p className="font-montserrat text-3xl font-bold pl-4 pr-4 pb-0 text-1xl w-1/2 transition-opacity duration-400 text-white" data-aos="fade-up">
          Seamless Planning: Say goodbye to the hassle of travel planning. Our user-friendly interface, extensive destination guides, and collaboration features make organizing your journey a breeze. Focus on the excitement of your upcoming adventure while we take care of the details."
        </p>
          </FadeInOnScroll>
          <br />
          <br />
          <FadeInOnScroll>
        <p className="font-montserrat text-3xl font-bold pl-4 pr-4 pb-0 text-1xl w-1/2 transition-opacity duration-400 text-white" data-aos="fade-up">
          Share Your Plans: If you're traveling with others, you can easily share your itinerary with trip-mates to all collaborate and plan together. Your group itinerary will update live so you can all have the most recent changes as soon as they are saved."
        </p>
          </FadeInOnScroll>
          <br />
          <br />
          <FadeInOnScroll>
        <p className="font-montserrat text-3xl font-bold pl-4 pr-4 pb-0 text-1xl w-1/2 transition-opacity duration-400 text-white" data-aos="fade-up">
          Embark on a journey of discovery with Odyssey — where every
          destination becomes a story, and every traveler an author of their own
          adventure. Ready to start planning your next trip? Join us today and
          let the exploration begin!
        </p>
          </FadeInOnScroll>
      </div>
    </div>
  );
};

export default About;
