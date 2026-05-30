"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ParallaxEffect({ children, className = "", speed = 0.5 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const centerX = innerWidth / 2;
      const centerY = innerHeight / 2;

      const moveX = (clientX - centerX) * speed;
      const moveY = (clientY - centerY) * speed;

      gsap.to(container, {
        x: moveX,
        y: moveY,
        duration: 1,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [speed]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
