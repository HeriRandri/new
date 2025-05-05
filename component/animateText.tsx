"use client";

import React from "react";
import { motion } from "framer-motion";
import { i } from "framer-motion/client";

export default function AnimatedText() {
  return (
    <motion.div
      className="absolute top-10 left-10 z-20 text-white w-full flex justify-between items-center px-6"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
    >
      {/* Texte principal */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl font-bold">Nandrianina Heriniana</h1>
        <p className="text-xl">Développeur Fullstack • IA • 3D Web</p>
      </div>

      {/* Navbar animée */}
    </motion.div>
  );
}
