"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Observer } from "gsap/all";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer);
}

export { gsap, ScrollTrigger, ScrollToPlugin, Observer };

export const EASING = {
  cameraMove: "power2.out",
  sectionTransition: "expo.inOut",
  fadeScale: "power3.inOut",
  scrub: "none",
} as const;

export const SCROLL_CONFIG = {
  scrub: 1,
  anticipatePin: 1,
} as const;
