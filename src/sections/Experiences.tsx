"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import AnimatedHeaderSection from "@/components/AnimatedHeaderSection";
import { experiences } from "../../constant";

export default function Experiences() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const desktopLineRef = useRef<HTMLDivElement>(null);
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const desktopNodesRef = useRef<(HTMLDivElement | null)[]>([]);

  // Mobile refs
  const mobileLineRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const mobileNodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobileYearRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileContentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const text = `A Journey Through Time and Growth.`;

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();

      // ── Desktop Timeline Animation ───────────────────────────────────────
      mm.add("(min-width: 768px)", () => {
        // 1. Draw central vertical line
        if (desktopLineRef.current && desktopContainerRef.current) {
          gsap.set(desktopLineRef.current, {
            scaleY: 0,
            transformOrigin: "top center",
          });
          gsap.to(desktopLineRef.current, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: desktopContainerRef.current,
              start: "top 45%",
              end: "bottom 55%",
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          });
        }

        // 2. Individual row & node animations
        rowRefs.current.forEach((row, index) => {
          if (!row) return;
          const isRight = index % 2 === 1;
          const node = desktopNodesRef.current[index];

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });

          if (node) {
            tl.fromTo(
              node,
              { scale: 0, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.7)" },
              0,
            );
          }

          tl.fromTo(
            row,
            { opacity: 0, x: isRight ? 40 : -40 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "power2.out",
              force3D: true,
            },
            0.05,
          );
        });
      });

      // ── Mobile Timeline Animation ────────────────────────────────────────
      mm.add("(max-width: 767px)", () => {
        const container = mobileContainerRef.current;
        if (mobileLineRef.current && container) {
          gsap.set(mobileLineRef.current, {
            scaleY: 0,
            transformOrigin: "top center",
          });
          gsap.to(mobileLineRef.current, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top 45%",
              end: "bottom 55%",
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          });
        }

        experiences.forEach((_, index) => {
          const node = mobileNodesRef.current[index];
          const year = mobileYearRefs.current[index];
          const content = mobileContentRefs.current[index];
          if (node && year && content) {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: node,
                start: "top 60%",
                toggleActions: "play none none reverse",
              },
            });
            tl.fromTo(
              node,
              { scale: 0, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.7)" },
            )
              .fromTo(
                year,
                { x: -20, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
                "-=0.2",
              )
              .fromTo(
                content,
                { y: 20, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.45,
                  ease: "power2.out",
                  force3D: true,
                },
                "-=0.3",
              );
          }
        });
      });

      ScrollTrigger.refresh();
      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <section
      id="experiences"
      ref={containerRef}
      className="pt-0 pb-0 min-h-screen bg-white overflow-hidden"
    >
      <AnimatedHeaderSection
        subtitle=""
        title="Experiences"
        text={text}
        textColor="text-black-100"
        titleColor="text-[#2056F7]"
      />

      {/* ── Desktop: Vertical Center-Line Timeline (Alternating Left/Right) ── */}
      <div
        ref={desktopContainerRef}
        className="hidden md:block relative pb-32 px-8 lg:px-14 xl:px-20 max-w-6xl mx-auto"
      >
        {/* Visible Base Line Track */}
        <div className="absolute left-1/2 top-4 bottom-12 w-0.5 bg-black/10 -translate-x-1/2" />
        {/* Animated Progress Line */}
        <div
          ref={desktopLineRef}
          className="absolute left-1/2 top-4 bottom-12 w-0.5 bg-[#2056F7] -translate-x-1/2"
        />

        <div className="flex flex-col gap-14">
          {experiences.map((experience, index) => {
            const isRight = index % 2 === 1;
            return (
              <div
                key={experience.id}
                ref={(el) => {
                  rowRefs.current[index] = el;
                }}
                className={`relative grid grid-cols-2 items-start py-4 ${
                  isRight ? "" : ""
                }`}
              >
                {/* Left Side Container */}
                <div
                  className={`flex flex-col pr-12 lg:pr-16 text-right items-end ${
                    isRight ? "invisible pointer-events-none" : ""
                  }`}
                >
                  {!isRight && (
                    <>
                      {/* Year */}
                      <span className="font-heading font-black text-5xl lg:text-6xl text-[#2056F7] leading-none tracking-tight block mb-3">
                        {experience.year}
                      </span>
                      {/* Title - Regular Font (Non font-heading) */}
                      <h3 className="font-sans font-bold text-2xl lg:text-3xl text-black-100 leading-snug mb-3">
                        {experience.title}
                      </h3>
                      {/* Divider */}
                      <div className="h-0.5 w-14 bg-[#2056F7]/30 mb-4" />
                      {/* Bullet points */}
                      <ul className="space-y-3 flex flex-col items-end">
                        {experience.description.map((point, i) => (
                          <li
                            key={i}
                            className="flex flex-row-reverse gap-3 text-sm lg:text-base text-black-100/75 leading-relaxed font-sans max-w-md lg:max-w-lg"
                          >
                            <span className="text-[#2056F7] mt-1.5 min-w-[7px] h-[7px] rounded-full bg-current opacity-50 shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                {/* Center Timeline Node */}
                <div
                  ref={(el) => {
                    desktopNodesRef.current[index] = el;
                  }}
                  className="absolute left-1/2 top-3 -translate-x-1/2 z-10 flex items-center justify-center"
                >
                  <div className="w-4 h-4 rounded-full bg-[#2056F7] border-[3px] border-white shadow-[0_0_0_2px_#2056F7]" />
                </div>

                {/* Right Side Container */}
                <div
                  className={`flex flex-col pl-12 lg:pl-16 text-left items-start ${
                    !isRight ? "invisible pointer-events-none" : ""
                  }`}
                >
                  {isRight && (
                    <>
                      {/* Year */}
                      <span className="font-heading font-black text-5xl lg:text-6xl text-[#2056F7] leading-none tracking-tight block mb-3">
                        {experience.year}
                      </span>
                      {/* Title - Regular Font (Non font-heading) */}
                      <h3 className="font-sans font-bold text-2xl lg:text-3xl text-black-100 leading-snug mb-3">
                        {experience.title}
                      </h3>
                      {/* Divider */}
                      <div className="h-0.5 w-14 bg-[#2056F7]/30 mb-4" />
                      {/* Bullet points */}
                      <ul className="space-y-3 flex flex-col items-start">
                        {experience.description.map((point, i) => (
                          <li
                            key={i}
                            className="flex flex-row gap-3 text-sm lg:text-base text-black-100/75 leading-relaxed font-sans max-w-md lg:max-w-lg"
                          >
                            <span className="text-[#2056F7] mt-1.5 min-w-[7px] h-[7px] rounded-full bg-current opacity-50 shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Mobile: Left-Side Timeline ─────────────────────────────────── */}
      <div
        id="mobile-timeline-container"
        ref={mobileContainerRef}
        className="md:hidden relative px-6 pb-20 pt-4"
      >
        <div className="absolute left-10 top-6 bottom-16 w-0.5 bg-black/10" />
        <div
          ref={mobileLineRef}
          className="absolute left-10 top-6 bottom-16 w-0.5 bg-[#2056F7] origin-top"
        />

        <div className="space-y-12">
          {experiences.map((experience, index) => (
            <div key={experience.id} className="relative pl-12">
              {/* Node */}
              <div
                ref={(el) => {
                  mobileNodesRef.current[index] = el;
                }}
                className="absolute left-[-13px] top-2 w-2.5 h-2.5 rounded-full bg-[#2056F7] border-4 border-white shadow-[0_0_0_2px_#2056F7]"
              />
              {/* Year */}
              <div
                ref={(el) => {
                  mobileYearRefs.current[index] = el;
                }}
                className="font-heading font-black text-3xl text-[#2056F7] leading-none mb-1"
              >
                {experience.year}
              </div>
              {/* Content */}
              <div
                ref={(el) => {
                  mobileContentRefs.current[index] = el;
                }}
                className="space-y-3"
              >
                <h3 className="text-base font-bold text-black-100 leading-snug font-sans">
                  {experience.title}
                </h3>
                <div className="w-8 h-px bg-[#2056F7]/30" />
                <ul className="space-y-2">
                  {experience.description.map((point, i) => (
                    <li
                      key={i}
                      className="flex gap-2.5 text-sm text-black-100/65 leading-relaxed font-sans"
                    >
                      <span className="text-[#2056F7] mt-1.5 min-w-1.5 h-1.5 rounded-full bg-current opacity-40 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
