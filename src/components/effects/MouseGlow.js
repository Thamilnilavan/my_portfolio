"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

export default function MouseGlow() {
  const pointerX = useMotionValue(-1000);
  const pointerY = useMotionValue(-1000);
  const x = useSpring(pointerX, { stiffness: 110, damping: 28, mass: 0.7 });
  const y = useSpring(pointerY, { stiffness: 110, damping: 28, mass: 0.7 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return undefined;
    const updatePointer = (event) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    };
    window.addEventListener("pointermove", updatePointer, { passive: true });
    return () => window.removeEventListener("pointermove", updatePointer);
  }, [pointerX, pointerY, reduceMotion]);

  if (reduceMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-30 hidden h-[700px] w-[700px] rounded-full opacity-70 md:block will-change-transform"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        background: "radial-gradient(circle, rgba(0,212,255,0.10), rgba(124,58,237,0.06) 34%, transparent 68%)",
      }}
    />
  );
}
