"use client";
import { motion } from "framer-motion";

export default function SectionHeader({ subtitle, title, description, className = "" }) {
  return (
    <div className={`text-center mb-20 ${className}`}>
      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, type: "spring" }}
        className="relative inline-block mb-6"
      >
        <motion.span 
          className="text-cyan-400 text-sm font-bold tracking-[0.3em] uppercase inline-block relative"
        >
          {subtitle}
          <motion.div 
            className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-600"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </motion.span>
      </motion.div>
      
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
        className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight"
      >
        {title}
      </motion.h2>
      
      {description && (
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed"
        >
          {description}
        </motion.p>
      )}
      
      <motion.div 
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 1, type: "spring" }}
        className="w-32 h-1 mx-auto mt-10 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)]"
      />
    </div>
  );
}
