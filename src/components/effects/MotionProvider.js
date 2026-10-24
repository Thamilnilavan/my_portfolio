"use client";
import { MotionConfig, useReducedMotion } from "framer-motion";

export function useMotionPreference() {
  return useReducedMotion();
}

export default function MotionProvider({ children }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </MotionConfig>
  );
}
