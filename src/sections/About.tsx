"use client";

import Image from "next/image";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { useRef } from "react";
import AnimatedTextLines from "@/components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const aboutText = `As an Informatics Engineering student at Universitas Negeri Surabaya, i am a versatile professional bridging the gap between software engineering and creative media. Since embarking on my digital journey in 2022, I've immersed myself not just in writing clean, efficient code, but also in visual storytelling through videography, content direction, and modern UI design.`;

  const aboutText2 = `Right now, i leverage a powerful stack of modern technologies including Next.js, TypeScript, Flutter, React Native, and Golang to build robust applications. Over the past five years, I've evolved into a confident creator who thrives on ambitious projects, seamlessly blending the technical rigor of a backend engineer with the creative flair of a visual director.`;

  const containerRef = useRef<HTMLElement>(null);
  const imgWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (imgWrapperRef.current) {
        gsap.fromTo(
          imgWrapperRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            force3D: true,
            scrollTrigger: {
              trigger: imgWrapperRef.current,
              start: "top 88%",
              once: true,
            },
          },
        );
      }
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
      <div className="flex flex-col items-center justify-evenly gap-10 lg:gap-16 px-6 md:px-10 pb-20 md:pb-34 text-xl font-light tracking-wide lg:flex-row md:text-2xl lg:text-3xl text-white/80">
        {/* Gambar: aspect-square di mobile, natural ratio di tablet & desktop */}
        <div
          ref={imgWrapperRef}
          className="relative w-full max-w-sm lg:max-w-md shrink-0"
        >
          <Image
            src="/images/firaz-linkedin.webp"
            alt="Firaz Fulvian Hafiz"
            width={460}
            height={575}
            className="w-full aspect-square md:aspect-auto object-cover object-top rounded-3xl border border-white/5"
            priority
          />
        </div>

        {/* Deskripsi: Tampil utuh lengkap di semua perangkat */}
        <div className="gap-6 md:gap-8 flex flex-col w-full lg:max-w-2xl">
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
