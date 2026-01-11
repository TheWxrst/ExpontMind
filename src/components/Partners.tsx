"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

// Partner logos - using actual logo images
const partners = [
  { name: "Porsche", logo: "/partners/porsche.svg" },
  { name: "Wallpaper", logo: "/partners/wallpaper.svg" },
  { name: "Coca-Cola", logo: "/partners/cocacola.svg" },
  { name: "Apple", logo: "/partners/apple.svg" },
  { name: "Webby Awards", logo: "/partners/webby.svg" },
  { name: "Element", logo: "/partners/element.svg" },
  { name: "Hyundai", logo: "/partners/hyundai.svg" },
  { name: "Coca-Cola 2", logo: "/partners/cocacola.svg" },
  { name: "Awwwards", logo: "/partners/awwwards.svg" },
];

// Logo component with fade-in animation
const LogoItem = ({
  partner,
  index,
}: {
  partner: { name: string; logo: string };
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="flex items-center justify-center p-4 sm:p-6 md:p-8"
  >
    <div className="relative w-20 h-10 sm:w-28 sm:h-14 md:w-36 md:h-16 opacity-70 hover:opacity-100 transition-opacity duration-300">
      <Image
        src={partner.logo}
        alt={partner.name}
        fill
        className="object-contain brightness-0 invert"
      />
    </div>
  </motion.div>
);

// Text logo fallback
const TextLogo = ({ name, index }: { name: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="flex items-center justify-center p-4 sm:p-6 md:p-8"
  >
    <span className="text-white/70 hover:text-white text-xs sm:text-sm md:text-lg font-light tracking-[0.2em] uppercase whitespace-nowrap transition-colors duration-300">
      {name}
    </span>
  </motion.div>
);

// Grid of partners for mobile
const PartnersGrid = () => {
  const partnerNames = [
    "PORSCHE",
    "WALLPAPER*",
    "COCA-COLA",
    "APPLE",
    "WEBBY",
    "ELEMENT",
    "HYUNDAI",
    "COCA-COLA",
    "AWWWARDS",
  ];

  return (
    <div className="grid grid-cols-3 gap-y-12 sm:gap-y-16 w-full max-w-md sm:max-w-2xl md:max-w-4xl mx-auto px-4">
      {partnerNames.map((name, index) => (
        <TextLogo key={`${name}-${index}`} name={name} index={index} />
      ))}
    </div>
  );
};

// Marquee row for desktop
const MarqueeRow = ({
  items,
  direction = "left",
  speed = 20,
}: {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
}) => {
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="hidden md:flex overflow-hidden">
      <motion.div
        className="flex"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex items-center justify-center px-8 md:px-12 py-4"
          >
            <span className="text-white/70 hover:text-white text-lg md:text-xl lg:text-2xl font-light tracking-[0.2em] uppercase whitespace-nowrap transition-colors duration-300">
              {item}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const Partners = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  const row1 = ["PORSCHE", "WALLPAPER*", "COCA-COLA", "APPLE", "WEBBY"];
  const row2 = ["HYUNDAI", "GOOGLE", "ELEMENT", "AWWWARDS", "NVIDIA"];
  const row3 = ["STANFORD", "SONY", "MAX MARA", "CALVIN KLEIN", "NEXUS"];

  return (
    <div className="relative w-full z-10">
      {/* Gradient transition */}
      <div className="h-[50vh] sm:h-screen w-full bg-linear-to-b from-transparent via-black/50 to-black" />

      <div
        ref={containerRef}
        className="relative z-10 min-h-screen w-full bg-black py-16 sm:py-24 md:py-32"
      >
        <motion.div
          style={{ opacity, y }}
          className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24"
        >
          {/* Header - Mobile: Centered, Desktop: Split */}
          <div className="w-full flex flex-col items-center text-center md:items-start md:text-left md:flex-row md:justify-between px-6 sm:px-12 md:px-24 gap-6 md:gap-0">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white tracking-wide uppercase leading-tight">
              CLIENTS WE
              <br />
              WORK WITH
            </h2>
            <p className="text-white/60 text-xs sm:text-sm font-light uppercase tracking-wider max-w-xs md:text-right leading-relaxed">
              WE CAN&apos;T WAIT TO SHOW YOU WHAT WE
              <br className="hidden sm:block" />
              CAN DO FOR YOU AND YOUR BRAND.
            </p>
          </div>

          {/* Mobile: Grid layout */}
          <div className="md:hidden w-full">
            <PartnersGrid />
          </div>

          {/* Desktop: Marquee rows */}
          <div className="hidden md:flex flex-col gap-16 w-full">
            <MarqueeRow items={row1} direction="left" speed={25} />
            <MarqueeRow items={row2} direction="right" speed={30} />
            <MarqueeRow items={row3} direction="left" speed={22} />
          </div>

          {/* Gradient overlays for fade effect - Desktop only */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-linear-to-r from-black to-transparent hidden md:block" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-linear-to-l from-black to-transparent hidden md:block" />
        </motion.div>
      </div>
    </div>
  );
};
