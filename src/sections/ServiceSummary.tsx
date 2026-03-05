"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ServiceSummary() {
  useGSAP(() => {
    // Batch animations for better performance
    const titles = [
      { id: "#title-service-1", xPercent: -15 },
      { id: "#title-service-2", xPercent: 15 },
      { id: "#title-service-3", xPercent: -25 },
      { id: "#title-service-4", xPercent: 25 },
    ];

    titles.forEach(({ id, xPercent }) => {
      // Set initial position
      gsap.set(id, { xPercent });

      // Animate to center with ScrollTrigger
      gsap.to(id, {
        xPercent: 0,
        force3D: true,
        scrollTrigger: {
          trigger: id,
          scrub: 0.5, // Tighter for mobile
          start: "top 95%",
          end: "bottom 5%",
        },
        ease: "power3.out",
      });
    });
  });

  return (
    <section className=" sm:text-4xl text-lg sm:mt-20  overflow-hidden font-extralight font-sans leading-snug text-center sm:mb-42 mb-25 contact-text-responsive max-w-screen">
      <div id="title-service-1" className="will-change-transform">
        <p className="italic">Architecture</p>
      </div>
      <div
        id="title-service-2"
        className="flex items-center justify-center gap-3 will-change-transform"
      >
        <p className="font-sans font-bold italic">Development</p>
        <div className="w-10 h-1 md:w-16 bg-[#FFE093]" />
        <p>Scalability</p>
      </div>
      <div
        id="title-service-3"
        className="flex items-center justify-center gap-3 will-change-transform"
      >
        <p>APIs</p>
        <div className="w-10 h-1 md:w-32 bg-[#FFE093]" />
        <p className="italic font-bold">Creative</p>
        <div className="w-10 h-1 md:w-16 bg-[#FFE093]" />
        <p>Precision</p>
      </div>
      <div id="title-service-4" className="will-change-transform">
        <p>Cinematography</p>
      </div>
    </section>
  );
}
