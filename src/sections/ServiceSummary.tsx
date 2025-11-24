"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ServiceSummary() {
  useGSAP(() => {
    // Tetapkan posisi awal yang menyebar dengan jarak lebih kecil
    gsap.set("#title-service-1", { xPercent: -15 }); // Mulai dari kiri, lebih dekat
    gsap.set("#title-service-2", { xPercent: 15 }); // Mulai dari kanan, lebih dekat
    gsap.set("#title-service-3", { xPercent: -25 }); // Mulai dari kiri, sedikit lebih jauh
    gsap.set("#title-service-4", { xPercent: 25 }); // Mulai dari kanan, sedikit lebih jauh

    // Animasi ke posisi ngumpul (xPercent: 0) dengan easing halus
    gsap.to("#title-service-1", {
      xPercent: 0,
      scrollTrigger: {
        trigger: "#title-service-1",
        scrub: 0.5,
        start: "top 80%",
        end: "bottom 20%",
      },
      ease: "power3.out",
    });

    gsap.to("#title-service-2", {
      xPercent: 0,
      scrollTrigger: {
        trigger: "#title-service-2",
        scrub: 0.5,
        start: "top 80%",
        end: "bottom 20%",
      },
      ease: "power3.out",
    });

    gsap.to("#title-service-3", {
      xPercent: 0,
      scrollTrigger: {
        trigger: "#title-service-3",
        scrub: 0.5,
        start: "top 80%",
        end: "bottom 20%",
      },
      ease: "power3.out",
    });

    gsap.to("#title-service-4", {
      xPercent: 0,
      scrollTrigger: {
        trigger: "#title-service-4",
        scrub: 0.5,
        start: "top 80%",
        end: "bottom 20%",
      },
      ease: "power3.out",
    });
  });

  return (
    <section className="bg-gray-50 sm:text-4xl text-lg sm:mt-20  overflow-hidden font-extralight font-sans leading-snug text-center sm:mb-42 mb-25 contact-text-responsive max-w-screen">
      <div id="title-service-1">
        <p className="italic">Architecture</p>
      </div>
      <div
        id="title-service-2"
        className="flex items-center justify-center gap-3"
      >
        <p className="font-sans font-bold italic">Development</p>
        <div className="w-10 h-1 md:w-16 bg-[#FFE093]" />
        <p>Scalability</p>
      </div>
      <div
        id="title-service-3"
        className="flex items-center justify-center gap-3"
      >
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
