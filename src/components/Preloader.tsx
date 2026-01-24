"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

interface PreloaderProps {
  progress: number;
  onComplete: () => void;
}

const images = [
  "/preloader/preloader1.png",
  "/preloader/preloader2.jpeg",
  "/preloader/preloader3.png",
];

export default function Preloader({ progress, onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [visualProgress, setVisualProgress] = useState(false);
  const [displayedProgress, setDisplayedProgress] = useState(0);

  // 1. Minimum Time Logic (5000ms) & Visual Progress
  useEffect(() => {
    // Trigger visual progress bar animation
    const widthTimer = setTimeout(() => setVisualProgress(true), 100);

    // Animate percentage text (0 -> 100 over 4500ms)
    // 4500ms / 100 steps = 45ms per step
    const progressInterval = setInterval(() => {
      setDisplayedProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 45);

    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 5000); // Enforce 5s minimum preloader time

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
      clearTimeout(widthTimer);
    };
  }, []);

  // 2. Scroll Locking & Image Flip Interval
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

  // 3. Load Completion Logic
  useEffect(() => {
    // Wait for BOTH progress 100% AND minimum 5s time
    if (progress === 100 && minTimeElapsed && !hasLoaded) {
      setHasLoaded(true);
    }
  }, [progress, minTimeElapsed, hasLoaded]);

  // 4. Text Flip Animation
  useEffect(() => {
    if (!textRef.current) return;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    tl.to(".char-flip-inner", {
      y: "-100%",
      duration: 0.8,
      stagger: 0.05,
      ease: "power2.inOut",
    });
  }, []);

  // 5. Exit Animation
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
            className="h-full transition-all ease-linear"
            style={{
              width: visualProgress ? "100%" : "0%",
              transitionDuration: hasLoaded ? "0ms" : "4500ms", // Disable transition on exit to prevent "snap back"
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
        {/* PERFORMANCE UPDATE: Using translate instead of clip-path for better performance */}
        <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] z-10 overflow-hidden rounded-xl">
          {images.map((src, i) => {
            const isCurrent = i === currentImageIndex;
            // Logic:
            // If current: z-index 10, translate-y-0.
            // If next: z-index 1, translate-y-full (waiting at bottom)
            // Wait, standard slide up loop needs "Previous" to stay put while "Current" slides UP over it.
            // But if Current is sliding up, Previous must be behind it.
            // Since we cycle, 'Current' acts as the entering image.

            return (
              <div
                key={src}
                className="absolute inset-0 w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] will-change-transform"
                style={{
                  zIndex: isCurrent ? 10 : 0,
                  transform: isCurrent
                    ? "translate3d(0, 0%, 0)"
                    : "translate3d(0, 100%, 0)",
                  transitionDelay: isCurrent ? "0s" : "0.7s", // Wait until covered before resetting
                }}
              >
                <Image
                  src={src}
                  alt="preloader-flip"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 400px" // Optimization
                  quality={75} // Reduced to 75 to handle 10MB+ assets without lag
                />
              </div>
            );
          })}
        </div>

        {/* Overlapping Text Content */}
        <div
          ref={textRef}
          className="z-20 w-full text-center mix-blend-difference pointer-events-none -mt-16 sm:-mt-20 px-4"
        >
          <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl uppercase leading-none tracking-tighter flex flex-wrap justify-center gap-x-3 sm:gap-x-4">
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
          {displayedProgress}%
        </div>
      </div>
    </div>
  );
}
