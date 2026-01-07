"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ScrollTrailText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const updatePosition = () => {
      const scrollY = window.scrollY;

      textRefs.current.forEach((el, i) => {
        if (!el) return;
        const lagFactor = (4 - i) * 0.02;

        gsap.to(el, {
          y: -scrollY * lagFactor * 1.5,
          overwrite: "auto",
          ease: "power2.out",
          duration: 0.5,
        });
      });
    };

    window.addEventListener("scroll", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition);
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
