"use client";

import { useEffect, useRef } from "react";

export default function ScrollTrailText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafId = useRef<number | null>(null);
  const lastScrollY = useRef(0);

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
          className="absolute text-center uppercase font-medium leading-[0.8]"
          style={{
            zIndex: i,
            color: i === 4 ? "#fff" : "transparent",
            WebkitTextStroke: i === 4 ? "none" : "1px #fff",
            opacity: i === 4 ? 1 : 0.4, // dimmer trails
            fontSize: "13.4vw", // Matching previous setup
            willChange: "transform",
          }}
        >
          Expont Mind
        </div>
      ))}
    </div>
  );
}
