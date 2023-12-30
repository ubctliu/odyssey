"use client";
import Typewriter from 'typewriter-effect';

export default function TitleTypeWriter() {
  return (
    <Typewriter
      options={{
        loop: true,
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString(`"The world is a book, and those who do not travel read only a page."`)
          .pauseFor(100)
          .deleteAll(100)
          .typeString(`"Traveling – it leaves you speechless, then turns you into a storyteller."`)
          .pauseFor(100)
          .deleteAll(100)
          .typeString(`"Adventure awaits."`)
          .pauseFor(100)
          .deleteAll(100)
          .typeString(`"Travel far, travel wide, travel deep."`)
          .pauseFor(100)
          .deleteAll(100)
          .start();
      }}
    />
  );
}

