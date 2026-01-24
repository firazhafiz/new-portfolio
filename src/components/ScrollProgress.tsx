"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let requestRunning = false;

    const updateProgress = () => {
      if (!progressRef.current) return;

      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      progressRef.current.style.width = `${scrollPercent}%`;
      requestRunning = false;
    };

    const onScroll = () => {
      if (!requestRunning) {
        requestAnimationFrame(updateProgress);
        requestRunning = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="scroll-progress-bar">
      <div
        ref={progressRef}
        className="scroll-progress-fill"
        style={{ width: "0%" }}
      />
    </div>
  );
}
