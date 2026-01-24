"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

interface PreloaderProps {
  progress: number;
  onComplete: () => void;
}

const images = [
  "/images/firaz-linkedin.jpg",
  "/images/event.jpg",
  "/images/bank-digital.jpg",
  "/images/aftermovie-ft.JPG",
  "/images/cas.JPG",
];

export default function Preloader({ progress, onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);

  // 1. Scroll Locking & Image Flip Interval
  useEffect(() => {
    // FORCE HIDE SCROLLBAR & PREVENT SCROLL
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Flip interval
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 800);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // 2. Load Completion Logic
  useEffect(() => {
    if (progress === 100 && !hasLoaded) {
      const timer = setTimeout(() => setHasLoaded(true), 800);
      return () => clearTimeout(timer);
    }
  }, [progress, hasLoaded]);

  // 3. Text Flip Animation
  useEffect(() => {
    if (!textRef.current) return;

    // Select all individual letters
    const letters = textRef.current.querySelectorAll(".char-flip");

    // Simple flip loop
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

    tl.to(".char-flip-inner", {
      y: "-100%",
      duration: 0.8,
      stagger: 0.05,
      ease: "power2.inOut",
    });
  }, []);

  // 4. Exit Animation
  useEffect(() => {
    if (hasLoaded && containerRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          // RESTORE SCROLL
          document.body.style.overflow = "";
          document.documentElement.style.overflow = "";
          onComplete();
        },
      });

      // Collapse progress line
      if (progressLineRef.current) {
        tl.to(progressLineRef.current, {
          width: 0,
          duration: 0.4,
          ease: "power2.in",
        });
      }

      // Hide content
      if (contentRef.current) {
        tl.to(
          contentRef.current,
          { y: -50, opacity: 0, duration: 0.5, ease: "power2.in" },
          "-=0.2",
        );
      }

      // Curtain slide up
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power2.inOut",
      });
    }
  }, [hasLoaded, onComplete]);

  // Helper to split text for animation (Navbar-style Reveal)
  const splitText = (text: string, isOutline = false) => {
    return text.split("").map((char, i) => (
      <span
        key={i}
        className={`inline-block relative overflow-hidden h-[1.1em] ${char === " " ? "w-4 sm:w-6" : ""}`}
      >
        <div className="char-flip-inner transition-transform will-change-transform">
          {/* Primary Character */}
          <span
            className={`block ${isOutline ? "text-transparent [-webkit-text-stroke:1px_#fefff8] opacity-80" : "text-[#fefff8]"}`}
          >
            {char}
          </span>
          {/* Secondary Character (Coming from bottom) */}
          <span
            className={`block absolute top-full left-0 ${isOutline ? "text-transparent [-webkit-text-stroke:1px_#fefff8] opacity-80" : "text-[#fefff8]"}`}
          >
            {char}
          </span>
        </div>
      </span>
    ));
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#000000] text-[#fefff8] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Top Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-[4px] z-50">
        <div className="w-full h-full bg-white/10 overflow-hidden">
          <div
            ref={progressLineRef}
            className="h-full transition-all duration-100 ease-linear"
            style={{
              width: `${progress}%`,
              background:
                "linear-gradient(90deg, #2056f7 0%, #fca311 50%, #2056f7 100%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 2s linear infinite",
              boxShadow:
                "0 0 10px rgba(32, 86, 247, 0.5), 0 0 20px rgba(252, 163, 17, 0.3)",
            }}
          />
        </div>
        <style jsx>{`
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
        `}</style>
      </div>

      <div
        ref={contentRef}
        className="relative flex flex-col items-center justify-center w-full h-full pb-10"
      >
        {/* Central Image Flip Container */}
        {/* Added z-10 to stay BEHIND the text overlap area */}
        <div className="relative w-[280px] h-[350px] sm:w-[320px] sm:h-[400px] md:w-[360px] md:h-[480px] z-10">
          {images.map((src, i) => {
            const isCurrent = i === currentImageIndex;
            return (
              <div
                key={src}
                className="absolute inset-0 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]"
                style={{
                  zIndex: isCurrent ? 10 : 1,
                  clipPath: isCurrent ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
                }}
              >
                <Image
                  src={src}
                  alt="preloader-flip"
                  fill
                  className="object-cover rounded-xl"
                  priority
                />
              </div>
            );
          })}
        </div>

        {/* Overlapping Text Content (Positioned BELOW image with negative margin) */}
        <div
          ref={textRef}
          className="z-20 w-full text-center mix-blend-difference pointer-events-none -mt-16 sm:-mt-20 px-4"
        >
          <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl uppercase leading-none tracking-tighter flex flex-wrap justify-center gap-x-3 sm:gap-x-4">
            {/* Using flex-wrap to ensure it stays somewhat responsive but aims for single line */}
            <span className="flex">{splitText("Firaz")}</span>
            <span className="flex">{splitText("Fulvian", true)}</span>
            <span className="flex">{splitText("Hafiz")}</span>
          </h1>
        </div>

        {/* Tagline below */}
        <div className="mt-8 text-center z-20 mix-blend-difference w-full">
          <p className="font-sans font-light text-[10px] sm:text-xs tracking-[0.3em] uppercase opacity-70">
            Transforming ideas into digital reality
          </p>
        </div>

        {/* Loading Percent */}
        <div className="absolute bottom-10 text-center z-20 mix-blend-difference font-heading">
          {Math.floor(progress)}%
        </div>
      </div>
    </div>
  );
}
