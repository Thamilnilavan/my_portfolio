"use client";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 48, scale: 0.985, filter: "blur(8px)" },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function SectionTransition({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8% 0px", amount: 0.08 }}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
