"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiSearch, HiX } from "react-icons/hi";
import { openCommandPalette } from "../effects/CommandPalette";

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
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled 
            ? "py-3 bg-[#050508]/95 backdrop-blur-2xl border-b border-[#00D4FF]/30 shadow-[0_0_40px_rgba(0,212,255,0.15)]" 
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <motion.button
            type="button"
            aria-label="Scroll to the top"
            className="text-3xl font-black tracking-tighter cursor-pointer relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400 }}
            onClick={handleLogoClick}
          >
            <span className="text-white">THA</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#7C3AED] to-[#FFD700] glow-text">MIL</span>
            <motion.div 
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00D4FF] to-[#7C3AED] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
            />
          </motion.button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-3">
          <nav className="flex items-center gap-2">
            {navItems.map((item, index) => (
              <motion.button
                type="button"
                aria-current={activeSection === item.href.substring(1) ? "page" : undefined}
                key={item.name}
                onClick={() => scrollTo(item.href)}
                className={`relative px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-xl ${
                  activeSection === item.href.substring(1) 
                    ? "text-[#00D4FF] bg-[#00D4FF]/10" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
              >
                {item.name}
                {activeSection === item.href.substring(1) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-gradient-to-r from-[#00D4FF]/20 to-[#7C3AED]/20 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>
            <motion.button
              type="button"
              onClick={openCommandPalette}
              aria-label="Open quick navigation"
              className="ml-2 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-gray-400 transition hover:border-[#00D4FF]/30 hover:text-white"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              <HiSearch size={16} />
              <span>Quick access</span>
              <kbd className="rounded-md border border-white/10 bg-black/20 px-1.5 py-0.5 text-[10px] text-gray-500">Ctrl K</kbd>
            </motion.button>
          </div>

          {/* Mobile Toggle */}
          <motion.button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            className="md:hidden text-gray-300 p-3 hover:text-[#00D4FF] transition-colors rounded-xl hover:bg-white/5"
            onClick={() => setMobileMenuOpen(true)}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <HiMenuAlt3 size={28} />
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
            className="fixed inset-0 z-50 bg-[#050508]/98 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            <motion.button
              type="button"
              aria-label="Close navigation menu"
              className="absolute top-6 right-6 text-gray-300 p-3 hover:text-[#00D4FF] transition-colors rounded-xl hover:bg-white/5"
              onClick={() => setMobileMenuOpen(false)}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <HiX size={36} />
            </motion.button>
            <nav className="flex flex-col items-center gap-6">
              <motion.button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCommandPalette();
                }}
                className="mb-2 flex items-center gap-3 rounded-2xl border border-[#00D4FF]/25 bg-[#00D4FF]/10 px-6 py-3 text-sm font-bold uppercase tracking-wider text-[#00D4FF]"
              >
                <HiSearch size={20} /> Quick access
              </motion.button>
              {navItems.map((item, i) => (
                <motion.button
                  type="button"
                  aria-current={activeSection === item.href.substring(1) ? "page" : undefined}
                  key={item.name}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollTo(item.href)}
                  className={`text-4xl font-black uppercase tracking-wider px-8 py-4 rounded-2xl transition-all duration-300 ${
                    activeSection === item.href.substring(1) 
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#7C3AED] to-[#FFD700] glow-text bg-[#00D4FF]/10" 
                      : "text-gray-300 hover:text-white hover:bg-white/5"
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
