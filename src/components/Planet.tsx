import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Define props type (optional, adjust as needed)
type PlanetProps = {
  startAnimation?: boolean;
} & Record<string, unknown>;

// Define type for nodes and materials from useGLTF
type GLTFResult = {
  nodes: {
    Sphere: THREE.Mesh;
    Ring: THREE.Mesh;
    Sphere2: THREE.Mesh;
  };
  materials: {
    "Material.002": THREE.Material;
    "Material.001": THREE.Material;
  };
};

export function Planet({ startAnimation = true, ...props }: PlanetProps) {
  const shapeContainer = useRef<THREE.Group>(null);
  const spheresContainer = useRef<THREE.Group>(null);
  const ringContainer = useRef<THREE.Mesh>(null);
  const { nodes, materials } = useGLTF(
    "/models/Planet.glb",
  ) as unknown as GLTFResult;

  useGSAP(() => {
    const tl = gsap.timeline();

    // Initial state (Hidden at top) if not started
    if (shapeContainer.current && shapeContainer.current.position) {
      if (!startAnimation) {
        gsap.set(shapeContainer.current.position, { y: 6 }); // Set high up initially
      }
    }

    if (startAnimation) {
      // Pengecekan eksplisit sebelum animasi
      if (shapeContainer.current && shapeContainer.current.position) {
        // Animate from 6 to 0 (drop down)
        tl.to(shapeContainer.current.position, {
          y: 0, // Drop to center
          duration: 2.5,
          ease: "power2.out",
        });
      }
    }

    if (spheresContainer.current && spheresContainer.current.rotation) {
      tl.from(
        spheresContainer.current.rotation,
        {
          x: 0,
          y: Math.PI / 2,
          z: -Math.PI / 2,
          duration: 10,
          ease: "power1.inOut",
        },
        "-=25%",
      );
    }

    if (ringContainer.current && ringContainer.current.rotation) {
      tl.from(
        ringContainer.current.rotation,
        {
          x: 0.4,
          y: 0,
          z: 0,
          duration: 10,
          ease: "power1.inOut",
        },
        "<",
      );
    }
  }, [startAnimation]);

  return (
    <group ref={shapeContainer} {...props} dispose={null}>
      <group ref={spheresContainer}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere.geometry as THREE.BufferGeometry}
          material={materials["Material.002"]}
          rotation={[0, 0, 0.741]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere2.geometry as THREE.BufferGeometry}
          material={materials["Material.001"]}
          position={[0.647, 1.03, -0.724]}
          rotation={[0, 0, 0.741]}
          scale={0.223}
        />
      </group>
      <mesh
        ref={ringContainer}
        castShadow
        receiveShadow
        geometry={nodes.Ring.geometry as THREE.BufferGeometry}
        material={materials["Material.001"]}
        rotation={[-0.124, 0.123, -0.778]}
        scale={1.75} // Kurangi dari 2 ke 1.5
      />
    </group>
  );
}

useGLTF.preload("/models/Planet.glb");
