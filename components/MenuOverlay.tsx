"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";

type SectionType = "home" | "about" | "experience" | "contact";

interface MenuOverlayProps {
  setCurrentSection: (section: SectionType) => void;
  currentSection: SectionType;
  onClose: () => void;
}

const menuItems = [
  { id: "about", label: "À Propos" },
  { id: "experience", label: "Expérience" },
  { id: "contact", label: "Contact" },
] as const;

const sectionContent = {
  about: {
    title: "À Propos de Moi",
    description:
      "Je suis un créateur passionné par le développement 3D interactif et les expériences web immersives.",
  },
  experience: [
    {
      title: "Mon Expérience",
      description:
        "3+ ans de développement avec React, Three.js, Next.js, Blender et WebGL.",
    },
    {
      title: "Mon Expérience",
      description:
        "3+ ans de développement avec React, Three.js, Next.js, Blender et WebGL.",
    },

    {
      title: "Mon Expérience",
      description:
        "3+ ans de développement avec React, Three.js, Next.js, Blender et WebGL.",
    },
  ],
  contact: {
    title: "Contactez-moi",
    description: "📧 hrandri30@gmail.com\n📞 +261 38 26 634 29 ",
  },
};

export default function MenuOverlay({
  setCurrentSection,
  currentSection,
  onClose,
}: MenuOverlayProps) {
  const [localSection, setLocalSection] = useState<Exclude<
    SectionType,
    "home"
  > | null>(null);
  const [experienceStep, setExperienceStep] = useState(0);

  const handleMenuItemClick = useCallback(
    (section: Exclude<SectionType, "home">) => {
      setLocalSection(section);
      setCurrentSection(section);
    },
    [setCurrentSection]
  );

  const handleBackClick = useCallback(() => {
    setLocalSection(null);
    setCurrentSection("home");
  }, [setCurrentSection]);

  const handleClose = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentSection("home");
      onClose();
    },
    [setCurrentSection, onClose]
  );

  useEffect(() => {
    if (currentSection !== "home") {
      setLocalSection(currentSection);
    }
  }, [currentSection]);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-black/70 text-white z-50 p-8 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={handleClose}
    >
      <motion.div
        className="w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-2xl p-2 hover:text-yellow-400 transition-colors"
          aria-label="Close menu"
        >
          ✕
        </button>

        {!localSection ? (
          <motion.div
            className="flex flex-col items-center space-y-8"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.h1
              className="text-5xl font-bold mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Bienvenue
            </motion.h1>

            <div className="flex flex-col items-center space-y-6">
              {menuItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleMenuItemClick(item.id)}
                  className={`text-3xl font-medium transition-colors ${
                    currentSection === item.id
                      ? "text-yellow-400"
                      : "hover:text-yellow-400"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={localSection}
              className="flex flex-col items-center text-center max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {Array.isArray(sectionContent[localSection]) ? (
                <>
                  <motion.div
                    key={experienceStep}
                    className="bg-white/10 p-6 rounded-xl shadow-lg mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-3xl font-bold mb-4">
                      {sectionContent[localSection][experienceStep].title}
                    </h2>
                    <p className="text-lg">
                      {sectionContent[localSection][experienceStep].description}
                    </p>
                  </motion.div>

                  <div className="flex gap-4 mb-4">
                    <button
                      onClick={() =>
                        setExperienceStep((prev) => Math.max(prev - 1, 0))
                      }
                      disabled={experienceStep === 0}
                      className="px-4 py-2 bg-white/10 rounded hover:bg-white/20 disabled:opacity-30"
                    >
                      Précédent
                    </button>
                    <button
                      onClick={() =>
                        setExperienceStep((prev) =>
                          Math.min(
                            prev + 1,
                            Array.isArray(sectionContent[localSection])
                              ? sectionContent[localSection].length - 1
                              : 0
                          )
                        )
                      }
                      disabled={
                        experienceStep ===
                        sectionContent[localSection].length - 1
                      }
                      className="px-4 py-2 bg-white/10 rounded hover:bg-white/20 disabled:opacity-30"
                    >
                      Suivant
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-4xl font-bold mb-6">
                    {sectionContent[localSection].title}
                  </h2>
                  <p className="text-xl whitespace-pre-line mb-8">
                    {sectionContent[localSection].description}
                  </p>
                </>
              )}

              <motion.button
                onClick={handleBackClick}
                className="px-6 py-2 border-2 border-white rounded-lg hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Retour au Menu
              </motion.button>
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </motion.div>
  );
}
