"use client";

import { useEffect, useRef, useCallback } from "react";

interface CircleTransition {
  initial: { cx: number; cy: number; r: number };
  final: { cx: number; cy: number; r: number };
  outlineCircle?: SVGCircleElement;
  filledCircle?: SVGCircleElement;
}

export default function GeometricBackground() {
  const circleTransitionsRef = useRef<CircleTransition[]>([]);
  const gridLinesRef = useRef<SVGGElement>(null);
  const circlesOutlineRef = useRef<SVGGElement>(null);
  const circlesFilledRef = useRef<SVGGElement>(null);
  const glowCircleRef = useRef<HTMLDivElement>(null);

  const setupGeometricBackground = useCallback(() => {
    const gridLinesGroup = gridLinesRef.current;
    const circlesOutlineGroup = circlesOutlineRef.current;
    const circlesFilledGroup = circlesFilledRef.current;
    if (!gridLinesGroup || !circlesOutlineGroup || !circlesFilledGroup) return;

    // Clear existing elements
    gridLinesGroup.innerHTML = "";
    circlesOutlineGroup.innerHTML = "";
    circlesFilledGroup.innerHTML = "";

    const gridSpacing = 48;
    for (let i = 0; i <= 40; i++) {
      const vLine = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      vLine.setAttribute("class", "grid-line");
      vLine.setAttribute("x1", String(i * gridSpacing));
      vLine.setAttribute("y1", "0");
      vLine.setAttribute("x2", String(i * gridSpacing));
      vLine.setAttribute("y2", "1080");
      vLine.setAttribute("stroke", "rgba(245, 245, 245, 0.15)");
      vLine.setAttribute("stroke-width", "1");
      vLine.setAttribute("stroke-opacity", "0.3");
      gridLinesGroup.appendChild(vLine);

      if (i <= 22) {
        const hLine = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        hLine.setAttribute("class", "grid-line");
        hLine.setAttribute("x1", "0");
        hLine.setAttribute("y1", String(i * gridSpacing));
        hLine.setAttribute("x2", "1920");
        hLine.setAttribute("y2", String(i * gridSpacing));
        hLine.setAttribute("stroke", "rgba(245, 245, 245, 0.15)");
        hLine.setAttribute("stroke-width", "1");
        hLine.setAttribute("stroke-opacity", "0.3");
        gridLinesGroup.appendChild(hLine);
      }
    }

    const d = 80;
    const centerX = 960;
    const centerY = 540;
    const transitions: CircleTransition[] = [
      {
        initial: { cx: centerX - 3 * d, cy: centerY, r: d * 0.8 },
        final: { cx: centerX, cy: centerY, r: 4 * d },
      },
      {
        initial: { cx: centerX + 3 * d, cy: centerY, r: d * 0.8 },
        final: { cx: centerX, cy: centerY, r: 4 * d },
      },
      {
        initial: { cx: centerX, cy: centerY - 3 * d, r: d * 0.8 },
        final: { cx: centerX, cy: centerY, r: 4 * d },
      },
      {
        initial: { cx: centerX, cy: centerY + 3 * d, r: d * 0.8 },
        final: { cx: centerX, cy: centerY, r: 4 * d },
      },
      {
        initial: { cx: centerX - 2 * d, cy: centerY - 2 * d, r: d * 0.6 },
        final: { cx: centerX, cy: centerY, r: 4 * d },
      },
      {
        initial: { cx: centerX + 2 * d, cy: centerY - 2 * d, r: d * 0.6 },
        final: { cx: centerX, cy: centerY, r: 4 * d },
      },
      {
        initial: { cx: centerX - 2 * d, cy: centerY + 2 * d, r: d * 0.6 },
        final: { cx: centerX, cy: centerY, r: 4 * d },
      },
      {
        initial: { cx: centerX + 2 * d, cy: centerY + 2 * d, r: d * 0.6 },
        final: { cx: centerX, cy: centerY, r: 4 * d },
      },
      {
        initial: { cx: centerX - 4 * d, cy: centerY, r: d * 0.4 },
        final: { cx: centerX, cy: centerY, r: 4 * d },
      },
      {
        initial: { cx: centerX + 4 * d, cy: centerY, r: d * 0.4 },
        final: { cx: centerX, cy: centerY, r: 4 * d },
      },
      {
        initial: { cx: centerX, cy: centerY - 4 * d, r: d * 0.4 },
        final: { cx: centerX, cy: centerY, r: 4 * d },
      },
      {
        initial: { cx: centerX, cy: centerY + 4 * d, r: d * 0.4 },
        final: { cx: centerX, cy: centerY, r: 4 * d },
      },
      {
        initial: { cx: centerX, cy: centerY, r: d * 0.3 },
        final: { cx: centerX, cy: centerY, r: 4 * d },
      },
    ];

    transitions.forEach((transition) => {
      const circleOutline = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      circleOutline.setAttribute("cx", String(transition.initial.cx));
      circleOutline.setAttribute("cy", String(transition.initial.cy));
      circleOutline.setAttribute("r", String(transition.initial.r));
      circleOutline.setAttribute("stroke", "rgba(245, 245, 245, 0.3)");
      circleOutline.setAttribute("stroke-width", "1");
      circleOutline.setAttribute("fill", "none");
      circlesOutlineGroup.appendChild(circleOutline);

      const circleFilled = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      circleFilled.setAttribute("cx", String(transition.initial.cx));
      circleFilled.setAttribute("cy", String(transition.initial.cy));
      circleFilled.setAttribute("r", String(transition.initial.r));
      circleFilled.setAttribute("stroke", "rgba(245, 245, 245, 0.3)");
      circleFilled.setAttribute("stroke-width", "1");
      circleFilled.setAttribute("fill", "rgba(245, 245, 245, 0.05)");
      circlesFilledGroup.appendChild(circleFilled);

      transition.outlineCircle = circleOutline;
      transition.filledCircle = circleFilled;
    });

    circleTransitionsRef.current = transitions;
  }, []);

  const updateAnimations = useCallback(() => {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollY / maxScroll, 1);

    // Circle glow animation
    if (glowCircleRef.current) {
      const scale = 1 + progress * 1.8;
      const shadowSize = progress * 150;
      const shadowSpread = progress * 35;
      const shadowOpacity = progress;
      glowCircleRef.current.style.transform = `scale(${scale})`;
      glowCircleRef.current.style.boxShadow = `0 0 ${shadowSize}px ${shadowSpread}px rgba(255, 255, 0, ${shadowOpacity})`;
    }

    // Grid opacity
    const gridOpacity = Math.max(0, 0.3 * (1 - progress * 1.5));
    document.querySelectorAll(".grid-line").forEach((line) => {
      line.setAttribute("stroke-opacity", String(gridOpacity));
    });

    // Circle transitions
    circleTransitionsRef.current.forEach((transition, index) => {
      const currentCx =
        transition.initial.cx +
        (transition.final.cx - transition.initial.cx) * progress;
      const currentCy =
        transition.initial.cy +
        (transition.final.cy - transition.initial.cy) * progress;
      const currentR =
        transition.initial.r +
        (transition.final.r - transition.initial.r) * progress;
      const rotation = progress * 360 * (index % 2 === 0 ? 1 : -1);
      const opacity = Math.max(0.1, 1 - progress * 0.7);

      if (transition.outlineCircle) {
        transition.outlineCircle.setAttribute("cx", String(currentCx));
        transition.outlineCircle.setAttribute("cy", String(currentCy));
        transition.outlineCircle.setAttribute("r", String(currentR));
        transition.outlineCircle.setAttribute(
          "transform",
          `rotate(${rotation} ${currentCx} ${currentCy})`
        );
        transition.outlineCircle.setAttribute(
          "stroke-opacity",
          String(opacity)
        );
      }
      if (transition.filledCircle) {
        transition.filledCircle.setAttribute("cx", String(currentCx));
        transition.filledCircle.setAttribute("cy", String(currentCy));
        transition.filledCircle.setAttribute("r", String(currentR));
        transition.filledCircle.setAttribute(
          "transform",
          `rotate(${rotation} ${currentCx} ${currentCy})`
        );
        transition.filledCircle.setAttribute(
          "fill-opacity",
          String(opacity * 0.05)
        );
      }
    });
  }, []);

  useEffect(() => {
    setupGeometricBackground();

    const handleScroll = () => {
      requestAnimationFrame(updateAnimations);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateAnimations();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setupGeometricBackground, updateAnimations]);

  return (
    <>
      {/* Geometric Background */}
      <div className="fixed inset-0 z-[5] pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
        >
          <g ref={gridLinesRef} />
          <g ref={circlesOutlineRef} />
          <g ref={circlesFilledRef} />
        </svg>
      </div>

      {/* Center Glow Circle */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[6] flex items-center justify-center pointer-events-none">
        <div
          ref={glowCircleRef}
          className="w-20 h-20 bg-white rounded-full"
          style={{ transformOrigin: "center center" }}
        />
      </div>
    </>
  );
}
