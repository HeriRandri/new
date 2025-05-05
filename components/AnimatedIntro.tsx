"use client";

import { motion } from "framer-motion";

export default function AnimatedIntro() {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.2, opacity: 0 }}
        transition={{ duration: 1 }}
        className="text-white text-5xl font-bold"
      >
        Ton Nom Ici
      </motion.h1>
    </motion.div>
  );
}
