"use client";

import { useEffect, useRef } from "react";
import { FaArrowUp } from "react-icons/fa6";

export default function BackToTop() {
  const buttonRef = useRef<HTMLButtonElement>(null);

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
    updateVisibility();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#2056F7] text-white shadow-lg transition-all duration-300 translate-y-16 opacity-0 pointer-events-none hover:scale-110"
    >
      <FaArrowUp size={18} />
    </button>
  );
}
