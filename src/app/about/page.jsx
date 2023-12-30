import React from 'react';

const ParallaxTextBlock = ({ text, alternate }) => {
  const sideOfScreen = alternate ? 'justify-start' : 'justify-end text-right';

  return (
    <div className={`h-80 flex items-center bg-cover bg-center text-white ${sideOfScreen}`}>
      <p className="pl-4 pr-4 pb-0 text-1xl w-1/2 "style={{ paddingBottom: '-5rem', paddingTop: '-5rem' }}>{text}</p>
    </div>
  );
};

const About = () => {
  return (
    <div>
      <div className="flex max-h-screen bg-fixed bg-aboutParallax bg-cover">
        <h1 className="justify-left pl-6 mt-6 font-bold text-5xl"> Why Odessey? </h1>
      </div>
      <div className="bg-fixed bg-aboutParallax bg-cover">
          <ParallaxTextBlock 
            text="We provide a unique platform for travelers to create and share itineraries from around the world.
            Whether you're planning a short city break or a month-long journey across continents, Odyssey helps you create the perfect itinerary."
            alternate={true}
          />
          <ParallaxTextBlock 
            text="Tailored Itineraries: Whether you're a culture enthusiast, a nature lover, or a thrill-seeker, we've got you covered. Our intuitive platform allows you to craft customized itineraries that match your travel style and preferences."
            alternate={false}
          />
          <ParallaxTextBlock 
            text="Seamless Planning: Say goodbye to the hassle of travel planning. Our user-friendly interface, extensive destination guides, and collaboration features make organizing your journey a breeze. Focus on the excitement of your upcoming adventure while we take care of the details."
            alternate={true}
          />
          <ParallaxTextBlock 
            text="Share Your Plans: If you're traveling with others, you can easily share your itinerary with tripmates to all collaborate and plan together. Your group itinerary will update live so you can all have the most recent changes as soon as they are saved."
            alternate={false}
          />
        <p className="w-1/2 mx-auto text-center pb-4">
          Embark on a journey of discovery with Odyssey — where every destination becomes a story, and every traveler an author of their own adventure.
          Ready to start planning your next trip? Join us today and let the exploration begin!
        </p>
      </div>
    </div>
  )
}

export default About