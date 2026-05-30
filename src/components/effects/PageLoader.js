"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("INITIALIZING");

  const loadingSteps = [
    "INITIALIZING",
    "LOADING ASSETS",
    "COMPONENTS",
    "OPTIMIZING",
    "READY"
  ];

  useEffect(() => {
    // Simulate loading with game-style progression
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setIsLoading(false), 800);
    }, 2500);

    // Animate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 15;
      });
    }, 100);

    // Update loading text based on progress
    const textInterval = setInterval(() => {
      setProgress(prev => {
        const stepIndex = Math.min(Math.floor(prev / 25), loadingSteps.length - 1);
        setLoadingText(loadingSteps[stepIndex]);
        return prev;
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Animated background grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              animation: 'gridMove 20s linear infinite'
            }} />
          </div>

          {/* Glowing orbs */}
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-[#00D4FF]/20 blur-3xl"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ filter: "blur(100px)" }}
          />
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-[#7C3AED]/20 blur-3xl"
            animate={{
              scale: [1.5, 1, 1.5],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ filter: "blur(100px)" }}
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Logo/Name */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-12"
            >
              <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#7C3AED] to-[#FFD700] tracking-tighter">
                THAMILNILAVAN
              </h1>
              <motion.div
                className="h-1 bg-gradient-to-r from-[#00D4FF] via-[#7C3AED] to-[#FFD700] mt-4"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </motion.div>

            {/* Progress bar container */}
            <div className="w-80 md:w-96 relative">
              {/* Outer glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] via-[#7C3AED] to-[#FFD700] rounded-full blur-md opacity-50" />
              
              {/* Progress bar */}
              <div className="relative h-3 bg-[#0A0A0A] rounded-full overflow-hidden border border-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00D4FF] via-[#7C3AED] to-[#FFD700] relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                >
                  {/* Animated shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Percentage and loading text */}
            <div className="mt-8 flex items-center gap-8">
              <motion.div
                className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#7C3AED]"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                {Math.floor(progress)}%
              </motion.div>
              <motion.div
                className="text-sm md:text-base font-mono text-[#00D4FF] tracking-widest"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                {loadingText}
              </motion.div>
            </div>

            {/* Loading dots */}
            <motion.div className="flex gap-2 mt-6">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-[#FFD700]"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#00D4FF]/30" />
          <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-[#7C3AED]/30" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-[#FFD700]/30" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#00D4FF]/30" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}  