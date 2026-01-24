"use client";

import { useEffect, useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";
import Lenis from "lenis";
import { useLenis } from "lenis/react";

type LenisInstance = Lenis | null | undefined;

export default function BackToTop() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const lenis = useLenis() as LenisInstance;

  useEffect(() => {
    let requestRunning = false;

    const updateVisibility = () => {
      if (!buttonRef.current) return;

      const scrollY = window.scrollY;
      const isVisible = scrollY > 600;

      if (isVisible) {
        buttonRef.current.classList.remove(
          "translate-y-16",
          "opacity-0",
          "pointer-events-none",
        );
        buttonRef.current.classList.add("translate-y-0", "opacity-100");
      } else {
        buttonRef.current.classList.add(
          "translate-y-16",
          "opacity-0",
          "pointer-events-none",
        );
        buttonRef.current.classList.remove("translate-y-0", "opacity-100");
      }

      requestRunning = false;
    };

    const onScroll = () => {
      if (!requestRunning) {
        requestAnimationFrame(updateVisibility);
        requestRunning = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Run once on mount
    updateVisibility();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 3,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-navy text-white shadow-2xl transition-all duration-500 translate-y-16 opacity-0 pointer-events-none hover:bg-[#1a45d6] hover:scale-110"
      aria-label="Back to top"
    >
      <FaArrowUp className="w-4 h-4" />
    </button>
  );
}
