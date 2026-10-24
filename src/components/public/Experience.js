"use client";
import { useMotionPreference } from "@/components/effects/MotionProvider";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { HiBriefcase, HiLocationMarker, HiCalendar, HiArrowRight } from "react-icons/hi";
import SectionHeader from "../ui/SectionHeader";
import { getUiSettings } from "@/content/uiSettings";
import { usePortfolioContent } from "@/components/providers/PortfolioContentProvider";

const accents = [
  { text: "text-cyan-300", background: "bg-cyan-400/10", border: "border-cyan-400/25", glow: "from-cyan-400/15", line: "bg-cyan-300" },
  { text: "text-violet-300", background: "bg-violet-400/10", border: "border-violet-400/25", glow: "from-violet-400/15", line: "bg-violet-300" },
  { text: "text-pink-300", background: "bg-pink-400/10", border: "border-pink-400/25", glow: "from-pink-400/15", line: "bg-pink-300" },
];

function ArrowBurst({ large = false }) {
  const radius = large ? 68 : 35;
  return <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 z-40 h-0 w-0">
    <motion.span initial={{ scale: 0, opacity: 0.9 }} animate={{ scale: large ? 3.2 : 2, opacity: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="absolute -left-5 -top-5 h-10 w-10 rounded-full bg-cyan-200/35 blur-md" />
    {[0, 0.14].map(delay => <motion.span key={delay} initial={{ scale: 0.1, opacity: 0.9 }} animate={{ scale: large ? 3.6 : 2, opacity: 0 }} transition={{ duration: 0.85, delay, ease: "easeOut" }} className="absolute -left-5 -top-5 h-10 w-10 rounded-full border border-cyan-200/80 shadow-[0_0_15px_rgba(167,139,250,0.65)]" />)}
    {Array.from({ length: large ? 16 : 10 }, (_, index) => {
      const angle = index * Math.PI * 2 / (large ? 16 : 10);
      return <motion.span key={index} initial={{ x: 0, y: 0, opacity: 1, scale: 1 }} animate={{ x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, opacity: 0, scale: 0 }} transition={{ duration: 0.65 + index % 3 * 0.1, ease: "easeOut" }} className={`absolute -left-0.5 -top-0.5 h-1 w-1 rounded-full shadow-[0_0_8px_currentColor] ${index % 2 ? "bg-violet-300 text-violet-300" : "bg-cyan-200 text-cyan-200"}`} />;
    })}
  </span>;
}

function JourneyTimeline({ experience }) {
  const timeline = useRef(null);
  const track = useRef(null);
  const markers = useRef([]);
  const thresholds = useRef([]);
  const [reached, setReached] = useState(0);
  const [ready, setReady] = useState(false);
  const [finished, setFinished] = useState(false);
  const reduceMotion = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: timeline, offset: ["start 65%", "end 65%"] });
  const arrowTop = useTransform(scrollYProgress, value => `${value * 100}%`);
  const activate = progress => {
    if (progress >= 0.995) setFinished(true);
    const index = thresholds.current.reduce((last, threshold, i) => progress >= threshold - 0.005 ? i : last, 0);
    setReached(previous => Math.max(previous, index));
  };
  useMotionValueEvent(scrollYProgress, "change", activate);
  useEffect(() => {
    const measure = () => {
      if (!track.current?.clientHeight) return;
      const line = track.current.getBoundingClientRect();
      thresholds.current = markers.current.map(marker => marker ? (marker.getBoundingClientRect().top + marker.clientHeight / 2 - line.top) / line.height : 1);
      activate(scrollYProgress.get());
    };
    const observer = new ResizeObserver(() => { measure(); setReady(true); });
    if (timeline.current) observer.observe(timeline.current);
    return () => observer.disconnect();
  }, [scrollYProgress, experience.length]);

  return (
    <div ref={timeline} className="relative pb-6">
      <div ref={track} aria-hidden="true" className="pointer-events-none absolute bottom-12 left-4 top-9 w-px bg-white/10 md:left-1/2">
        <motion.div className="absolute inset-0 origin-top bg-gradient-to-b from-cyan-300 via-violet-400 to-pink-400 shadow-[0_0_18px_rgba(124,58,237,0.5)]" style={{ scaleY: reduceMotion ? 1 : scrollYProgress }} />
        {!reduceMotion && <motion.span style={{ top: arrowTop, x: "-50%", y: "-95%" }} className="absolute left-1/2 z-30 block h-20 w-7 text-cyan-200 drop-shadow-[0_0_9px_rgba(103,232,249,0.85)]">
          <svg viewBox="0 0 28 88" fill="none" className="h-full w-full"><path d="M14 10V75" stroke="currentColor" strokeWidth="2" /><path d="M14 17L5 7V19L14 29L23 19V7L14 17Z" fill="currentColor" fillOpacity=".35" stroke="currentColor" /><path d="M14 70L5 61L14 85L23 61L14 70Z" fill="currentColor" /><path d="M10 36V53M18 36V47" stroke="currentColor" strokeOpacity=".3" /></svg>
        </motion.span>}
        <span className="absolute bottom-0 left-0 z-20 h-0 w-0">{ready && finished && !reduceMotion && <ArrowBurst large />}</span>
      </div>
      <ol className="space-y-6 md:space-y-3">
        {experience.map((exp, index) => {
          const accent = accents[index % accents.length];
          const left = index % 2 === 0;
          const visible = !ready || reduceMotion || index <= reached;
          const current = exp.endDate?.trim().toLowerCase() === "present";
          const description = exp.description || "";
          const longDescription = description.length > 260;
          const splitAt = longDescription ? Math.max(description.lastIndexOf(" ", 240), 120) : description.length;
          return <li key={exp.id} className="relative min-w-0 pl-11 md:grid md:grid-cols-2 md:gap-16 md:pl-0">
            <motion.span ref={node => { markers.current[index] = node; }} aria-hidden="true" animate={visible ? { scale: [1, 1.4, 1], borderColor: "rgba(103,232,249,0.7)" } : { scale: 1, borderColor: "rgba(255,255,255,0.15)" }} transition={{ duration: reduceMotion ? 0 : 0.65 }} className={`absolute left-4 top-7 z-20 grid h-5 w-5 -translate-x-1/2 place-items-center rounded-full border bg-[#0d0b18] md:left-1/2 ${visible ? "shadow-[0_0_18px_rgba(103,232,249,0.35)]" : ""}`}><span className={`h-1.5 w-1.5 rounded-full ${visible ? accent.line : "bg-white/20"}`} />{ready && index <= reached && !reduceMotion && <ArrowBurst />}</motion.span>
            <motion.span aria-hidden="true" initial={false} animate={{ opacity: visible ? 1 : 0.15, scaleX: visible ? 1 : 0 }} transition={{ duration: reduceMotion ? 0 : 0.3 }} className={`absolute left-4 top-[38px] h-px w-7 bg-gradient-to-r ${accent.glow} to-white/30 md:left-1/2 md:w-8 ${left ? "md:-translate-x-full md:origin-right" : "md:origin-left"}`} />
            <motion.article initial={false} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }} className={`group relative min-w-0 overflow-hidden rounded-[22px] border ${accent.border} bg-[#0d0c17]/95 p-5 sm:p-6 ${left ? "md:col-start-1" : "md:col-start-2"}`}>
              <div aria-hidden="true" className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent.glow} via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-100`} />
              <motion.div aria-hidden="true" initial={false} animate={{ opacity: visible ? [0, 0.5, 0] : 0 }} transition={{ duration: reduceMotion ? 0 : 0.8 }} className={`pointer-events-none absolute inset-0 rounded-[22px] border-2 ${accent.border} shadow-[inset_0_0_35px_rgba(103,232,249,0.2)]`} />
              <span aria-hidden="true" className="pointer-events-none absolute -right-1 -top-4 text-[90px] font-black leading-none tracking-tighter text-white/[0.025]">{String(index + 1).padStart(2, "0")}</span>
              <div className="relative">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <span className={`inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] ${accent.text}`}><HiCalendar size={14} />{exp.startDate}{exp.endDate ? ` — ${exp.endDate}` : ""}</span>
                  {current && <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/15 bg-emerald-300/5 px-2 py-1 text-[10px] font-semibold text-emerald-200"><span className="h-1 w-1 rounded-full bg-emerald-300" />Current</span>}
                </div>
                <h3 className="mb-2 text-lg font-bold leading-snug tracking-tight text-white sm:text-xl">{exp.title}</h3>
                <p className={`mb-3 flex items-center gap-2 text-sm font-medium ${accent.text}`}><HiBriefcase className="shrink-0" />{exp.company}</p>
                {exp.location && <p className="mb-4 flex items-start gap-1.5 text-xs text-gray-400"><HiLocationMarker className={`mt-0.5 shrink-0 ${accent.text}`} />{exp.location}</p>}
                {longDescription ? <details className="group/description text-sm leading-[1.75] text-gray-300"><summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden"><span className="group-open/description:hidden">{description.slice(0, splitAt)}…</span><span className={`mt-3 flex min-h-8 items-center gap-2 text-xs font-semibold ${accent.text}`}><span className="group-open/description:hidden">Read the story</span><span className="hidden group-open/description:inline">Close the story</span><HiArrowRight className="transition-transform group-open/description:rotate-90" /></span></summary><p className="mt-2 whitespace-pre-line">{description}</p></details> : <p className="whitespace-pre-line text-sm leading-[1.75] text-gray-300">{description}</p>}
              </div>
            </motion.article>
            <span aria-hidden="true" className={`hidden self-start pt-8 text-[10px] font-medium uppercase tracking-[0.18em] text-gray-500 md:block md:row-start-1 ${left ? "md:col-start-2" : "md:col-start-1 md:text-right"}`}>Chapter {String(index + 1).padStart(2, "0")}</span>
          </li>;
        })}
      </ol>
      <p aria-hidden="true" className="ml-11 mt-7 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-500 md:ml-0 md:text-center">The journey continues</p>
    </div>
  );
}

export default function Experience() {
  const { experience: records, settings } = usePortfolioContent();
  const ui = getUiSettings(settings);
  const experience = records.filter((item, index) => records.findIndex(other =>
    other.company?.split("·")[0].trim().toLowerCase() === item.company?.split("·")[0].trim().toLowerCase()
    && other.description?.trim() === item.description?.trim()
    && other.endDate?.trim().toLowerCase() === item.endDate?.trim().toLowerCase()
  ) === index);
  return <section id="experience" className="relative overflow-hidden"><div className="relative mx-auto max-w-5xl px-6"><SectionHeader subtitle={ui.sectionJourneyLabel} title={<><span>{ui.sectionJourneyHeading}</span><br /><span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-pink-400 bg-clip-text text-transparent">{ui.sectionJourneyAccent}</span></>} description={ui.sectionJourneyDescription} />{experience.length ? <JourneyTimeline experience={experience} /> : <p className="py-6 text-center text-sm text-gray-400">Experience coming soon.</p>}</div></section>;
}
