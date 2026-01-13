"use client";

import { useEffect, useRef, useState } from "react";

// Responsive font size
const getResponsiveFontSize = () => {
  if (typeof window === "undefined") return "13vw";
  return window.innerWidth < 640 ? "11vw" : "13vw";
};

export default function ScrollTrailText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafId = useRef<number | null>(null);
  const lastScrollY = useRef(0);
  // Use consistent initial value to avoid hydration mismatch
  const [fontSize, setFontSize] = useState("13vw");

  // Handle resize for responsive font size - also set initial value on mount
  useEffect(() => {
    setFontSize(getResponsiveFontSize());
    const handleResize = () => setFontSize(getResponsiveFontSize());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let ticking = false;

    const updatePosition = () => {
      const scrollY = lastScrollY.current;

      textRefs.current.forEach((el, i) => {
        if (!el) return;
        const lagFactor = (4 - i) * 0.02;
        // Direct transform instead of GSAP for better perf
        el.style.transform = `translateY(${-scrollY * lagFactor * 1.5}px)`;
      });

      ticking = false;
    };

    const onScroll = () => {
      lastScrollY.current = window.scrollY;

      if (!ticking) {
        rafId.current = requestAnimationFrame(updatePosition);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center pointer-events-none"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          ref={(el) => {
            textRefs.current[i] = el;
          }}
          className="absolute text-center uppercase font-medium leading-[0.8] font-pixel"
          style={{
            zIndex: i,
            color: i === 4 ? "#fff" : "transparent",
            WebkitTextStroke: i === 4 ? "none" : "1px #fff",
            opacity: i === 4 ? 1 : 0.4, // dimmer trails
            fontSize, // Responsive font size
            willChange: "transform",
          }}
        >
          Expont Mind
        </div>
      ))}
    </div>
  );
}
