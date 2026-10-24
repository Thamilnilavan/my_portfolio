"use client";
import { IconContext } from "react-icons";
import { MotionConfig, useReducedMotion } from "framer-motion";

export function useMotionPreference() {
  return useReducedMotion();
}

export default function MotionProvider({ children }) {
  return (
    <IconContext.Provider value={{ attr: { "aria-hidden": "true", focusable: "false" } }}>
    <MotionConfig reducedMotion="user" transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </MotionConfig>
    </IconContext.Provider>
  );
}
