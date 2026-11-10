"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const planetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Verifikasi ketat: Hanya aktif di Laptop / Desktop screen (>= 1024px, hover support, fine pointer / mouse / trackpad)
    // Tablet dan mobile touchscreen otomatis diabaikan
    const checkEligibility = () => {
      if (typeof window === "undefined") return false;
      const isLargeScreen = window.innerWidth >= 1024;
      const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
      const hasHover = window.matchMedia("(hover: hover)").matches;
      return isLargeScreen && hasFinePointer && hasHover;
    };

    const eligible = checkEligibility();
    setIsDesktop(eligible);

    if (!eligible) {
      document.body.classList.remove("custom-cursor-active");
      return;
    }

    const dot = dotRef.current;
    const planet = planetRef.current;
    if (!dot || !planet) return;

    // Set initial transform anchor point to center (-50%, -50%) jauh di luar layar
    gsap.set([dot, planet], {
      xPercent: -50,
      yPercent: -50,
      x: -200,
      y: -200,
      force3D: true,
    });

    // Aktifkan styling cursor-none di body untuk desktop
    document.body.classList.add("custom-cursor-active");

    // GSAP quickTo untuk orbit planet: 120-144 FPS smooth inertia tanpa lag
    const xTo = gsap.quickTo(planet, "x", {
      duration: 0.35,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(planet, "y", {
      duration: 0.35,
      ease: "power3.out",
    });

    let hasMoved = false;

    const onMouseMove = (e: MouseEvent) => {
      // Abaikan simulated mouse event dari tap/touch screen
      if (
        (e as unknown as { sourceCapabilities?: { firesTouchEvents?: boolean } })
          ?.sourceCapabilities?.firesTouchEvents
      ) {
        return;
      }

      if (!checkEligibility()) return;

      const { clientX, clientY } = e;

      // Center dot pointer: instant 0ms response tanpa delay
      gsap.set(dot, {
        x: clientX,
        y: clientY,
        force3D: true,
      });

      // Trailing orbit planet
      xTo(clientX);
      yTo(clientY);

      if (!hasMoved) {
        hasMoved = true;
        setIsVisible(true);
      }
    };

    const onMouseDown = () => setIsPressed(true);
    const onMouseUp = () => setIsPressed(false);

    const onMouseEnter = () => {
      if (checkEligibility()) setIsVisible(true);
    };
    const onMouseLeave = () => setIsVisible(false);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, input, textarea, select, [role="button"], [data-cursor="pointer"], .cursor-pointer, .group'
      );
      setIsHovered(!!interactive);
    };

    const onResize = () => {
      const isEligibleNow = checkEligibility();
      setIsDesktop(isEligibleNow);
      if (!isEligibleNow) {
        setIsVisible(false);
        document.body.classList.remove("custom-cursor-active");
      } else {
        document.body.classList.add("custom-cursor-active");
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", onMouseOver, { passive: true });

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  return (
    <div
      className={`hidden lg:block fixed inset-0 pointer-events-none z-[999999] transition-opacity duration-200 ${
        isVisible && isDesktop ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* ── 1. Planet Body & Saturn Orbital Ring (Smooth Follower) ── */}
      <div
        ref={planetRef}
        className="fixed top-0 left-0 pointer-events-none z-[999998] will-change-transform"
        style={{ opacity: isVisible && isDesktop ? 1 : 0 }}
      >
        <div
          className={`relative flex items-center justify-center transition-all duration-300 ease-out ${
            isPressed
              ? "scale-75"
              : isHovered
              ? "scale-140"
              : "scale-100"
          }`}
          style={{ width: 44, height: 44 }}
        >
          {/* Atmosfer planet / glow aura */}
          <div
            className={`absolute inset-0 rounded-full transition-all duration-300 ${
              isHovered
                ? "bg-[#FFE093]/20 shadow-[0_0_20px_rgba(255,224,147,0.6)]"
                : "bg-[#2056F7]/15 shadow-[0_0_14px_rgba(32,86,247,0.45)]"
            }`}
          />

          {/* Cincin Saturnus 3D Orbit Ring */}
          <div
            className="absolute inset-0 flex items-center justify-center animate-cursor-orbit"
            style={{
              perspective: 600,
            }}
          >
            <div
              className={`w-full h-full rounded-full border-2 border-dashed transition-colors duration-300 ${
                isHovered
                  ? "border-[#FFE093] shadow-[0_0_12px_#FFE093]"
                  : "border-[#2056F7] shadow-[0_0_10px_rgba(32,86,247,0.5)]"
              }`}
              style={{
                transform: "rotateX(70deg) rotateY(-18deg)",
              }}
            />
          </div>

          {/* Cincin Sekunder Berlawanan Arah */}
          <div
            className="absolute w-[80%] h-[80%] rounded-full border border-dotted opacity-50 transition-colors duration-300"
            style={{
              borderColor: isHovered ? "#FFE093" : "#2056F7",
              transform: "rotateX(58deg) rotateY(26deg)",
            }}
          />

          {/* Satelit / Bulan Mikro yang mengorbit */}
          <div className="absolute inset-0 flex items-center justify-center animate-cursor-satellite">
            <span
              className={`block w-2 h-2 rounded-full transition-colors duration-300 ${
                isHovered
                  ? "bg-[#FFE093] shadow-[0_0_8px_#FFE093]"
                  : "bg-[#2056F7] shadow-[0_0_8px_#2056F7] border border-white"
              }`}
              style={{
                transform: "translateY(-22px)",
              }}
            />
          </div>
        </div>
      </div>

      {/* ── 2. Precise Star Core Dot (Instant 0ms Pointer Tip) ── */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[999999] will-change-transform"
        style={{ opacity: isVisible && isDesktop ? 1 : 0 }}
      >
        <div
          className={`rounded-full transition-all duration-150 ${
            isPressed
              ? "w-3 h-3 bg-white shadow-[0_0_12px_#FFE093]"
              : isHovered
              ? "w-2.5 h-2.5 bg-[#FFE093] shadow-[0_0_10px_#FFE093]"
              : "w-2.5 h-2.5 bg-[#2056F7] border-2 border-white shadow-[0_0_8px_rgba(32,86,247,0.9)]"
          }`}
        />
      </div>
    </div>
  );
}
