"use client";

import ServiceSummary from "@/sections/ServiceSummary";
import Navbar from "@/sections/Navbar";
import Services from "@/sections/Services";
import About from "@/sections/About";
import Projects from "@/sections/Projects";
import Experiences from "@/sections/Experiences";
import Certifications from "@/sections/Certifications";
import Contact from "@/sections/Contact";
import { useState } from "react";
import { useProgress } from "@react-three/drei";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import Preloader from "@/components/Preloader";

export default function Home() {
  const { progress } = useProgress();
  const [isReady, setIsReady] = useState(false);

  return (
    <>
      {!isReady && (
        <Preloader progress={progress} onComplete={() => setIsReady(true)} />
      )}
      {/* SCROLL PROGRESS BAR */}
      {isReady && <ScrollProgress />}
      <div
        className={`transition-opacity duration-1000 ${isReady ? "opacity-100" : "opacity-0"}`}
      >
        <div className="overflow-hidden bg-gray-50">
          <div id="home">
            <Navbar startAnimation={isReady} />
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
