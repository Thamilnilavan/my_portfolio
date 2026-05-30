"use client";
import { useMousePosition } from "@/hooks/useMousePosition";
import { motion } from "framer-motion";

export default function MouseGlow() {
  const { x, y } = useMousePosition();

  if (x === null || y === null) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden md:block"
      animate={{
        background: `radial-gradient(800px circle at ${x}px ${y}px, rgba(0, 212, 255, 0.12), rgba(124, 58, 237, 0.08), transparent 50%)`,
      }}
    />
  );
}
