"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  useGLTF,
  useAnimations,
  ScrollControls,
  useScroll,
} from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Group } from "three";

import AnimatedText from "./animateText";
import ProjetsFloatingPanel from "./ProjetsFloatingPanel";

useGLTF.preload("/glb/Untitled.glb");

function Character3D() {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF("/glb/Untitled.glb");
  const { actions } = useAnimations(animations, scene);
  const scroll = useScroll();

  useEffect(() => {
    if (actions["Experiment"]) {
      actions["Experiment"].play().paused = true;
    }
  }, [actions]);

  useFrame(() => {
    if (actions["Experiment"]) {
      actions["Experiment"].time =
        (actions["Experiment"].getClip().duration * scroll.offset) / 1;
    }
  });

  return <primitive object={scene} ref={group} />;
}

function ScrollScene() {
  return (
    <>
      {/* Lumières */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />

      {/* Contrôle caméra */}
      <OrbitControls />

      {/* Ton modèle animé */}
      <Character3D />

      {/* Ombre au sol */}
      <ContactShadows
        position={[0, -1.2, 0]}
        opacity={0.5}
        scale={10}
        blur={2}
        far={5}
      />

      {/* Environnement HDRI */}
      <Environment files="/hdri/brown_photostudio_02_4k.exr" background />
      <ProjetsFloatingPanel />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-screen">
      <AnimatedText />
      <Canvas shadows camera={{ position: [0, 2, 10], fov: 50 }}>
        {/* ScrollControls ajoute un système de scroll synchronisé */}
        <ScrollControls pages={3} damping={0.25}>
          <ScrollScene />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
