"use client";

import Image from "next/image";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { useRef } from "react";
import AnimatedTextLines from "@/components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function About() {
  const aboutText = `As an Informatics Engineering student at Universitas Negeri Surabaya, I am a passionate and self driven developer with a flair for fullstack development, specializing in React.js and Node.js. Since embarking on my web development journey in 2022, I've immersed myself in creating intuitive, pixel perfect interfaces and robust, high performance applications. Now, in my early thirties, I leverage cutting edge tools like Next.js, TypeScript, Tailwind CSS, Laravel, and Supabase to craft seamless digital experiences that blend technical precision with creative vision. 
  `;

  const aboutText2 = `Now in my early thirties, I leverage a powerful stack of modern technologies including Next.js, TypeScript, Tailwind CSS, Laravel, and Supabase to build cutting edge web applications that push the boundaries of innovation. Over the past two years, I've evolved from a budding developer into a confident creator, taking on increasingly ambitious projects that demand both technical rigor and creative flair.`;

  const imgRef = useRef<HTMLImageElement>(null);
  useGSAP(() => {
    if (window.innerWidth >= 560) {
      gsap.to("#about", {
        scale: 0.95,
        scrollTrigger: {
          trigger: "#about",
          start: "bottom 90%",
          end: "bottom 10%",
          scrub: true,
          markers: false,
        },
        ease: "power1.inOut",
      });
    }

    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: { trigger: imgRef.current },
    });
  });

  return (
    <section
      id="about"
      className="min-h-screen bg-linear-to-b from-gray-900 to-gray-800 sm:rounded-b-[64px] rounded-b-4xl"
    >
      <AnimatedHeaderSection
        subtitle=""
        title="About"
        text="⟢⟢⟢"
        textColor="text-white/75"
        titleColor="text-[#FFE093]"
      />
      <div className="flex flex-col items-center justify-between gap-16 px-10 pb-34 text-xl font-light tracking-wide lg:flex-row md:text-2xl lg:text-3xl text-white/80">
        <Image
          ref={imgRef}
          src="/images/firaz-linkedin.jpg"
          alt="programmer"
          className="w-md rounded-3xl"
          width={375}
          height={375}
          priority
        />
        <div className="gap-8 flex flex-col">
          <AnimatedTextLines
            text={aboutText}
            className="sm:text-xl text-sm font-sans font-extralight"
          />
          <AnimatedTextLines
            text={aboutText2}
            className="sm:text-xl text-sm font-sans font-extralight"
          />
        </div>
      </div>
    </section>
  );
}
