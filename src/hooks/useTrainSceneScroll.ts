import { useEffect, useRef, useCallback } from "react";

export function useTrainSceneScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(0);
  const rafId = useRef<number | null>(null);
  const ticking = useRef(false);

  const calculateProgress = useCallback(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const containerHeight = containerRef.current.offsetHeight - windowHeight;

    let progress = 0;
    if (rect.top >= 0) {
      progress = 0;
    } else if (rect.top <= -containerHeight) {
      progress = 1;
    } else {
      progress = Math.max(0, Math.min(1, -rect.top / containerHeight));
    }

    scrollProgressRef.current = progress;
    ticking.current = false;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        rafId.current = requestAnimationFrame(calculateProgress);
        ticking.current = true;
      }
    };

    calculateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [calculateProgress]);

  // Return getter function instead of state to avoid re-renders
  const getScrollProgress = useCallback(() => scrollProgressRef.current, []);

  return { getScrollProgress, containerRef };
}
