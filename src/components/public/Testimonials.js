"use client";

import { motion } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import GlassCard from "../ui/GlassCard";
import TextReveal from "../effects/TextReveal";
import { FaStar } from "react-icons/fa";
import { usePortfolioContent } from "@/components/providers/PortfolioContentProvider";

export default function Testimonials() {
  const { testimonials: records } = usePortfolioContent();
  const testimonials = records.filter(item => !["john doe", "jane smith", "mike johnson"].includes(item.name?.trim().toLowerCase()));

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] -translate-y-1/2 -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader subtitle="Client Reviews" title="What People Say" className="!mb-6" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial, i) => (
            <GlassCard key={`${testimonial.id}-${i}`} className="h-full !p-6">
              <div className="flex gap-1 mb-4 text-amber-400">
                {[...Array(5)].map((_, idx) => (
                  <FaStar key={idx} size={14} className={idx < (testimonial.rating ?? 5) ? "" : "text-gray-600"} />
                ))}
              </div>
              <div className="text-gray-300 italic mb-6 text-base leading-relaxed">
                &ldquo;<TextReveal text={testimonial.content} delay={i * 0.05} />&rdquo;
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center text-white font-bold text-base">
                  {testimonial.name?.charAt(0) || "?"}
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">{testimonial.name}</h4>
                  <span className="text-xs text-gray-500">{testimonial.role}</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
