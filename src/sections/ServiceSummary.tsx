"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ServiceSummary() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
          end: "bottom 20%",
          scrub: 0.8,
        },
      });

      tl.fromTo("#title-service-1", { xPercent: -20 }, { xPercent: 0, ease: "power1.out", force3D: true }, 0)
        .fromTo("#title-service-2", { xPercent: 20 }, { xPercent: 0, ease: "power1.out", force3D: true }, 0)
        .fromTo("#title-service-3", { xPercent: -25 }, { xPercent: 0, ease: "power1.out", force3D: true }, 0)
        .fromTo("#title-service-4", { xPercent: 25 }, { xPercent: 0, ease: "power1.out", force3D: true }, 0);
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="sm:text-4xl text-lg sm:mt-20 overflow-hidden font-extralight font-sans leading-snug text-center sm:mb-42 mb-25 contact-text-responsive max-w-full"
    >
      <div id="title-service-1">
        <p className="italic">Architecture</p>
      </div>
      <div id="title-service-2" className="flex items-center justify-center gap-3">
        <p className="font-sans font-bold italic">Development</p>
        <div className="w-10 h-1 md:w-16 bg-[#FFE093]" />
        <p>Scalability</p>
      </div>
      <div id="title-service-3" className="flex items-center justify-center gap-3">
        <p>APIs</p>
        <div className="w-10 h-1 md:w-32 bg-[#FFE093]" />
        <p className="italic font-bold">Creative</p>
        <div className="w-10 h-1 md:w-16 bg-[#FFE093]" />
        <p>Precision</p>
      </div>
      <div id="title-service-4">
        <p>Cinematography</p>
      </div>
    </section>
  );
}
