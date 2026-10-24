"use client";
import { useMotionPreference } from "@/components/effects/MotionProvider";
import { motion } from "framer-motion";
import TextReveal from "../effects/TextReveal";

export default function SectionHeader({ subtitle, title, description, className = "" }) {
  const reducedMotion = useMotionPreference();
  return (
    <div className={`text-center mb-6 md:mb-8 ${className}`}>
      <motion.div 
        initial={false}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, type: "spring" }}
        className="relative inline-block mb-3"
      >
        <motion.span 
          className="text-cyan-400 text-sm font-bold tracking-[0.3em] uppercase inline-block relative"
        >
          <TextReveal text={subtitle} />
          <motion.div 
            className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-600"
            initial={false}
            whileInView={reducedMotion ? undefined : { scaleX: [0, 1] }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </motion.span>
      </motion.div>
      
      <motion.h2 
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight"
      >
        <TextReveal text={title} delay={0.1} />
      </motion.h2>
      
      {description && (
        <motion.p 
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed"
        >
          {description}
        </motion.p>
      )}
      
      <motion.div 
        initial={false}
        whileInView={reducedMotion ? undefined : { scaleX: [0, 1], opacity: [0, 1] }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 1, type: "spring" }}
        className="w-32 h-1 mx-auto mt-4 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)]"
      />
    </div>
  );
}

