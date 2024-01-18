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
            src={ 'https://firebasestorage.googleapis.com/v0/b/odyssey-file-storage.appspot.com/o/upload%2F0247680c-4456-445d-b25c-2eb39369ea59?alt=media&token=24913d4b-c837-408c-90a9-d01100a3c139' }
          />
          <p className="text-sm">
          <h3 className=" text-lg font-semibold">Terrence Liu <a href={"https://github.com/ubctliu"}><FaGithub className=" inline-block hover:animate-bounce"/> </a> <a href={"https://www.linkedin.com/in/terrence-liu/"}><FaLinkedin className="inline-block hover:animate-bounce"/></a></h3>
            Terrence's interest in programming started in high school, where he spent time learning Java to make modifications to his favorite games. 
            He enjoys learning about new things. Reach out to him out LinkedIn if you want to work on a project together!
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