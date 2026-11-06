"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Planet } from "@/components/Planet";
import { Environment, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "@/components/AnimatedHeaderSection";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface HeroProps {
  startAnimation?: boolean;
}

// Custom Float yang kompatibel dengan frameloop="demand"
function FloatingPlanet({ scale, startAnimation }: { scale: number; startAnimation: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);
  const activeRef = useRef(true);

  useEffect(() => {
    // Hentikan animasi float setelah 14 detik (GSAP planet drop selesai ~12 detik)
    const timer = setTimeout(() => {
      activeRef.current = false;
    }, 14000);
    return () => {
      clearTimeout(timer);
      activeRef.current = false;
    };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current || !activeRef.current) return;
    timeRef.current += delta * 0.5; // speed = 0.5
    // Float behavior: gentle up/down oscillation
    groupRef.current.position.y = Math.sin(timeRef.current) * 0.1;
    groupRef.current.rotation.y = Math.sin(timeRef.current * 0.5) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <Suspense fallback={null}>
        <Planet scale={scale} startAnimation={startAnimation} />
      </Suspense>
    </group>
  );
}

export default function Hero({ startAnimation = true }: HeroProps) {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const text = `Creativity beyond the screen.`;
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(true);

  // Pause Three.js render loop saat preloader berjalan atau saat hero scroll keluar layar
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="flex sm:pb-0 pb-10 flex-col justify-end min-h-screen overflow-hidden"
    >
      <AnimatedHeaderSection
        subtitle="404 No Bugs Found"
        title="Firaz Fulvian Hafiz"
        text={text}
        textColor="text-black-100"
        titleColor="text-[#2056F7]"
      />
      <figure className="absolute inset-0 -z-50 w-full h-screen overflow-hidden">
        <Canvas
          frameloop={startAnimation && isInView ? "always" : "never"}
          shadows={false}
          dpr={[1, 1.5]}
          gl={{ powerPreference: "high-performance", antialias: false }}
          camera={{ position: [0, 0, -10], fov: 17.5, near: 0.1, far: 50 }}
        >
          <ambientLight intensity={0.5} />
          <FloatingPlanet
            scale={isMobile ? 0.7 : 1}
            startAnimation={startAnimation}
          />
          <Environment resolution={128}>
            <group rotation={[-Math.PI / 3, 4, 1]}>
              <Lightformer
                form={"circle"}
                intensity={1.8}
                position={[0, 5, -9]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={1.8}
                position={[0, 3, 1]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={1.8}
                position={[-5, -1, -1]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={1.8}
                position={[10, 1, 0]}
                scale={16}
              />
            </group>
          </Environment>
        </Canvas>
      </figure>
    </section>
  );
}
