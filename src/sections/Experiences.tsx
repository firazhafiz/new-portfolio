"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import AnimatedHeaderSection from "@/components/AnimatedHeaderSection";
import { experiences } from "../../constant";

export default function Experiences() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const yearRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const text = `A Journey Through Time and Growth.`;

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;

    gsap.registerPlugin(ScrollTrigger);

    const timelines: gsap.core.Timeline[] = [];

    sectionRefs.current.forEach((section, index) => {
      if (!section) return;

      const year = yearRefs.current[index];
      const image = imageRefs.current[index];
      const card = cardRefs.current[index];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 50%",
          scrub: true,
        },
      });

      if (year) {
        tl.fromTo(
          year,
          { yPercent: 40, opacity: 0.25 },
          { yPercent: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          0
        );
      }

      if (image) {
        tl.fromTo(
          image,
          { yPercent: 8, scale: 0.95 },
          { yPercent: 0, scale: 1, duration: 0.5, ease: "power2.out" },
          0
        );
      }

      if (card) {
        tl.fromTo(
          card,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
          0.1
        );
      }

      timelines.push(tl);
    });

    return () => {
      timelines.forEach((tl) => tl.kill());
    };
  }, []);

  return (
    <section
      id="experiences"
      className="sm:pt-0 pt-55 pb-0 min-h-screen bg-gray-50"
    >
      <AnimatedHeaderSection
        subtitle=""
        title="Experiences"
        text={text}
        textColor="text-black-100"
        titleColor="text-[#2056F7]"
      />

      {/* Desktop */}
      <div className="hidden md:flex flex-col gap-24 px-10 lg:px-20 pb-24">
        {experiences.map((experience, index) => (
          <div
            key={experience.id}
            ref={(el) => {
              sectionRefs.current[index] = el;
            }}
            className="grid grid-cols-[160px_minmax(0,1fr)] gap-16 items-center"
          >
            <div>
              <div
                ref={(el) => {
                  if (el) yearRefs.current[index] = el;
                }}
                className="text-[110px] xl:text-[150px] font-black leading-none text-black-100"
              >
                {experience.year}
              </div>
            </div>

            <div className="relative flex justify-center">
              <div
                ref={(el) => {
                  if (el) imageRefs.current[index] = el;
                }}
                className="relative w-full max-w-[640px] h-[60vh] min-h-[420px] max-h-[560px] overflow-hidden rounded-[40px] shadow-2xl border border-black/5"
              >
                <Image
                  src={experience.image}
                  alt={experience.title}
                  fill
                  sizes="(min-width: 768px) 65vw, 0px"
                  className="object-cover"
                  priority={index < 2}
                  quality={100}
                />
              </div>

              <div
                ref={(el) => {
                  if (el) cardRefs.current[index] = el;
                }}
                className="absolute -right-10 bottom-10 bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-black/5 max-w-sm w-[55%] p-6"
              >
                <h3 className="text-3xl font-semibold text-black-100 mb-3">
                  {experience.title}
                </h3>
                <ul className="space-y-2 text-black-100/80 text-sm leading-relaxed">
                  {experience.description.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden px-6 pb-10 space-y-12">
        {experiences.map((experience) => (
          <div key={experience.id} className="space-y-4">
            <div className="text-5xl font-bold text-black-100 font-heading">
              {experience.year}
            </div>
            <div className="relative h-70 rounded-3xl overflow-hidden shadow-xl">
              <Image
                src={experience.image}
                alt={experience.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold text-black-100">
                {experience.title}
              </h3>
              <ul className="space-y-2 text-sm text-black-100/80 leading-relaxed">
                {experience.description.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
