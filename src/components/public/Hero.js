"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { HiArrowDown, HiOutlineDownload, HiPlay } from "react-icons/hi";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaReact, FaNodeJs, FaPython, FaDatabase, FaCloud, FaCode } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiJavascript, SiTypescript, SiMongodb, SiGit, SiDocker, SiPostgresql } from "react-icons/si";
import Button from "../ui/Button";
import MagneticButton from "../effects/MagneticButton";
import TextReveal from "../effects/TextReveal";
import { useTypewriter } from "@/hooks/useTypewriter";
import { settings } from "@/data/settings";

export default function Hero() {
  const s = settings;
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const roles = s.typewriterRoles
    ? s.typewriterRoles.split(",").map((r) => r.trim()).filter(Boolean)
    : ["Full-Stack Developer"];

  const role = useTypewriter(roles.length ? roles : ["Developer"], 100, 50, 2000);

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const socials = [
    { Icon: FaGithub, href: s.github },
    { Icon: FaLinkedin, href: s.linkedin },
    { Icon: FaTwitter, href: s.twitter },
    { Icon: FaInstagram, href: s.instagram },
  ].filter((item) => item.href);

  const skillIcons = [
    { Icon: FaReact, color: "#61DAFB", size: 24 },
    { Icon: SiNextdotjs, color: "#000000", size: 24 },
    { Icon: SiTailwindcss, color: "#06B6D4", size: 24 },
    { Icon: FaNodeJs, color: "#339933", size: 24 },
    { Icon: SiJavascript, color: "#F7DF1E", size: 24 },
    { Icon: SiTypescript, color: "#3178C6", size: 24 },
    { Icon: SiMongodb, color: "#47A248", size: 24 },
    { Icon: SiGit, color: "#F05032", size: 24 },
    { Icon: SiDocker, color: "#2496ED", size: 24 },
    { Icon: SiPostgresql, color: "#4169E1", size: 24 },
    { Icon: FaPython, color: "#3776AB", size: 24 },
  ];

  // Parallax transforms
  const yText = useTransform(scrollY, [0, 500], [0, 100]);
  const yProfile = useTransform(scrollY, [0, 500], [0, -50]);
  const rotateProfile = useTransform(scrollY, [0, 500], [0, 10]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          style={{ y: yText }}
          className="text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-[#00D4FF]/30 mb-6 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse shadow-[0_0_10px_#00D4FF]" />
            <span className="text-sm text-gray-300">{s.availabilityText}</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4 leading-tight">
            <span className="block text-white">Hi, I&apos;m</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#7C3AED] to-[#FFD700] glow-text">
              <TextReveal text={s.name} delay={0.3} />
            </span>
          </h1>

          <div className="h-12 md:h-16 mb-8">
            <p className="text-2xl md:text-4xl text-gray-400 font-light">
              I am a <span className="text-white font-semibold text-gradient">{role}</span>
              <span className="animate-pulse text-[#00D4FF]">|</span>
            </p>
          </div>

          <div className="text-xl md:text-2xl text-gray-500 mb-12 max-w-xl leading-relaxed">
            <TextReveal text={s.heroBio} delay={0.5} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap items-center gap-4"
          >
            <MagneticButton 
              className="px-10 py-4 bg-gradient-to-r from-[#00D4FF] to-[#7C3AED] text-white font-bold rounded-lg hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-all duration-300 transform hover:scale-105 neon-glow-cyan"
              onClick={() => scrollTo("#contact")}
            >
              <span className="flex items-center gap-2">
                <HiPlay className="text-xl" /> START GAME
              </span>
            </MagneticButton>
            <MagneticButton 
              className="px-10 py-4 border-2 border-[#FFD700]/50 text-[#FFD700] font-bold rounded-lg hover:bg-[#FFD700]/10 hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all duration-300 neon-glow-gold"
              onClick={() => scrollTo("#projects")}
            >
              VIEW PROJECTS
            </MagneticButton>
            {s.cvUrl && (
              <a href={s.cvUrl} target="_blank" rel="noopener noreferrer">
                <MagneticButton className="px-10 py-4 border border-white/20 text-white font-bold rounded-lg hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 flex items-center gap-2 neon-glow">
                  <HiOutlineDownload className="text-xl" /> CV
                </MagneticButton>
              </a>
            )}
          </motion.div>

          {socials.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-6 mt-12"
            >
              {socials.map(({ Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-[#00D4FF] transition-colors p-3 hover:bg-white/5 rounded-full border border-transparent hover:border-[#00D4FF]/30 neon-border-glow"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Icon size={28} />
                </motion.a>
              ))}
            </motion.div>
          )}
        </motion.div>

        <motion.div 
          style={{ y: yProfile, rotate: rotateProfile }}
          className="relative hidden lg:flex justify-center items-center h-full"
        >
          <motion.div
            className="relative w-96 h-96 md:w-[500px] md:h-[500px] rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            {/* Floating skill icons - outer circle */}
            {mounted && skillIcons.slice(0, 6).map((skill, index) => {
              const angle = (index / 6) * 2 * Math.PI;
              const radius = 230;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              return (
                <motion.div
                  key={`outer-${index}`}
                  className="absolute"
                  style={{
                    left: "50%",
                    top: "50%",
                    x: x,
                    y: y,
                  }}
                  animate={{
                    rotate: 360,
                  }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <motion.div
                    className="relative"
                    animate={{
                      rotate: -360,
                      y: [0, -10, 0],
                    }}
                    transition={{
                      rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                      y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-full bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-shadow"
                      style={{ color: skill.color }}
                    >
                      <skill.Icon size={skill.size} />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Floating skill icons - inner circle */}
            {mounted && skillIcons.slice(6, 12).map((skill, index) => {
              const angle = (index / 6) * 2 * Math.PI + Math.PI / 6;
              const radius = 170;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              return (
                <motion.div
                  key={`inner-${index}`}
                  className="absolute"
                  style={{
                    left: "50%",
                    top: "50%",
                    x: x,
                    y: y,
                  }}
                  animate={{
                    rotate: -360,
                  }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                  <motion.div
                    className="relative"
                    animate={{
                      rotate: 360,
                      y: [0, 8, 0],
                    }}
                    transition={{
                      rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                      y: { duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 }
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-full bg-[#0A0A0A]/80 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)] transition-shadow"
                      style={{ color: skill.color }}
                    >
                      <skill.Icon size={skill.size - 4} />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Outer rotating ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[#00D4FF]/30 border-t-[#00D4FF] border-r-[#7C3AED]"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              style={{ boxShadow: "0 0 30px rgba(0, 212, 255, 0.3)" }}
            />
            {/* Middle rotating ring */}
            <motion.div
              className="absolute inset-8 rounded-full border-2 border-[#7C3AED]/30 border-b-[#7C3AED] border-l-[#FFD700]"
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{ boxShadow: "0 0 25px rgba(124, 58, 237, 0.3)" }}
            />
            {/* Inner rotating ring */}
            <motion.div
              className="absolute inset-16 rounded-full border-2 border-[#FFD700]/30 border-t-[#FFD700] border-r-[#00D4FF]"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              style={{ boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)" }}
            />
            {/* Profile image */}
            <div className="absolute inset-20 rounded-full bg-[#0A0A0A] border-2 border-white/10 overflow-hidden flex items-center justify-center shadow-[0_0_60px_rgba(0,212,255,0.2),0_0_100px_rgba(124,58,237,0.1)]">
              <img
                src="/assets/myimage.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer text-gray-500 hover:text-[#00D4FF] transition-colors"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        onClick={() => scrollTo("#about")}
      >
        <HiArrowDown size={40} />
      </motion.div>
    </section>
  );
}
