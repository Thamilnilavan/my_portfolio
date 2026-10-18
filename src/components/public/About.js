"use client";
import { useEffect, useRef, useState } from "react";
import { getAboutSettings } from "@/content/aboutSettings";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { HiArrowRight, HiCode, HiLightningBolt, HiDeviceMobile, HiOutlineDownload } from "react-icons/hi";
import { usePortfolioContent } from "@/components/providers/PortfolioContentProvider";

const highlights = [
  { icon: HiCode, number: "01", title: "Built with care", description: "Clean, maintainable code with attention to the small details.", color: "text-cyan-300", background: "bg-cyan-400/10" },
  { icon: HiLightningBolt, number: "02", title: "Made to perform", description: "Fast, responsive experiences that feel effortless to use.", color: "text-violet-300", background: "bg-violet-400/10" },
  { icon: HiDeviceMobile, number: "03", title: "Designed for people", description: "Thoughtful interfaces, from the smallest screen to the largest.", color: "text-pink-300", background: "bg-pink-400/10" },
];

function CinematicCount({ value, enabled }) {
  const ref = useRef(null);
  const entered = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    if (!entered || !enabled) return;
    const controls = animate(0, value, { duration: 1.5, ease: [0.22, 1, 0.36, 1], onUpdate: current => setDisplay(Math.round(current)) });
    return () => controls.stop();
  }, [entered, enabled, value]);
  return <span ref={ref}><span aria-hidden="true">{String(enabled ? display : value).padStart(2, "0")}</span><span className="sr-only">{value}</span></span>;
}

export default function About() {
  const { settings, projects, skills } = usePortfolioContent();
  const about = getAboutSettings(settings);
  const reduceMotion = useReducedMotion();
  const cinematic = about.aboutAnimate && !reduceMotion;
  const sceneRef = useRef(null);
  const sceneVisible = useInView(sceneRef, { amount: 0.1 });
  const reveal = (delay = 0) => ({
    initial: false,
    whileInView: cinematic ? { y: [20, 0], opacity: [0.5, 1] } : undefined,
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  });
  const sentences = (settings.aboutText || "").trim().split(/(?<=[.!?])\s+(?=[A-Z])/);
  const introduction = sentences.slice(0, 2).join(" ").trim();
  const rest = sentences.slice(2).join(" ").trim();
  const roles = about.aboutRoles.split(",").map(role => role.trim()).filter(Boolean);

  return (
    <section id="about" ref={sceneRef} aria-labelledby="about-heading" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_45%,rgba(6,182,212,0.08),transparent_45%),radial-gradient(ellipse_at_85%_40%,rgba(139,92,246,0.13),transparent_45%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />
        <span className="absolute left-3 top-16 hidden text-[clamp(90px,14vw,220px)] font-black leading-none tracking-[-0.08em] text-white/[0.025] lg:block">ABOUT</span>
        <span className="absolute right-[6%] top-14 font-mono text-xl text-violet-300/30">+</span>
        <span className="absolute bottom-12 left-[4%] font-mono text-xl text-cyan-300/30">+</span>
      </div>
      <div className="relative mx-auto w-full max-w-[1600px] px-6 md:px-12 xl:px-20">
        <header className="relative text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-300" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-300">{about.aboutEyebrow}</p>
            <span aria-hidden="true" className="h-px w-10 bg-gradient-to-l from-transparent to-violet-400" />
          </div>
          <h2 id="about-heading" className="text-3xl font-bold leading-[1.12] tracking-[-0.045em] text-white sm:text-5xl lg:text-[64px]">
            <motion.span {...reveal()} className="block">{about.aboutHeading}</motion.span>
            <motion.span {...reveal(0.1)} className="block bg-gradient-to-r from-cyan-300 via-violet-400 to-pink-400 bg-clip-text text-transparent">{about.aboutHeadingAccent}</motion.span>
          </h2>
          <motion.div {...reveal(0.2)} className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {roles.map((role, index) => <span key={role} className="inline-flex items-center gap-2 text-xs font-medium text-gray-300 sm:text-sm"><span aria-hidden="true" className={`h-1 w-1 rounded-full ${index % 2 ? "bg-violet-400" : "bg-cyan-300"}`} />{role}</span>)}
          </motion.div>
        </header>

        <div className={`mt-9 grid items-center gap-8 border-y border-white/10 py-7 sm:mt-12 sm:py-9 ${about.aboutShowStats ? "lg:grid-cols-[1.25fr_1fr] lg:gap-16" : ""}`}>
          <motion.div {...reveal(0.15)} className="min-w-0">
            <p className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-gray-500"><span className="text-cyan-300">01 /</span> Behind the work</p>
            <p className="text-lg leading-[1.8] text-gray-200 sm:text-xl">{introduction}</p>
            {rest && <p className="mt-4 whitespace-pre-line text-sm leading-[1.9] text-gray-400 sm:text-base">{rest}</p>}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#contact" className="group inline-flex min-h-11 items-center gap-5 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_6px_30px_rgba(124,58,237,0.2)] transition-shadow hover:shadow-[0_6px_35px_rgba(124,58,237,0.4)]">{about.aboutContactLabel}<HiArrowRight className="transition-transform group-hover:translate-x-1" /></a>
              {settings.cvUrl && <a href={settings.cvUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-gray-300 transition-colors hover:border-cyan-300/40 hover:text-cyan-200"><HiOutlineDownload />{about.aboutCvLabel}</a>}
            </div>
          </motion.div>

          {about.aboutShowStats && <motion.div {...reveal(0.25)} className="relative min-w-0 overflow-hidden rounded-[28px] border border-violet-300/15 bg-gradient-to-br from-[#101422] via-[#11101e] to-[#191026] p-6 sm:p-8">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
              <motion.div animate={cinematic && sceneVisible ? { rotate: 360 } : { rotate: 0 }} transition={{ duration: 45, repeat: Infinity, ease: "linear" }} className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-violet-300/10 border-t-violet-300/50"><span className="absolute left-10 top-9 h-2 w-2 rounded-full bg-violet-300 shadow-[0_0_20px_#a78bfa]" /></motion.div>
              <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full border border-cyan-300/10" />
              <div className="absolute -bottom-20 -left-12 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />
            </div>
            <div className="relative">
              <div className="flex items-center justify-between gap-4"><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-400">Ideas into reality</span><HiCode aria-hidden="true" size={24} className="text-violet-300" /></div>
              <p className="mt-6 max-w-[18ch] text-2xl font-semibold leading-[1.3] tracking-tight text-white sm:text-3xl">{about.aboutTagline}</p>
              <div className="mt-7 grid grid-cols-2 gap-5 border-t border-white/10 pt-5">
                {[{ value: projects.length, label: "Featured projects", color: "text-cyan-300" }, { value: skills.length, label: "Skills & technologies", color: "text-violet-300" }].map(stat => <div key={stat.label}><p className={`text-5xl font-semibold tracking-[-0.05em] tabular-nums sm:text-6xl ${stat.color}`}><CinematicCount value={stat.value} enabled={cinematic} /><span aria-hidden="true" className="ml-1 text-2xl font-light">+</span></p><p className="mt-2 text-xs leading-relaxed text-gray-400">{stat.label}</p></div>)}
              </div>
            </div>
          </motion.div>}
        </div>

        {about.aboutShowFeatures && <div className="mt-6 grid gap-5 md:grid-cols-3 md:gap-8">
          {highlights.map(({ icon: Icon, color, background, number }, index) => <motion.div key={number} {...reveal(index * 0.1)} className="group relative flex gap-4 py-3">
            <span aria-hidden="true" className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/5 ${background} ${color}`}><Icon size={21} /></span>
            <div className="min-w-0"><p aria-hidden="true" className={`mb-2 font-mono text-[10px] ${color}`}>/{number}</p><h3 className="text-base font-semibold text-white">{about[`aboutFeature${index + 1}Title`]}</h3><p className="mt-2 text-sm leading-[1.75] text-gray-400">{about[`aboutFeature${index + 1}Text`]}</p></div>
          </motion.div>)}
        </div>}
      </div>
    </section>
  );
}
