"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  HiArrowRight,
  HiBriefcase,
  HiCode,
  HiDocumentDownload,
  HiHome,
  HiMail,
  HiSearch,
  HiUser,
  HiX,
} from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { projects } from "@/data/projects";
import { settings } from "@/data/settings";

const sectionActions = [
  { label: "Home", detail: "Return to the introduction", icon: HiHome, href: "#home", keywords: "top hero" },
  { label: "About me", detail: "Background and approach", icon: HiUser, href: "#about", keywords: "profile bio" },
  { label: "Skills", detail: "Tools and technologies", icon: HiCode, href: "#skills", keywords: "stack technologies" },
  { label: "Projects", detail: "Explore selected work", icon: HiBriefcase, href: "#projects", keywords: "portfolio work" },
  { label: "Contact", detail: "Start a conversation", icon: HiMail, href: "#contact", keywords: "email hire" },
];

export function openCommandPalette() {
  window.dispatchEvent(new Event("open-command-palette"));
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const actions = useMemo(() => {
    const projectActions = projects.map((project) => ({
      label: project.title,
      detail: project.category,
      icon: HiBriefcase,
      href: project.github || "#projects",
      external: Boolean(project.github),
      keywords: `${project.category} ${project.techStack?.join(" ")}`,
    }));

    return [
      ...sectionActions,
      ...projectActions,
      ...(settings.cvUrl
        ? [{ label: "Download CV", detail: "Open résumé as PDF", icon: HiDocumentDownload, href: settings.cvUrl, external: true, keywords: "resume curriculum vitae" }]
        : []),
      ...(settings.github
        ? [{ label: "GitHub profile", detail: "View repositories", icon: FaGithub, href: settings.github, external: true, keywords: "code repository" }]
        : []),
      ...(settings.linkedin
        ? [{ label: "LinkedIn profile", detail: "Connect professionally", icon: FaLinkedin, href: settings.linkedin, external: true, keywords: "social network" }]
        : []),
    ];
  }, []);

  const filteredActions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return actions;
    return actions.filter((action) =>
      `${action.label} ${action.detail} ${action.keywords}`.toLowerCase().includes(normalizedQuery)
    );
  }, [actions, query]);

  useEffect(() => {
    const openPalette = () => {
      setQuery("");
      setSelectedIndex(0);
      setIsOpen(true);
    };
    const handleShortcut = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openPalette();
      } else if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("open-command-palette", openPalette);
    window.addEventListener("keydown", handleShortcut);
    return () => {
      window.removeEventListener("open-command-palette", openPalette);
      window.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const runAction = (action) => {
    if (!action) return;
    setIsOpen(false);
    if (action.external) {
      window.open(action.href, "_blank", "noopener,noreferrer");
    } else {
      document.querySelector(action.href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((current) => (current + 1) % Math.max(filteredActions.length, 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((current) => (current - 1 + filteredActions.length) % Math.max(filteredActions.length, 1));
    } else if (event.key === "Enter") {
      event.preventDefault();
      runAction(filteredActions[selectedIndex]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-start justify-center px-4 pt-[12vh] sm:pt-[16vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close command palette"
            className="absolute inset-0 cursor-default bg-[#020205]/80 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Quick navigation"
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-[#00D4FF]/25 bg-[#080811]/95 shadow-[0_0_80px_rgba(0,212,255,0.16),0_40px_100px_rgba(0,0,0,0.65)]"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-5">
              <HiSearch className="shrink-0 text-[#00D4FF]" size={22} />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleInputKeyDown}
                placeholder="Search sections, projects, or actions..."
                aria-label="Search portfolio actions"
                className="h-16 min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-gray-600"
              />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close command palette"
                className="rounded-lg p-2 text-gray-500 transition hover:bg-white/5 hover:text-white"
              >
                <HiX size={20} />
              </button>
            </div>

            <div className="max-h-[52vh] overflow-y-auto p-2" role="listbox">
              {filteredActions.length ? (
                filteredActions.map((action, index) => {
                  const Icon = action.icon;
                  const selected = index === selectedIndex;
                  return (
                    <button
                      type="button"
                      key={`${action.label}-${action.href}`}
                      role="option"
                      aria-selected={selected}
                      onMouseEnter={() => setSelectedIndex(index)}
                      onClick={() => runAction(action)}
                      className={`flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-left transition ${
                        selected
                          ? "bg-gradient-to-r from-[#00D4FF]/15 to-[#7C3AED]/15 text-white"
                          : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border ${
                        selected ? "border-[#00D4FF]/30 bg-[#00D4FF]/10 text-[#00D4FF]" : "border-white/10 bg-white/5"
                      }`}>
                        <Icon size={19} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold">{action.label}</span>
                        <span className="mt-0.5 block truncate text-xs text-gray-500">{action.detail}</span>
                      </span>
                      <HiArrowRight className={selected ? "text-[#00D4FF]" : "text-gray-700"} />
                    </button>
                  );
                })
              ) : (
                <div className="px-5 py-12 text-center">
                  <p className="font-medium text-gray-300">No matching command</p>
                  <p className="mt-1 text-sm text-gray-600">Try searching for projects, skills, or contact.</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-white/10 px-5 py-3 text-[11px] text-gray-600">
              <span>Quick access to the entire portfolio</span>
              <span className="hidden items-center gap-3 sm:flex">
                <span>↑↓ Navigate</span>
                <span>↵ Open</span>
                <span>Esc Close</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
