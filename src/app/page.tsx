"use client";

import ServiceSummary from "@/sections/ServiceSummary";
import Navbar from "@/sections/Navbar";
import Services from "@/sections/Services";
import ReactLenis, { useLenis } from "lenis/react";
import About from "@/sections/About";
import Projects from "@/sections/Projects";
import Experiences from "@/sections/Experiences";
import Certifications from "@/sections/Certifications";
import Contact from "@/sections/Contact";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { useProgress } from "@react-three/drei";
// Import tipe Lenis dari 'lenis/index' atau 'lenis'
import Lenis from "lenis";

// Mengganti 'any' dengan tipe Lenis yang diimpor
type LenisInstance = Lenis | null | undefined;

function HomeContent() {
  const [showBackToTop, setShowBackToTop] = useState(false); // useLenis() mengembalikan Lenis | null, jadi casting 'as LenisInstance' sudah aman // atau langsung biarkan useLenis() mengembalikan tipenya. // Tapi karena LenisInstance sudah didefinisikan, kita pertahankan:
  const lenis = useLenis() as LenisInstance;

  useEffect(() => {
    const handleScroll = () => {
      // Menggunakan window.scrollY karena lenis mengontrol scroll root
      setShowBackToTop(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      setIsReady(true);
    }
  }, [progress]);

  return (
    <>
      {!isReady && (
        <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-gray-900 text-gray-100 transition-opacity duration-700 font-light">
          <p className="mb-4 text-xl tracking-widest animate-pulse">
            Loading {Math.floor(progress)}%
          </p>
          <div className="relative h-1 overflow-hidden rounded w-60 bg-white/70">
            <div
              className="absolute top-0 left-0 h-full transition-all duration-300 bg-gray-100"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      <div
        className={`${
          isReady ? "opacity-100" : "opacity-0"
        } transition-opacity duration-1000`}
      >
        <div className="overflow-hidden bg-gray-50">
          <div id="home">
            <Navbar lenis={lenis} />
          </div>
          <ServiceSummary />
        </div>
        <Services />
        <About />
        <Projects />
        <Experiences />
        <Certifications />
        <Contact />
      </div>
      {/* BACK TO TOP BUTTON */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full bg-navy text-white shadow-2xl transition-all duration-500 ${
          showBackToTop
            ? "translate-y-0 opacity-100"
            : "translate-y-16 opacity-0 pointer-events-none"
        } hover:bg-[#1a45d6] hover:scale-110`}
        aria-label="Back to top"
      >
        <FaArrowUp className="w-4 h-4" />
      </button>
    </>
  );
}

export default function Home() {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 2,
        smoothWheel: true,
      }}
    >
      <HomeContent />
    </ReactLenis>
  );
}
