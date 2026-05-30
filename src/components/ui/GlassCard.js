"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function GlassCard({ children, className = "", tilt = true, ...props }) {
  const ref = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!tilt || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 20;
    const y = -(e.clientY - top - height / 2) / 20;
    setRotateX(y);
    setRotateY(x);
    setMousePosition({
      x: ((e.clientX - left) / width) * 100,
      y: ((e.clientY - top) / height) * 100
    });
  };

  const handleMouseLeave = () => {
    if (!tilt) return;
    setRotateX(0);
    setRotateY(0);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{ perspective: 1000 }}
      className={`glass relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:bg-[var(--bg-card-hover)] hover:border-[#00D4FF]/30 group ${className}`}
      {...props}
    >
      {/* Dynamic glow effect that follows mouse */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 212, 255, 0.15) 0%, transparent 50%)`
        }}
      />
      {/* Secondary glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${100-mousePosition.x}% ${100-mousePosition.y}%, rgba(124, 58, 237, 0.1) 0%, transparent 50%)`
        }}
      />
      {/* Top gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      {/* Border glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 20px rgba(0, 212, 255, 0.1), inset 0 0 40px rgba(124, 58, 237, 0.05)`
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
