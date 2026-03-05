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

  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      // Scale out effect - Using containerRef.current directly as target
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          scale: 0.95,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "bottom 95%",
            end: "bottom 5%",
            scrub: true,
          },
          ease: "power1.inOut",
          force3D: true,
        });
      }

      // Image reveal effect
      gsap.set(imgRef.current, {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
      });
      gsap.to(imgRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: imgRef.current,
          start: "top 85%",
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      id="about"
      ref={containerRef}
      className="min-h-screen bg-linear-to-b from-gray-900 to-gray-800 sm:rounded-b-[64px] rounded-b-3xl overflow-hidden"
    >
      <AnimatedHeaderSection
        subtitle=""
        title="About"
        text="⟢⟢⟢"
        textColor="text-white/75"
        titleColor="text-[#FFE093]"
      />
      <div className="flex flex-col items-center justify-evenly gap-12 lg:gap-16 px-6 md:px-10 pb-24 md:pb-34 text-xl font-light tracking-wide lg:flex-row md:text-2xl lg:text-3xl text-white/80">
        <div className="relative w-full max-w-md lg:w-md will-change-transform">
          <Image
            ref={imgRef}
            src="/images/firaz-linkedin.jpg"
            alt="programmer"
            className="w-full rounded-3xl shadow-2xl border border-white/5"
            width={375}
            height={375}
            priority
          />
        </div>
        <div className="gap-6 md:gap-8 flex flex-col w-full lg:max-w-2xl will-change-transform">
          <AnimatedTextLines
            text={aboutText}
            className="sm:text-xl text-[0.95rem] leading-relaxed font-sans font-extralight text-white/70"
          />
          <AnimatedTextLines
            text={aboutText2}
            className="sm:text-xl text-[0.95rem] leading-relaxed font-sans font-extralight text-white/70"
          />
        </div>
      </div>
    </section>
  );
}
