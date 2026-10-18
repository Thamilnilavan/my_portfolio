"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { HiArrowUpRight, HiOutlineComputerDesktop, HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { HiArrowRight } from "react-icons/hi";
import { usePortfolioContent } from "@/components/providers/PortfolioContentProvider";
import { getBusinessSettings } from "@/content/businessSettings";

export default function BuildingArcStack() {
  const { settings } = usePortfolioContent();
  const content = getBusinessSettings(settings);
  const ref = useRef(null);
  const [mobile, setMobile] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const progress = useTransform(scrollYProgress, [0.15, 0.9], [0, 1]);
  if (!content.businessEnabled) return null;
  return <section id="arcstack" ref={ref} aria-labelledby="arcstack-heading" className="relative isolate overflow-hidden">
    <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-full w-2/3 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.12),transparent_65%)]" />
    <div className="relative mx-auto w-full max-w-[1600px] px-6 md:px-12 xl:px-20">
      <div className="grid items-center gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div>
          <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300"><span className="h-px w-7 bg-cyan-300" />{content.businessHeading}</p>
          <h2 id="arcstack-heading" className="text-3xl font-bold leading-[1.12] tracking-[-0.035em] text-white sm:text-4xl xl:text-5xl">{content.businessHeadline}<span className="mt-1 block bg-gradient-to-r from-cyan-300 via-violet-400 to-pink-400 bg-clip-text text-transparent">{content.businessHeadlineAccent}</span></h2>
          <p className="mt-5 max-w-[48ch] text-base leading-[1.75] text-gray-400">{content.businessDescription}</p>
          <a href={content.businessUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center gap-5 rounded-full border border-cyan-300/25 bg-cyan-300/5 px-5 py-3 text-sm font-semibold text-cyan-100 transition-colors hover:border-cyan-300/60 hover:bg-cyan-300/10">{content.businessLinkLabel}<HiArrowUpRight size={19} /></a>
        </div>
        <div className="min-w-0">
          <div className="mb-4 flex items-center justify-between gap-3"><span className="text-[10px] font-medium uppercase tracking-[0.16em] text-gray-500">ArcStack / Responsive preview</span><div className="flex gap-1 rounded-full border border-white/10 p-1">{[{ value: false, Icon: HiOutlineComputerDesktop, label: "Desktop" }, { value: true, Icon: HiOutlineDevicePhoneMobile, label: "Mobile" }].map(({ value, Icon, label }) => <button type="button" key={label} aria-label={`Show ${label.toLowerCase()} preview`} aria-pressed={mobile === value} onClick={() => setMobile(value)} className={`grid h-9 w-9 place-items-center rounded-full transition-colors ${mobile === value ? "bg-white/10 text-cyan-200" : "text-gray-500 hover:text-white"}`}><Icon size={18} /></button>)}</div></div>
          <div className="relative flex h-[390px] items-center justify-center sm:h-[430px]">
            <div aria-hidden="true" className="absolute inset-8 rounded-full bg-violet-500/10 blur-3xl" />
            <motion.div layout transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }} className={`relative flex h-full flex-col overflow-hidden border border-white/15 bg-[#090b0a] shadow-[0_30px_80px_rgba(0,0,0,0.45)] ${mobile ? "w-[215px] rounded-[30px] p-1.5" : "w-full rounded-2xl"}`}>
              <div className={`flex h-8 shrink-0 items-center gap-2 border-b border-white/10 px-3 ${mobile ? "justify-center" : ""}`}>
                {mobile ? <span className="h-1 w-12 rounded-full bg-white/15" /> : <><span className="h-1.5 w-1.5 rounded-full bg-white/20" /><span className="h-1.5 w-1.5 rounded-full bg-white/15" /><span className="h-1.5 w-1.5 rounded-full bg-white/10" /><span className="ml-3 text-[8px] text-gray-500">arcstack-web.vercel.app</span></>}
              </div>
              <a href={content.businessUrl} target="_blank" rel="noopener noreferrer" aria-label="Open the live ArcStack website" className={`relative block min-h-0 flex-1 overflow-hidden ${mobile ? "rounded-b-[24px]" : ""}`}><Image src={mobile ? (content.businessMobileImage || "/assets/arcstack-mobile.png") : (content.businessDesktopImage || "/assets/arcstack-desktop.png")} alt={`ArcStack homepage on ${mobile ? "mobile" : "desktop"}`} fill sizes={mobile ? "215px" : "(min-width: 1024px) 55vw, 100vw"} className="object-cover object-top" /></a>
            </motion.div>
          </div>
          <p className="mt-3 text-center text-[10px] text-gray-500">Website screenshots · Open ArcStack for the live experience</p>
        </div>
      </div>
      <div className="relative mt-8 grid gap-5 border-t border-white/10 pt-5 sm:grid-cols-3 sm:gap-8">
        <motion.div aria-hidden="true" style={{ scaleX: reduceMotion ? 1 : progress }} className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-cyan-300 via-violet-400 to-pink-400 shadow-[0_0_12px_rgba(124,58,237,0.4)]" />
        {[{ title: "Build", text: content.businessBuildText, color: "text-cyan-300" }, { title: "Launch", text: content.businessLaunchText, color: "text-violet-300" }, { title: "Grow", text: content.businessGrowText, color: "text-pink-300" }].map((step, index) => <motion.div key={step.title} initial={false} whileInView={reduceMotion ? undefined : { y: [12, 0], opacity: [0.45, 1] }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: index * 0.13 }}><h3 className={`mb-2 flex items-center gap-3 text-lg font-semibold ${step.color}`}><span className="font-mono text-[10px] opacity-50">0{index + 1}</span>{step.title}<HiArrowRight className="ml-auto opacity-30" size={16} /></h3><p className="max-w-[34ch] text-sm leading-relaxed text-gray-400">{step.text}</p></motion.div>)}
      </div>
    </div>
  </section>;
}
