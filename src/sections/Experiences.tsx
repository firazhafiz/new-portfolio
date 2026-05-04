"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import AnimatedHeaderSection from "@/components/AnimatedHeaderSection";
import { experiences } from "../../constant";

export default function Experiences() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const yearRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Mobile-specific refs
  const mobileLineRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const mobileNodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobileYearRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileContentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const text = `A Journey Through Time and Growth.`;

  // 🖼️ LOGIC: Prefetching Gambar
  useEffect(() => {
    if (typeof window === "undefined") return;

    experiences.forEach((experience, index) => {
      const link = document.createElement("link");
      link.rel = index < 2 ? "preload" : "prefetch";
      link.as = "image";
      link.href = experience.image;

      if (link.rel === "preload") {
        link.media = "(min-width: 768px)";
      }

      document.head.appendChild(link);
    });
  }, []);

  // ⚙️ GSAP Logic
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();

      // Desktop Animations
      mm.add("(min-width: 768px)", () => {
        sectionRefs.current.forEach((section, index) => {
          if (!section) return;

          const year = yearRefs.current[index];
          const image = imageRefs.current[index];
          const card = cardRefs.current[index];

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "bottom 50%",
              scrub: 0.5,
            },
          });

          if (year) {
            tl.fromTo(
              year,
              { yPercent: 40, opacity: 0.25 },
              {
                yPercent: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power2.out",
                force3D: true,
              },
              0,
            );
          }

          if (image) {
            tl.fromTo(
              image,
              { yPercent: 8, scale: 0.95 },
              {
                yPercent: 0,
                scale: 1,
                duration: 0.5,
                ease: "power2.out",
                force3D: true,
              },
              0,
            );
          }

          if (card) {
            tl.fromTo(
              card,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.45,
                ease: "power2.out",
                force3D: true,
              },
              0.1,
            );
          }
        });
      });

      // Mobile Animations
      mm.add("(max-width: 767px)", () => {
        const container = mobileContainerRef.current;
        
        // 1. Timeline Line Drawing
        if (mobileLineRef.current && container) {
          gsap.fromTo(
            mobileLineRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: container,
                start: "top 60%",
                end: "bottom 80%",
                scrub: 1,
              },
            },
          );
        }

        // 2. Individual Item Reveal
        experiences.forEach((_, index) => {
          const node = mobileNodesRef.current[index];
          const year = mobileYearRefs.current[index];
          const content = mobileContentRefs.current[index];

          if (node && year && content) {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: node,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            });

            tl.fromTo(
              node,
              { scale: 0, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
            ).fromTo(
              year,
              { x: -20, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
              "-=0.2"
            ).fromTo(
              content,
              { y: 30, opacity: 0, scale: 0.95 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.6,
                ease: "power2.out",
                force3D: true,
              },
              "-=0.3"
            );
          }
        });
      });

      // Global refresh to ensure ScrollTrigger calculations are accurate
      ScrollTrigger.refresh();
      
      return () => {
        mm.revert();
      };
    },
    { scope: containerRef },
  );

  return (
    <section
      id="experiences"
      ref={containerRef}
      className="sm:pt-0 pt-0 pb-0 min-h-screen bg-white overflow-hidden"
    >
      <AnimatedHeaderSection
        subtitle=""
        title="Experiences"
        text={text}
        textColor="text-black-100"
        titleColor="text-[#2056F7]"
      />

      {/* Desktop Layout (md:flex) */}
      <div className="hidden md:flex flex-col gap-24 px-10 lg:px-20 pb-24">
        {experiences.map((experience, index) => (
          <div
            key={experience.id}
            ref={(el) => {
              sectionRefs.current[index] = el;
            }}
            className="grid grid-cols-[160px_minmax(0,1fr)] gap-16 items-center"
          >
            {/* Tahun */}
            <div>
              <div
                ref={(el) => {
                  if (el) yearRefs.current[index] = el;
                }}
                className="text-[110px] xl:text-[150px] font-black leading-none text-black-100 will-change-transform"
              >
                {experience.year}
              </div>
            </div>

            {/* Gambar & Card */}
            <div className="relative flex justify-center">
              <div
                ref={(el) => {
                  if (el) imageRefs.current[index] = el;
                }}
                className="relative w-full max-w-[640px] h-[60vh] min-h-[420px] max-h-[560px] overflow-hidden md:rounded-3xl shadow-md border border-black/5 will-change-transform"
              >
                <Image
                  src={experience.image}
                  alt={experience.title}
                  fill
                  sizes="(min-width: 768px) 65vw, 0px"
                  className="object-cover"
                  priority={index < 2}
                  loading={index < 2 ? "eager" : "lazy"}
                  quality={80}
                />
              </div>

              {/* Card Experience */}
              <div
                ref={(el) => {
                  if (el) cardRefs.current[index] = el;
                }}
                className="absolute -right-10 bottom-10 bg-white rounded-3xl shadow-xl border border-black/5 max-w-sm w-[55%] p-6 will-change-transform"
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

      {/* Mobile Layout (Seamless Timeline) */}
      <div
        id="mobile-timeline-container"
        ref={mobileContainerRef}
        className="md:hidden relative px-6 pb-20 pt-4"
      >
        {/* Vertical Line */}
        <div className="absolute left-10 top-0 bottom-0 w-[2px] bg-black/5" />
        <div
          ref={mobileLineRef}
          className="absolute left-10 top-0 bottom-0 w-[2px] bg-[#2056F7] origin-top"
          style={{ transform: "scaleY(0)" }}
        />

        <div className="space-y-16">
          {experiences.map((experience, index) => (
            <div key={experience.id} className="relative pl-12">
              {/* Timeline Node */}
              <div
                ref={(el) => {
                  mobileNodesRef.current[index] = el;
                }}
                className="absolute left-[-13px] top-2 w-[10px] h-[10px] rounded-full bg-[#2056F7] border-4 border-white shadow-[0_0_0_2px_#2056F7]"
              />

              {/* Year */}
              <div
                ref={(el) => {
                  mobileYearRefs.current[index] = el;
                }}
                className="text-4xl font-bold text-black-100 font-heading mb-4"
              >
                {experience.year}
              </div>

              {/* Card Content */}
              <div
                ref={(el) => {
                  mobileContentRefs.current[index] = el;
                }}
                className="space-y-5"
              >
                {/* Image */}
                <div className="relative h-70 w-full rounded-xl overflow-hidden shadow-md border border-black/5">
                  <Image
                    src={experience.image}
                    alt={experience.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority={index < 2}
                    loading={index < 2 ? "eager" : "lazy"}
                    quality={75}
                  />
                </div>

                {/* Info */}
                <div className="space-y-3 px-1">
                  <h3 className="text-2xl font-bold text-black-100 leading-snug">
                    {experience.title}
                  </h3>
                  <div className="w-12 h-[2px] bg-[#2056F7]/30" />
                  <ul className="space-y-3">
                    {experience.description.map((point, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-sm text-black-100/70 leading-relaxed"
                      >
                        <span className="text-[#2056F7] mt-1.5 min-w-[6px] h-[6px] rounded-full bg-current opacity-40 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
