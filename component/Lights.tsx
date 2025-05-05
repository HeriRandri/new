"use client";
import { useRef } from "react";
import { useHelper } from "@react-three/drei";
import * as THREE from "three";

export function Lights() {
  const directionalLightRef = useRef<THREE.DirectionalLight>(null!);

  // Hook autorisé ici car on est dans le Canvas
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1);

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight
        ref={directionalLightRef}
        position={[5, 10, 5]}
        intensity={1}
        castShadow
      />
      <pointLight position={[-2, 3, 2]} intensity={1} color="red" />
      <hemisphereLight
        skyColor={"blue"}
        groundColor={"brown"}
        intensity={0.6}
      />
    </>
  );
}
