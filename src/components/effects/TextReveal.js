"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export default function TextReveal({ text, className = "", delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <span ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="mr-[0.25em] inline-block overflow-hidden">
          <motion.span
            className="inline-block will-change-transform"
            initial={reduceMotion ? false : { y: "65%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : undefined}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
              delay: reduceMotion ? 0 : delay + Math.min(index * 0.035, 0.35),
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
