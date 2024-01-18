import React from "react"
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';


export default function Contact() {
  return (
    <div className="w-screen h-fit px-40 py-10 border-l-indigo-50 flex flex-col">
        <h1 className="text-4xl font-bold">Contact Us</h1>
      <div className="grid gap-8 grid-cols-1 p-2">
        <div className="p-10 space-y-4 flex items-center align-middle mx-auto border border-black rounded-md">
          <Image
            alt="Terrence"
            height={150}
            width={150}
            className="rounded-full px-2 py-2"
            src={ 'https://firebasestorage.googleapis.com/v0/b/odyssey-file-storage.appspot.com/o/upload%2F5c5cbf30-40f1-4f89-a7d9-85286cadc18c?alt=media&token=c0c9fbc8-9c01-47b7-9505-8bc9ce3040e6' }
          />
          <p className="text-sm">
          <h3 className=" text-lg font-semibold">Terrence Liu <a href={"https://github.com/ubctliu"}><FaGithub className=" inline-block hover:animate-bounce"/> </a> <a href={"https://www.linkedin.com/in/terrence-liu/"}><FaLinkedin className="inline-block hover:animate-bounce"/></a></h3>
            Terrence's interest in programming started in high school, where he spent time learning Java to make modifications to his favorite games. While initially working towards towards a minor in Computer Science, he ended up at Lighthouse Labs where he learned about all things web-development related.
            Now seeking new opportunities as a Full Stack Developer, he is proficient in working with React, JavaScript/TypeScript, SQL, HTML, and CSS. He enjoys learning about new things and expanding his knowledge about all things tech-related. Reach out to him out LinkedIn if you want to work on a project together!
          </p>
        </div>
    </div>
    <div className="grid gap-8 grid-cols-1 p-2">
        <div className="p-10 space-y-4 flex items-center align-middle mx-auto border border-black rounded-md">
          <Image
            alt="John Doe"
            height={150}
            width={150}
            className="rounded-full px-2 py-2"
            src={ 'https://firebasestorage.googleapis.com/v0/b/odyssey-file-storage.appspot.com/o/upload%2F0247680c-4456-445d-b25c-2eb39369ea59?alt=media&token=24913d4b-c837-408c-90a9-d01100a3c139' }
          />
          <p className="text-sm">
          <h3 className=" text-lg font-semibold">Abdul<FaGithub className=" inline-block hover:animate-bounce"/> <FaLinkedin className="inline-block hover:animate-bounce"/></h3>
          Hello! I'm Abdul, a full-stack developer with expertise in Reactjs, Nextjs, TailwindCSS, and SQL databases. A proud alumnus of Lighthouse Labs, I am deeply engaged in the tech community, constantly exploring new technologies and approaches in web development. My journey in tech is marked by collaborative projects where I've leveraged my skills in both front-end and back-end development to create dynamic, user-focused solutions. I'm keen on continuous learning and sharing my knowledge with peers. Let's connect on LinkedIn and GitHub to discuss innovative ideas and opportunities in the tech world!
          </p>
        </div>
    </div>
    <div className="grid gap-8 grid-cols-1 p-2">
        <div className="p-10 space-y-4 flex items-center align-middle mx-auto border border-black rounded-md">
          <Image  
            alt="John Doe"
            height={150}
            width={150}
            className="rounded-full px-2 py-2"
            src={ 'https://firebasestorage.googleapis.com/v0/b/odyssey-file-storage.appspot.com/o/upload%2F0247680c-4456-445d-b25c-2eb39369ea59?alt=media&token=24913d4b-c837-408c-90a9-d01100a3c139' }
          />
          <p className="text-sm">
          <h3 className=" text-lg font-semibold">Angela Zhou <FaGithub className=" inline-block hover:animate-bounce"/> <FaLinkedin className="inline-block hover:animate-bounce"/></h3>
            Angela Zhou is a full-stack developer with a background in environmental consulting. Angela began her transition to tech through the Lighthouse Labs Web Development program where
            she learnt front-end fundamentals like JavaScript, CSS, and HTML, software architecture, databases and data modelling, component-based design, and much more. 
          </p>
        </div>
    </div>
    <div className="grid gap-8 grid-cols-1 p-2">
        <div className="p-10 space-y-4 flex items-center align-middle mx-auto border border-black rounded-md">
          <Image
            alt="John Doe"
            height={150}
            width={150}
            className="rounded-full px-2 py-2"
            src={ 'https://firebasestorage.googleapis.com/v0/b/odyssey-file-storage.appspot.com/o/upload%2F0247680c-4456-445d-b25c-2eb39369ea59?alt=media&token=24913d4b-c837-408c-90a9-d01100a3c139' }
          />
          <p className="text-sm">
          <h3 className=" text-lg font-semibold">John Doe <FaGithub className=" inline-block hover:animate-bounce"/> <FaLinkedin className="inline-block hover:animate-bounce"/></h3>
            John Doe got started with web development by making sites with WordPress, and eventually tricked himself into
            doing JavaScript. His favorite pastime is karaoke. John is either a Disney villain or a Disney princess,
            depending on the day.
          </p>
        </div>
    </div>
    
    </div>
  );
}