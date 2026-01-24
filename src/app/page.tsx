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
import { useProgress } from "@react-three/drei";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import Preloader from "@/components/Preloader";
import Lenis from "lenis";

// Mengganti 'any' dengan tipe Lenis yang diimpor
type LenisInstance = Lenis | null | undefined;

function HomeContent() {
  const lenis = useLenis() as LenisInstance;

  // Preloader Logic
  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(false);

  return (
    <>
      {!isReady && (
        <Preloader progress={progress} onComplete={() => setIsReady(true)} />
      )}
      {/* SCROLL PROGRESS BAR */}
      {isReady && <ScrollProgress />}
      <div className="transition-opacity duration-1000 opacity-100">
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
      <BackToTop />
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
