"use client";
import { useMotionPreference } from "@/components/effects/MotionProvider";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo } from "react";
import { getImageProps } from "next/image";
import { HiArrowDown, HiOutlineDownload, HiPlay } from "react-icons/hi";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaReact, FaNodeJs, FaPython, FaDatabase, FaCloud, FaCode } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiJavascript, SiTypescript, SiMongodb, SiGit, SiDocker, SiPostgresql } from "react-icons/si";
import Button from "../ui/Button";
import TextReveal from "../effects/TextReveal";
import { useTypewriter } from "@/hooks/useTypewriter";
import { usePortfolioContent } from "@/components/providers/PortfolioContentProvider";

const outerIconPositions = [
  { x: 230, y: 0 },
  { x: 115, y: 199.186 },
  { x: -115, y: 199.186 },
  { x: -230, y: 0 },
  { x: -115, y: -199.186 },
  { x: 115, y: -199.186 },
];

const innerIconPositions = [
  { x: 147.224, y: 85 },
  { x: 0, y: 170 },
  { x: -147.224, y: 85 },
  { x: -147.224, y: -85 },
  { x: 0, y: -170 },
  { x: 147.224, y: -85 },
];

function HeroRole({ roles }) {
  const reduceMotion = useMotionPreference();
  const role = useTypewriter(roles, 65, 35, 3500, !reduceMotion);
  return <><span className="sr-only">I am a {roles.join(", ")}</span><span aria-hidden="true">I am a <span className="text-white font-semibold text-gradient">{reduceMotion ? roles[0] : role}</span><span className="motion-safe:animate-pulse text-cyan-300">|</span></span></>;
}

export default function Hero() {
  const { settings: s } = usePortfolioContent();
  const reduceMotion = useMotionPreference();
  const { scrollY } = useScroll();

  const roles = useMemo(() => s.typewriterRoles
    ? s.typewriterRoles.split(",").map((r) => r.trim()).filter(Boolean)
    : ["Full-Stack Developer"], [s.typewriterRoles]);


  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: reduceMotion ? "instant" : "smooth" });
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

  return (
    <section id="home" className="relative min-h-[80svh] flex items-center justify-center pt-28 pb-20 lg:pt-32 lg:pb-20 overflow-hidden">
      <div aria-hidden="true" className="hero-atmosphere pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-light hero-light-cyan" /><div className="hero-light hero-light-violet" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          style={reduceMotion ? undefined : { y: yText }}
          className="hero-copy min-w-0 text-left"
        >
          <motion.div
            initial={false}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-[#00D4FF]/40 mb-5 sm:mb-8 backdrop-blur-md shadow-[0_0_30px_rgba(0,212,255,0.2)]"
          >
            <motion.span
              className="w-2.5 h-2.5 rounded-full bg-[#00D4FF] shadow-[0_0_15px_#00D4FF]"
              animate={reduceMotion ? undefined : {
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs sm:text-sm font-semibold text-gray-200">{s.availabilityText}</span>
          </motion.div>

          <motion.h1
            initial={false}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="text-[clamp(2rem,8.5vw,2.5rem)] sm:text-5xl lg:text-[64px] font-extrabold tracking-[-0.04em] mb-6 leading-tight"
          >
            <span className="mb-3 block text-2xl font-medium tracking-normal text-gray-200">Hi, I&apos;m</span>
            <span className="block bg-gradient-to-r from-[#67E8F9] via-[#A78BFA] to-[#FDE68A] bg-clip-text text-transparent leading-[1.08] [overflow-wrap:anywhere]">
              {s.name}
            </span>
          </motion.h1>

          <motion.div
            initial={false}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="min-h-[4.2rem] sm:min-h-14 mb-4"
          >
            <p className="text-xl md:text-[28px] text-gray-400 font-light">
              <HeroRole roles={roles} />
            </p>
          </motion.div>

          <motion.div
            initial={false}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-base md:text-lg text-gray-300 mb-8 max-w-xl leading-[1.7]"
          >
            <TextReveal text={!s.heroBio || s.heroBio.startsWith("I am a motivated and detail-oriented") ? "I build responsive web and mobile applications with React, Next.js, and Node.js." : s.heroBio} />
          </motion.div>

          <motion.div
            initial={false}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3 [&_button]:w-full sm:[&_button]:w-auto [&_button]:px-3 sm:[&_button]:px-5 [&_button]:text-xs sm:[&_button]:text-sm"
          >
            <Button
              variant="gradient"
              href="#contact"
            >
              <span className="flex items-center gap-2">
                <HiPlay className="text-xl" /> GET IN TOUCH
              </span>
            </Button>
            <Button
              variant="outline"
              href="#projects"
            >
              VIEW PROJECTS
            </Button>
            {s.cvUrl && (
              <a
                href={s.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 relative inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-semibold glass text-white hover:bg-white/15 hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300 hover:scale-105"
              >
                <HiOutlineDownload className="text-xl" /> Download CV
              </a>
            )}
          </motion.div>

          {socials.length > 0 && (
            <motion.div
              initial={false}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-wrap items-center gap-3 sm:gap-5 mt-6 sm:mt-8"
            >
              {socials.map(({ Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit my ${href.includes("github") ? "GitHub" : href.includes("linkedin") ? "LinkedIn" : href.includes("instagram") ? "Instagram" : "X"} profile (opens in a new tab)`}
                  className="text-gray-400 hover:text-[#00D4FF] transition-colors p-3 hover:bg-white/10 rounded-full border border-white/10 hover:border-[#00D4FF]/40 neon-border-glow"
                  whileHover={{ scale: 1.15, rotate: 8, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={false}
                  animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + i * 0.1, type: "spring", stiffness: 400 }}
                >
                  <Icon size={22} />
                </motion.a>
              ))}
            </motion.div>
          )}
        </motion.div>

        <div

          className="relative hidden min-w-0 lg:flex justify-center items-center h-full"
        >
          <div
            className="hero-portrait relative h-[500px] w-[500px] shrink-0 scale-[0.78] xl:scale-95 2xl:scale-100 rounded-full"
          >
            {/* Floating skill icons - outer circle */}
            {skillIcons.slice(0, 6).map((skill, index) => {
              const { x, y } = outerIconPositions[index];
              return (
                <div
                  key={`outer-${index}`}
                  className="absolute"
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                >
                  <div
                    className="hero-icon-float"
                  >
                    <div
                      className="w-14 h-14 rounded-full bg-[#050508]/90 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-[0_0_25px_rgba(0,212,255,0.4)] hover:shadow-[0_0_40px_rgba(0,212,255,0.6)] transition-all duration-300 hover:scale-110"
                      style={{ color: skill.color }}
                    >
                      <skill.Icon aria-hidden="true" size={skill.size} />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Floating skill icons - inner circle */}
            {skillIcons.slice(6, 12).map((skill, index) => {
              const { x, y } = innerIconPositions[index];
              return (
                <div
                  key={`inner-${index}`}
                  className="absolute"
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                >
                  <div
                    className="hero-icon-float"
                  >
                    <div
                      className="w-12 h-12 rounded-full bg-[#050508]/90 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_35px_rgba(124,58,237,0.6)] transition-all duration-300 hover:scale-110"
                      style={{ color: skill.color }}
                    >
                      <skill.Icon aria-hidden="true" size={skill.size - 2} />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Outer rotating ring */}
            <div
              className="hero-ring absolute inset-0 rounded-full border-2 border-[#00D4FF]/40 border-t-[#00D4FF] border-r-[#7C3AED]"
              style={{ boxShadow: "0 0 40px rgba(0, 212, 255, 0.4)" }}
            />
            {/* Middle rotating ring */}
            <div
              className="hero-ring hero-ring-reverse absolute inset-8 rounded-full border-2 border-[#7C3AED]/40 border-b-[#7C3AED] border-l-[#FFD700]"
              style={{ boxShadow: "0 0 35px rgba(124, 58, 237, 0.4)" }}
            />
            {/* Inner rotating ring */}
            <div
              className="hero-ring hero-ring-fast absolute inset-16 rounded-full border-2 border-[#FFD700]/40 border-t-[#FFD700] border-r-[#00D4FF]"
              style={{ boxShadow: "0 0 30px rgba(255, 215, 0, 0.4)" }}
            />
            {/* Profile image */}
            <div
              className="absolute inset-20 rounded-full bg-[#050508] border-2 border-white/10 overflow-hidden flex items-center justify-center shadow-[0_0_80px_rgba(0,212,255,0.3),0_0_120px_rgba(124,58,237,0.2)]"
            >
              {s.profileImage ? (
                <picture>
                  <source media="(min-width: 1024px)" srcSet={getImageProps({ src: s.profileImage, alt: `${s.name} profile photo`, width: 340, height: 340, sizes: "340px", unoptimized: s.profileImage.startsWith("http") || s.profileImage.startsWith("/api/images/") }).props.srcSet || s.profileImage} />
                  {/* The desktop portrait must not download on phones. */}
                  <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt={`${s.name} profile photo`} width="340" height="340" loading="eager" className="w-full h-full object-cover" />
                </picture>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-gray-500 bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
                  {s.name?.charAt(0) || "?"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <motion.button
        type="button"
        aria-label="Scroll to the About section"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer text-gray-400 hover:text-[#00D4FF] transition-colors"
        animate={reduceMotion ? undefined : { y: [0, 20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.1, y: 25 }}
        onClick={() => scrollTo("#about")}
      >
        <HiArrowDown size={44} />
      </motion.button>
    </section>
  );
}
