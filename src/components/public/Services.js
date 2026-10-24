"use client";
import { useMotionPreference } from "@/components/effects/MotionProvider";
import { motion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";
import { getUiSettings } from "@/content/uiSettings";
import { usePortfolioContent } from "@/components/providers/PortfolioContentProvider";
import { getServiceIcon } from "@/lib/serviceIcons";

const accents = [
  { text: "text-cyan-300", icon: "from-cyan-400/20 to-blue-500/5", border: "from-cyan-400/45 via-cyan-400/5 to-transparent", glow: "bg-cyan-400/10" },
  { text: "text-violet-300", icon: "from-violet-400/20 to-purple-500/5", border: "from-violet-400/45 via-violet-400/5 to-transparent", glow: "bg-violet-400/10" },
  { text: "text-pink-300", icon: "from-pink-400/20 to-rose-500/5", border: "from-pink-400/45 via-pink-400/5 to-transparent", glow: "bg-pink-400/10" },
  { text: "text-amber-300", icon: "from-amber-400/20 to-orange-500/5", border: "from-amber-400/45 via-amber-400/5 to-transparent", glow: "bg-amber-400/10" },
];

export default function Services() {
  const { services, settings } = usePortfolioContent();
  const ui = getUiSettings(settings);
  const reduceMotion = useMotionPreference();
  return (
    <section id="services" aria-labelledby="services-heading" className="relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-6 text-center">
          <div><p className="mb-3 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-violet-300"><span className="h-px w-8 bg-violet-400" />{ui.sectionServicesLabel}</p><h2 id="services-heading" className="text-3xl font-bold leading-tight tracking-[-0.035em] text-white sm:text-4xl">{ui.sectionServicesHeading}<br /><span className="bg-gradient-to-r from-violet-300 via-pink-400 to-cyan-300 bg-clip-text text-transparent">{ui.sectionServicesAccent}</span></h2></div>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-gray-400">{ui.sectionServicesDescription}</p>
        </div>
        {services.length === 0 ? <p className="rounded-2xl border border-white/10 p-6 text-sm text-gray-400">Services coming soon.</p> : <div className={`grid gap-3 sm:grid-cols-2 ${ui.uiServiceCardSize === "compact" ? "xl:grid-cols-4" : ""}`}>
          {services.map((service, index) => {
            const Icon = getServiceIcon(service.icon);
            const accent = accents[index % accents.length];
            return <motion.article key={service.id} initial={false} whileHover={reduceMotion ? undefined : { y: -5 }} transition={{ duration: 0.25 }} className={`group relative rounded-[22px] bg-gradient-to-br ${accent.border} p-px`}>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[21px] border border-white/5 bg-[#0c0c15] p-4 sm:p-5">
                <div aria-hidden="true" className={`pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl transition-opacity duration-300 group-hover:opacity-100 opacity-50 ${accent.glow}`} />
                <div aria-hidden="true" className={`pointer-events-none absolute -bottom-16 -right-10 h-48 w-48 rounded-full blur-3xl opacity-40 ${accent.glow}`} />
                <div className="relative mb-3 flex items-center justify-between">
                  <span className={`grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-gradient-to-br shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition-transform duration-300 motion-safe:group-hover:-rotate-6 ${accent.icon} ${accent.text}`}><Icon size={23} /></span>
                  <span aria-hidden="true" className="text-4xl font-black leading-none tracking-tighter text-slate-400 sm:text-4xl">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="relative mb-2 text-lg font-bold leading-snug tracking-tight text-white">{service.title}</h3>
                <p className="relative mb-3 max-w-[48ch] flex-1 text-sm leading-[1.7] text-gray-300">{service.description}</p>
                <a href="#contact" aria-label={`Let's discuss ${service.title}`} className={`relative mt-auto flex min-h-11 items-center justify-between gap-3 border-t border-white/10 pt-2 text-xs font-semibold ${accent.text}`}>Let&apos;s discuss<span className="grid h-8 w-8 place-items-center rounded-full border border-white/10 transition-colors group-hover:bg-white/5"><HiArrowUpRight size={18} /></span></a>
              </div>
            </motion.article>;
          })}
        </div>}
      </div>
    </section>
  );
}
