"use client";
import { createContext, useContext, useState } from "react";
import { MotionConfig, useReducedMotion } from "framer-motion";

const MotionPreference = createContext(false);
export function useMotionPreference() {
  const paused = useContext(MotionPreference);
  const systemReduced = useReducedMotion();
  return paused || systemReduced;
}
export default function MotionProvider({ children }) {
  const [paused, setPaused] = useState(false);
  return <MotionPreference.Provider value={paused}>
    <MotionConfig reducedMotion={paused ? "always" : "user"} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
      <div data-motion-paused={paused ? "true" : undefined}>
        {children}
        <button type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)} className="fixed bottom-3 left-3 z-40 min-h-9 rounded-full border border-white/30 bg-[#090b16] px-3 text-xs text-gray-200">{paused ? "Resume motion" : "Pause motion"}</button>
      </div>
    </MotionConfig>
  </MotionPreference.Provider>;
}
