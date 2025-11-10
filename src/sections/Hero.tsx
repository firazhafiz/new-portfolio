"use client";

import { Canvas } from "@react-three/fiber";
import { Planet } from "@/components/Planet";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "@/components/AnimatedHeaderSection";

export default function Hero() {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const text = `I help developing brands and startups gain an 
        unfair advantage through premium 
        results.`;

  return (
    <section
      id="home"
      className="flex flex-col justify-end min-h-screen overflow-hidden"
    >
      <AnimatedHeaderSection
        subtitle="404 No Bugs Found"
        title="Firaz Fulvian Hafiz"
        text={text}
        textColor="text-black-100"
        titleColor="text-[#2056F7]"
      />
      <figure className="absolute inset-0 -z-50 w-screen h-screen overflow-hidden">
        <Canvas
          shadows
          camera={{ position: [0, 0, -10], fov: 17.5, near: 0.1, far: 50 }}
        >
          <ambientLight intensity={0.5} />
          <Float speed={0.5}>
            <Planet scale={isMobile ? 0.7 : 1} />
          </Float>
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 3, 4, 1]}>
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[0, 5, -9]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[0, 3, 1]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[-5, -1, -1]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
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
