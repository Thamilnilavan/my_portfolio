"use client";
import { forwardRef } from "react";
import { motion } from "framer-motion";

const Button = forwardRef(({ children, variant = "gradient", className = "", ...props }, ref) => {
  const baseStyles = "relative inline-flex items-center justify-center px-8 py-3.5 rounded-2xl font-semibold transition-all duration-300 overflow-hidden group";
  
  const variants = {
    gradient: "bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white hover:shadow-[0_0_40px_rgba(6,182,212,0.4),0_0_80px_rgba(168,85,247,0.3)] border-none transform hover:scale-105 active:scale-95",
    glass: "glass text-white hover:bg-white/15 hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transform hover:scale-105 active:scale-95",
    ghost: "text-gray-400 hover:text-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transform hover:scale-105 active:scale-95",
    outline: "border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transform hover:scale-105 active:scale-95",
    primary: "bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] transform hover:scale-105 active:scale-95",
    secondary: "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transform hover:scale-105 active:scale-95"
  };

  return (
    <motion.button
      ref={ref}
      type={props.type || "button"}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === "gradient" && (
        <>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 transition-opacity duration-700 z-0" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 z-10" />
        </>
      )}
      {(variant === "primary" || variant === "secondary") && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 z-10" />
      )}
    </motion.button>
  );
});

Button.displayName = "Button";
export default Button;
