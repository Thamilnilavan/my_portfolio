"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = navItems.map(item => item.href.substring(1));
      let current = "home";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= (element.offsetTop - 200)) {
          current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled 
            ? "py-4 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-[#00D4FF]/20 shadow-[0_0_30px_rgba(0,212,255,0.1)]" 
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <motion.div 
            className="text-3xl font-black tracking-tighter cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <span className="text-white">THA</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#7C3AED] to-[#FFD700] glow-text">MIL</span>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollTo(item.href)}
                className={`relative text-sm font-bold uppercase tracking-wider transition-colors ${
                  activeSection === item.href.substring(1) 
                    ? "text-[#00D4FF]" 
                    : "text-gray-400 hover:text-white"
                }`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {item.name}
                {activeSection === item.href.substring(1) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00D4FF] to-[#7C3AED] rounded-full shadow-[0_0_10px_#00D4FF]"
                  />
                )}
              </motion.button>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <motion.button
            className="md:hidden text-gray-300 p-2 hover:text-[#00D4FF] transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            whileHover={{ scale: 1.1, rotate: 90 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <HiMenuAlt3 size={28} />
          </motion.button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
            className="fixed inset-0 z-50 bg-[#0A0A0A]/98 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            <motion.button
              className="absolute top-6 right-6 text-gray-300 p-2 hover:text-[#00D4FF] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
              whileHover={{ scale: 1.1, rotate: 90 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <HiX size={36} />
            </motion.button>
            <nav className="flex flex-col items-center gap-10">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1, x: 10 }}
                  onClick={() => scrollTo(item.href)}
                  className={`text-3xl font-black uppercase tracking-wider ${
                    activeSection === item.href.substring(1) 
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#7C3AED] to-[#FFD700] glow-text" 
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.name}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
