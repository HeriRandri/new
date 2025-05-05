"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, useProgress } from "@react-three/drei";
import { useEffect, useState, useCallback, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Character3D from "./Character3D";
import MenuOverlay from "./MenuOverlay";
import AnimatedText from "@/component/animateText";

type SectionType = "home" | "about" | "experience" | "contact";

function Loader() {
  const { progress } = useProgress();

  return <Html center>{progress.toFixed(1)} % loaded</Html>;
}
export default function HeroScene() {
  const [showIntro, setShowIntro] = useState(true);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  // const [currentAnimation, setCurrentAnimation] = useState("Idle");
  const [currentSection, setCurrentSection] = useState<SectionType>("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleFirstClick = useCallback(() => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
      // setCurrentAnimation("Wave");
      if (!isMenuOpen) {
        // Vérifie si le menu n'est pas déjà ouvert
        setIsMenuOpen(true);
      }
    }
  }, [hasUserInteracted, isMenuOpen]);

  const renderSectionContent = () => {
    switch (currentSection) {
      case "about":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            key="about"
          >
            <h2 className="text-3xl font-bold mb-4">About Me</h2>
            <p className="max-w-lg mx-auto">
              Je suis un développeur passionné par la 3D, React, et l animation
              web ✨
            </p>
          </motion.div>
        );
      case "experience":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            key="experience"
          >
            <h2 className="text-3xl font-bold mb-4">Experience</h2>
            <p className="max-w-lg mx-auto">
              3 ans d expérience en React, Next.js, Blender, et développement 3D
              temps réel 🚀
            </p>
          </motion.div>
        );
      case "contact":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            key="contact"
          >
            <h2 className="text-3xl font-bold mb-4">Contact</h2>
            <p className="max-w-lg mx-auto">
              Envoyez-moi un email à{" "}
              <a href="mailto:tonemail@example.com" className="underline">
                tonemail@example.com
              </a>{" "}
              📩
            </p>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="w-full h-screen relative overflow-hidden"
      onClick={handleFirstClick}
      role="button"
      aria-label="Scene container"
    >
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black z-50"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            key="intro-overlay"
          >
            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 1 }}
              className="text-white text-5xl font-bold"
            >
              Nandrianina Heriniaina
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {!showIntro && (
        <>
          <AnimatedText />
          <Canvas
            shadows
            camera={{ position: [0, 2, 10], fov: 50 }}
            dpr={[1, 2]}
            performance={{ min: 0.5 }}
          >
            {/* <ScrollControls pages={3} damping={0.25}> */}
            <ambientLight intensity={0.5} />
            <directionalLight
              position={[5, 10, 5]}
              intensity={1.2}
              castShadow
            />
            <OrbitControls enableZoom={false} />
            {/* {currentSection === "home" && ( */}
            <Suspense fallback={<Loader />}>
              <Character3D />
            </Suspense>
            {/* // )} */}
            {/* </ScrollControls> */}
          </Canvas>

          <button
            onClick={toggleMenu}
            className="fixed top-4 right-4 z-40 p-2 text-white bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <MenuOverlay
                onClose={toggleMenu}
                setCurrentSection={setCurrentSection}
                currentSection={currentSection}
              />
            )}
          </AnimatePresence>

          <div className="absolute bottom-10 w-full text-center text-white z-40 px-4">
            <AnimatePresence mode="wait">
              {renderSectionContent()}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
}
