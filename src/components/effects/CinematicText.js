"use client";
import { useEffect } from "react";

// Animate text as it enters the viewport without changing React-owned markup.
export default function CinematicText() {
  useEffect(() => {
    const root = document.querySelector("main");
    if (!root) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const seen = new WeakSet();
    const observed = new WeakSet();
    const running = new Set();
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      visible.forEach((entry, index) => {
        const element = entry.target;
        if (preference.matches || seen.has(element)) return;
        seen.add(element);
        observer.unobserve(element);
        const heading = /^H[1-3]$/.test(element.tagName);
        const animation = element.animate([
          { opacity: 0.55, translate: "0 8px" },
          { opacity: 1, translate: "0 0" },
        ], {
          duration: heading ? 850 : 750,
          delay: Math.min(index * 30, 90),
          easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
          fill: "none",
        });
        running.add(animation);
        animation.onfinish = () => running.delete(animation);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -25px 0px" });
    const scan = () => root.querySelectorAll("h1, h2, h3, p, label, summary").forEach(element => {
      // Word reveals have their own timing; do not animate their parent twice.
      if (observed.has(element) || element.matches(".sr-only") || element.closest('[aria-hidden="true"]') || element.querySelector("[data-cinematic-text]") || element.closest("#contact header")) return;
      observed.add(element);
      observer.observe(element);
    });
    const stop = () => { if (preference.matches) running.forEach(animation => animation.cancel()); };
    scan();
    const mutations = new MutationObserver(scan);
    mutations.observe(root, { childList: true, subtree: true });
    preference.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      mutations.disconnect();
      preference.removeEventListener("change", stop);
      running.forEach(animation => animation.cancel());
    };
  }, []);
  return null;
}
