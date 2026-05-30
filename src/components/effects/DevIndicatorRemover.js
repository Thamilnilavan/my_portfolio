"use client";
import { useEffect } from "react";

export default function DevIndicatorRemover() {
  useEffect(() => {
    // Remove Turbopack badge and other Next.js development indicators
    const removeDevIndicators = () => {
      const selectors = [
        '[data-nextjs-dev-indicator]',
        '[data-nextjs-route-watchers]',
        '[data-nextjs-devtools-banner]',
        '[data-nextjs-build-activity]',
        'div[class*="nextjs"]',
        'span[class*="nextjs"]',
        'div[style*="position: fixed"][style*="bottom: 0"][style*="right: 0"]',
        'div[style*="position:fixed"][style*="bottom:0"][style*="right:0"]',
        'body > div[style*="position: fixed"][style*="bottom"]',
        'body > div[style*="position:fixed"][style*="bottom"]',
        '[class*="turbopack"]',
        '[class*="Turbopack"]',
        '[class*="TURBOPACK"]',
      ];

      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          el.style.display = 'none';
          el.style.visibility = 'hidden';
          el.style.opacity = '0';
        });
      });
    };

    // Run immediately and periodically to catch dynamically injected elements
    removeDevIndicators();
    const interval = setInterval(removeDevIndicators, 1000);

    return () => clearInterval(interval);
  }, []);

  return null;
}
