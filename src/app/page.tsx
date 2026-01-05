"use client";

import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { Scene } from "@/components/Scene";
import { SceneText } from "@/components/SceneText";
import WhatWeDo from "@/components/WhatWeDo";
import WaterDistortion from "@/components/WaterDistortion";
import Aurelia from "@/components/Aurelia";
import { Partners } from "@/components/Partners";
import Footer from "@/components/navigation/Footer";

const CloudScene = dynamic(
  () => import("@/components/CloudScene").then((mod) => mod.CloudScene),
  { ssr: false }
);

function useAureliaVisibility() {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Aurelia 150vh-аас эхэлж fade-in, 200vh-д бүрэн харагдана
      const fadeStart = windowHeight * 1.5;
      const fadeEnd = windowHeight * 2.0;

      if (scrollY < fadeStart) {
        setOpacity(0);
      } else if (scrollY >= fadeEnd) {
        setOpacity(1);
      } else {
        const progress = (scrollY - fadeStart) / (fadeEnd - fadeStart);
        setOpacity(progress);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return opacity;
}

export default function Home() {
  const aureliaOpacity = useAureliaVisibility();

  return (
    <div className="w-screen min-h-[500vh] p-0 m-0 bg-[#0f0a0a] font-mono overflow-x-hidden">
      <SceneText />

      <div className="fixed top-0 left-0 h-screen w-screen z-0 bg-[#0f0a0a]">
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
          }}
          camera={{ position: [0, -80, 60], fov: 45 }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Aurelia + Water Effect background (z-index: 0, fade in on scroll) */}
      <div
        className="fixed top-0 left-0 h-screen w-screen z-0"
        style={{
          opacity: aureliaOpacity,
          transition: "opacity 0.3s ease-out",
          pointerEvents: "none",
        }}
      >
        {/* Dark overlay for Aurelia background */}
        <div className="absolute inset-0 z-5" />
        {/* Aurelia jellyfish */}
        <Aurelia className="w-full h-full" />

        <div className="absolute inset-0 z-10 pointer-events-none">
          <WaterDistortion
            className="w-full h-full"
            effectOnly={true}
            blueish={0.6}
            scale={6}
            illumination={0.6}
          />
        </div>
      </div>

      <div className="fixed top-0 left-0 h-[200vh] w-screen p-0 m-0 cloud-gradient cloud-fade-overlay">
        <CloudScene />
      </div>

      <div className="h-[500vh]" />

      <WhatWeDo />

      <Partners />

      {/* <div className="relative w-full h-[400vh] z-10 bg-black">
        <p className="text-4xl md:text-6xl lg:text-7xl font-normal text-white tracking-wide uppercase px-24">
          Featured projects
        </p>
        <div className="sticky top-0 h-screen w-full">
          <TrainScene usePageScroll scrollProgress={scrollProgress} />
        </div>
      </div> */}

      <Footer />
    </div>
  );
}
