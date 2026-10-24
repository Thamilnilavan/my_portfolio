"use client";
import { forwardRef, useId } from "react";
import { motion } from "framer-motion";

const Input = forwardRef(({ label, type = "text", error, className = "", ...props }, ref) => {
  const generatedId = useId();
  const inputId = props.id || generatedId;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className={`relative ${className}`}>
      {label && (
        <motion.label 
          htmlFor={inputId}
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          className="block text-sm font-semibold text-gray-300 mb-3 transition-colors"
        >
          {label}{props.required && <span> (required)</span>}
        </motion.label>
      )}
      <motion.div
        initial={false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative group"
      >
        {type === "textarea" ? (
          <textarea
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={errorId}
            className="w-full glass bg-transparent rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 resize-none min-h-[140px] hover:bg-white/5 focus:bg-white/10"
            {...props}
          />
        ) : (
          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={errorId}
            type={type}
            className="w-full glass bg-transparent rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 hover:bg-white/5 focus:bg-white/10"
            {...props}
          />
        )}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-cyan-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none" />
      </motion.div>
      {error && (
        <motion.span 
          id={errorId}
          initial={false}
          animate={{ opacity: 1, x: 0 }}
          className="text-red-400 text-sm mt-2 block font-medium"
        >
          {error}
        </motion.span>
      )}
    </div>
  );
});

Input.displayName = "Input";
export default Input;
