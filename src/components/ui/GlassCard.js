"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function GlassCard({ children, className = "", tilt = true, ...props }) {
  const ref = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!tilt || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = -(e.clientY - top - height / 2) / 25;
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
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      animate={{ rotateX, rotateY, scale: isHovered ? 1.02 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      className={`glass relative overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:bg-[var(--bg-card-hover)] hover:border-[#00D4FF]/40 group ${className}`}
      {...props}
    >
      {/* Dynamic glow effect that follows mouse */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 212, 255, 0.2) 0%, transparent 60%)`,
          opacity: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      />
      {/* Secondary glow */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${100-mousePosition.x}% ${100-mousePosition.y}%, rgba(124, 58, 237, 0.15) 0%, transparent 60%)`,
          opacity: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.4 }}
      />
      {/* Top gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-white/8 to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      {/* Animated border glow */}
      <motion.div 
        className="absolute inset-0 rounded-3xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          boxShadow: isHovered 
            ? `inset 0 0 30px rgba(0, 212, 255, 0.15), inset 0 0 60px rgba(124, 58, 237, 0.1), 0 0 30px rgba(0, 212, 255, 0.2)` 
            : "none"
        }}
        transition={{ duration: 0.4 }}
      />
      {/* Shimmer effect */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? "100%" : "-100%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)"
        }}
      />
      <div className="relative z-10 h-full" style={{ transformStyle: "preserve-3d" }}>{children}</div>
    </motion.div>
  );
}

