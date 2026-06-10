"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface PreloaderProps {
  progress: number;
  onComplete: () => void;
  onHalfway?: () => void;
}

const images = [
  "/preloader/preloader1.png",
  "/preloader/preloader2.jpeg",
  "/preloader/preloader3.png",
];

export default function Preloader({
  progress,
  onComplete,
  onHalfway,
}: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isWindowLoaded, setIsWindowLoaded] = useState(false);
  const [displayedProgress, setDisplayedProgress] = useState(0);
  const progressObjRef = useRef({ value: 0 });

  // 1. Listen for window load
  useEffect(() => {
    if (document.readyState === "complete") {
      setIsWindowLoaded(true);
    } else {
      const handleLoad = () => setIsWindowLoaded(true);
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  // 2. Initial Progress Animation (runs once)
  useGSAP(
    () => {
      const progressObj = progressObjRef.current;

      // Initial fast progress to 85%
      const tl = gsap.timeline({
        onUpdate: () => {
          const val = Math.floor(progressObj.value);
          setDisplayedProgress(val);
          if (progressLineRef.current) {
            gsap.set(progressLineRef.current, { width: val + "%" });
          }
        },
      });

      tl.to(progressObj, {
        value: 85,
        duration: 2,
        ease: "power2.out",
      });
    },
    { scope: containerRef },
  );

  // 3. Watch for completion conditions
  useEffect(() => {
    // Only proceed if both conditions are met and we haven't already loaded
    if (progress >= 100 && isWindowLoaded && !hasLoaded && displayedProgress < 100) {
      const progressObj = progressObjRef.current;
      
      // Kill any existing animations on progressObj
      gsap.killTweensOf(progressObj);

      // Animate to 100%
      gsap.to(progressObj, {
        value: 100,
        duration: 0.6,
        ease: "power2.out",
        onUpdate: () => {
          const val = Math.floor(progressObj.value);
          setDisplayedProgress(val);
          if (progressLineRef.current) {
            gsap.set(progressLineRef.current, { width: val + "%" });
          }
        },
        onComplete: () => {
          setHasLoaded(true);
        },
      });
    }
  }, [progress, isWindowLoaded, hasLoaded, displayedProgress]);

  // 4. Trigger onHalfway at 92%
  useGSAP(
    () => {
      if (displayedProgress >= 92 && onHalfway) {
        onHalfway();
      }
    },
    { dependencies: [displayedProgress, onHalfway], scope: containerRef },
  );

  // 5. Scroll Locking & Image Flip Interval
  useGSAP(
    () => {
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
    },
    { scope: containerRef },
  );

  // 6. Text Flip Animation
  useGSAP(
    () => {
      // Select all individual letters
      const letters = textRef.current?.querySelectorAll(".char-flip-inner");
      if (!letters) return;

      // Individual loop for each character (Continuous Wave)
      letters.forEach((char, i) => {
        // Use fromTo to ensure proper reset without depending on previous state
        gsap.fromTo(
          char,
          { yPercent: 0 },
          {
            yPercent: -100,
            duration: 0.6,
            ease: "power3.inOut",
            repeat: -1,
            repeatDelay: 0.5, // Shorter delay per char for continuous flow
            delay: i * 0.05, // Stagger start
            force3D: true,
          },
        );
      });
    },
    { scope: containerRef },
  );

  // 7. Exit Animation
  useGSAP(() => {
    if (hasLoaded && containerRef.current) {
      // Kill all ongoing animations first to prevent conflicts
      gsap.killTweensOf(".char-flip-inner");

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
          duration: 0.3,
          ease: "power2.in",
          force3D: true,
        });
      }

      // Fade content (removed y transform to prevent layout thrashing)
      if (contentRef.current) {
        tl.to(
          contentRef.current,
          {
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
            force3D: true,
          },
          "-=0.15",
        );
      }

      // Curtain slide up (refined timing)
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power3.inOut",
        force3D: true,
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
        <div className="char-flip-inner will-change-transform">
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
      className="fixed inset-0 z-9999 bg-black text-[#fefff8] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Top Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-[4px] z-50">
        <div className="w-full h-full bg-white/10 overflow-hidden">
          <div
            ref={progressLineRef}
            className="h-full"
            style={{
              width: "0%",
              // No longer need transitionDuration here as GSAP drives width
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
            // Stack & Cover Logic:
            // Active: Z-20, Translate 0 (Visible)
            // Prev: Z-10, Translate 0 (Waiting to be covered)
            // Next: Z-0, Translate 100% (Waiting at bottom)

            const isActive = i === currentImageIndex;
            const isPrev =
              i === (currentImageIndex - 1 + images.length) % images.length;

            let zIndex = 0;
            let transform = "translate3d(0, 100%, 0)"; // Default: at bottom
            let transition = "0s"; // Instant reset

            if (isActive) {
              zIndex = 20;
              transform = "translate3d(0, 0%, 0)"; // Slide Up
              transition = "transform 0.8s cubic-bezier(0.77, 0, 0.175, 1)";
            } else if (isPrev) {
              zIndex = 10;
              transform = "translate3d(0, 0%, 0)"; // Stay put (covered)
              transition = "transform 0s"; // No movement
            }

            return (
              <div
                key={src}
                className="absolute inset-0 w-full h-full will-change-transform"
                style={{
                  zIndex,
                  transform,
                  transition,
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
