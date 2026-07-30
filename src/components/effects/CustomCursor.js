"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const dotX = useSpring(pointerX, { stiffness: 850, damping: 48, mass: 0.18 });
  const dotY = useSpring(pointerY, { stiffness: 850, damping: 48, mass: 0.18 });
  const ringX = useSpring(pointerX, { stiffness: 320, damping: 32, mass: 0.35 });
  const ringY = useSpring(pointerY, { stiffness: 320, damping: 32, mass: 0.35 });
  const [isHovering, setIsHovering] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return undefined;

    const updatePointer = (event) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    };
    const updateHover = (event) => {
      setIsHovering(Boolean(event.target.closest("a, button, input, textarea, select, [role='button']")));
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });
    document.addEventListener("pointerover", updateHover, { passive: true });
    return () => {
      window.removeEventListener("pointermove", updatePointer);
      document.removeEventListener("pointerover", updateHover);
    };
  }, [pointerX, pointerY, reduceMotion]);

  if (reduceMotion) return null;

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-[100] hidden h-3.5 w-3.5 rounded-full bg-cyan-300 pointer-events-none mix-blend-difference md:block will-change-transform"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: isHovering ? 1.75 : 1 }}
        transition={{ type: "spring", stiffness: 520, damping: 28 }}
      />
      <motion.div
        className="fixed left-0 top-0 z-[99] hidden h-9 w-9 rounded-full border border-purple-400/80 pointer-events-none md:block will-change-transform"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: isHovering ? 1.45 : 1, opacity: isHovering ? 0.35 : 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </>
  );
}
