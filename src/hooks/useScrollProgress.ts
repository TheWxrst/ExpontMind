import { useRef, useEffect, useCallback } from "react";

/**
 * Hook for tracking scroll progress without causing React re-renders
 * Uses refs instead of state to avoid performance issues
 *
 * @param containerRef - Reference to the container element to track
 * @param onProgress - Optional callback called with progress value (0-1)
 * @returns Ref containing current progress value
 */
export function useScrollProgress(
  containerRef: React.RefObject<HTMLElement | null>,
  onProgress?: (progress: number) => void
) {
  const progressRef = useRef(0);

  const handleScroll = useCallback(() => {
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

    progressRef.current = progress;
    onProgress?.(progress);
  }, [containerRef, onProgress]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return progressRef;
}

/**
 * Hook for tracking global scroll position without re-renders
 * @param onScroll - Optional callback with scrollY value
 * @returns Ref containing current scrollY
 */
export function useScrollY(onScroll?: (scrollY: number) => void) {
  const scrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
      onScroll?.(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [onScroll]);

  return scrollYRef;
}
