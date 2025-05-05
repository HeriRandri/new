// ProjectCard3D.tsx
import { Html } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ProjectCard3DProps {
  position?: [number, number, number];
}

export default function ProjectCard3D({
  position = [0, 1.5, -3],
}: ProjectCard3DProps) {
  const groupRef = useRef<THREE.Group>(null!);

  // Animation flottante up/down
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t) * 0.1; // léger flottement
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Optionnel : panneau 3D derrière */}
      {/* <mesh>
        <boxGeometry args={[2.5, 1.5, 0.05]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} metalness={0.2} />
      </mesh> */}

      {/* Panneau HTML interactif */}
      <Html center>
        <div
          className="bg-white/90 rounded-2xl shadow-xl p-4 w-60 text-center text-gray-800 hover:scale-105 transition-transform duration-300 cursor-pointer backdrop-blur-sm"
          onClick={() => console.log("Voir plus cliqué")}
        >
          <h3 className="font-bold text-lg mb-1">Mon Projet</h3>
          <p className="text-sm text-gray-600 mb-3">Un projet React + R3F</p>
          <button className="bg-blue-500 text-white px-4 py-1 rounded-md text-sm hover:bg-blue-600 transition">
            Voir plus
          </button>
        </div>
      </Html>
    </group>
  );
}
