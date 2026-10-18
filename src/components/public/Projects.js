"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import GlassCard from "../ui/GlassCard";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { getUiSettings } from "@/content/uiSettings";
import { usePortfolioContent } from "@/components/providers/PortfolioContentProvider";

export default function Projects() {
  const { projects, settings } = usePortfolioContent();
  const ui = getUiSettings(settings);
  const reduceMotion = useReducedMotion();
  const [expandedProjects, setExpandedProjects] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const categoryName = value => value?.trim().toLowerCase() === "bakery" ? "Business Websites" : value || "Other";
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", ...new Set(projects.map((project) => categoryName(project.category)))];

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => categoryName(p.category) === activeCategory);
  const visibleProjects = activeCategory === "All" && !showAll ? filteredProjects.slice(0, 3) : filteredProjects;

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader
          subtitle={ui.sectionProjectsLabel}
          title={ui.sectionProjectsHeading}
          description={ui.sectionProjectsDescription}
        />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-5">
          {categories.map((cat) => (
            <button type="button" aria-pressed={activeCategory === cat}
              key={cat}
              onClick={() => { setActiveCategory(cat); setShowAll(false); }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className={`grid gap-4 items-stretch ${ui.uiProjectCardSize === "large" ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}`}>
          <AnimatePresence>
            {visibleProjects.map((project, i) => (
              <motion.div
                key={project.id}
                className="min-w-0 h-full"
                layout
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.25, delay: Math.min(i * 0.04, 0.12) }}
              >
                <GlassCard className="h-full !p-0 group" contentClassName="flex flex-col" tilt={false}>
                  {/* Image Area */}
                  <div className="relative aspect-[16/9] shrink-0 w-full overflow-hidden bg-[var(--bg-card)]">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized={project.image.startsWith("/api/images/")}
                        className="object-cover transition-transform duration-250 motion-safe:group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-500/10 to-purple-600/10 text-white/20">
                        <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}

                  </div>

                  <div className="p-4 sm:p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold leading-[1.35] tracking-[-0.02em] text-white mb-2 md:min-h-[3rem] group-hover:text-cyan-400 transition-colors [overflow-wrap:anywhere]">
                      {project.title}
                    </h3>
                    <div className="mb-3">
                      <p id={`project-description-${project.id}`} className={`text-gray-300 text-sm leading-[1.6] md:min-h-[4.2rem] ${expandedProjects.includes(project.id) ? "" : "line-clamp-3"}`}>
                        {project.description}
                      </p>
                      <button type="button" aria-expanded={expandedProjects.includes(project.id)} aria-controls={`project-description-${project.id}`} onClick={() => setExpandedProjects(current => current.includes(project.id) ? current.filter(id => id !== project.id) : [...current, project.id])} className="mt-2 inline-flex min-h-8 items-center text-xs font-semibold text-cyan-300 hover:text-white">
                        {expandedProjects.includes(project.id) ? "Show less" : "Read more"}<span className="sr-only"> about {project.title}</span>
                      </button>
                    </div>
                    <div className="flex flex-wrap content-start gap-1.5 mt-auto md:min-h-12">
                      {project.techStack?.map((tech) => (
                        <span key={tech} className="px-3 py-1 text-[11px] leading-4 font-medium rounded-full bg-white/5 text-gray-300 border border-white/10">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-4 border-t border-white/10 pt-2 text-sm font-semibold">
                      {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-cyan-300 hover:text-cyan-100"><FaExternalLinkAlt /> Live Demo</a>}
                      {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-gray-300 hover:text-white"><FaGithub /> GitHub</a>}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {activeCategory === "All" && filteredProjects.length > 3 && <div className="mt-6 text-center"><button type="button" onClick={() => setShowAll(!showAll)} className="min-h-12 rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan-400/40 hover:bg-white/5">{showAll ? "Show featured projects" : `View all ${filteredProjects.length} projects`}</button></div>}
      </div>
    </section>
  );
}
