"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "@/lib/gsap";

// Responsive menu dimensions based on screen size
const getMenuDimensions = () => {
  if (typeof window === "undefined")
    return { width: "480px", height: "500px", top: "-25px", right: "-25px" };
  const w = window.innerWidth;
  if (w < 640)
    return {
      width: "calc(100vw - 10px)",
      height: "auto",
      top: "-10px",
      right: "-10px",
    };
  if (w < 768)
    return { width: "320px", height: "auto", top: "-15px", right: "-15px" };
  return { width: "480px", height: "auto", top: "-25px", right: "-25px" };
};

const links = [
  { title: "Home", href: "#", action: "scroll-top" },
  { title: "Projects", href: "#projects", action: "scroll" },
  { title: "Contact", href: "#contact", action: "scroll" },
  {
    title: "Let's Talk",
    href: "mailto:expontmindsolutions@gmail.com",
    action: "email",
  },
];

const footerLinks = [
  { title: "Facebook", href: "/" },
  { title: "LinkedIn", href: "/" },
  { title: "Instagram", href: "/" },
  { title: "Twitter", href: "/" },
];

const getMenuVariants = (dims: ReturnType<typeof getMenuDimensions>) => ({
  open: {
    width: dims.width,
    height: dims.height,
    top: dims.top,
    right: dims.right,
    transition: {
      duration: 0.75,
      type: "tween" as const,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  },
  closed: {
    width: "100px",
    height: "40px",
    top: "0px",
    right: "0px",
    transition: {
      duration: 0.75,
      delay: 0.35,
      type: "tween" as const,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  },
});

const perspective = {
  initial: {
    opacity: 0,
    rotateX: 90,
    translateY: 80,
    translateX: -20,
  },
  enter: (i: number) => ({
    opacity: 1,
    rotateX: 0,
    translateY: 0,
    translateX: 0,
    transition: {
      duration: 0.65,
      delay: 0.5 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
      opacity: { duration: 0.35 },
    },
  }),
  exit: {
    opacity: 0,
    transition: {
      duration: 0.75,
      type: "tween" as const,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  },
};

const slideIn = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.75 + i * 0.1,
      ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
    },
  }),
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      type: "tween" as const,
      ease: "easeInOut" as const,
    },
  },
};

function PerspectiveText({
  label,
  textColor = "text-black",
}: {
  label: string;
  textColor?: string;
}) {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <p className={`m-0 uppercase pointer-events-none ${textColor}`}>
        {label}
      </p>
    </div>
  );
}

function MenuButton({
  isActive,
  toggleMenu,
}: {
  isActive: boolean;
  toggleMenu: () => void;
}) {
  return (
    <div className="absolute top-0 right-0 w-[100px] h-[40px] cursor-pointer rounded-[25px] overflow-hidden">
      <motion.div
        className="relative w-full h-full"
        animate={{ top: isActive ? "-100%" : "0%" }}
        transition={{
          duration: 0.5,
          type: "tween" as const,
          ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
        }}
      >
        <div
          className="group w-full h-full bg-white flex items-center justify-center"
          onClick={toggleMenu}
        >
          <PerspectiveText label="Menu" />
        </div>
        <div
          className="group w-full h-full bg-black flex items-center justify-center text-white"
          onClick={toggleMenu}
        >
          <PerspectiveText label="Close" textColor="text-white" />
        </div>
      </motion.div>
    </div>
  );
}

function Nav({ onClose }: { onClose: () => void }) {
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: (typeof links)[0]
  ) => {
    if (link.action === "scroll-top") {
      e.preventDefault();
      onClose();
      setTimeout(() => {
        gsap.to(window, {
          duration: 1.2,
          scrollTo: { y: 0 },
          ease: "power3.inOut",
        });
      }, 300);
    } else if (link.action === "scroll") {
      e.preventDefault();
      onClose();
      setTimeout(() => {
        const element = document.querySelector(link.href);
        if (element) {
          gsap.to(window, {
            duration: 1.2,
            scrollTo: { y: element, offsetY: 0 },
            ease: "power3.inOut",
          });
        }
      }, 300);
    } else if (link.action === "email") {
      onClose();
    }
  };

  return (
    <div className="flex flex-col gap-10 justify-between px-6 sm:px-8 md:px-10 pt-[60px] sm:pt-[80px] md:pt-[100px] pb-[30px] sm:pb-[40px] md:pb-[50px] h-full box-border">
      <div className="flex flex-col gap-[8px] sm:gap-[10px]">
        {links.map((link, i) => (
          <div
            key={`b_${i}`}
            className="perspective-[120px] perspective-origin-bottom"
          >
            <motion.div
              custom={i}
              variants={perspective}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              <a
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                className="text-black no-underline text-[28px] sm:text-[36px] md:text-[46px]"
              >
                {link.title}
              </a>
            </motion.div>
          </div>
        ))}
      </div>
      <motion.div className="flex flex-wrap">
        {footerLinks.map((link, i) => (
          <motion.a
            href={link.href}
            variants={slideIn}
            custom={i}
            initial="initial"
            animate="enter"
            exit="exit"
            key={`f_${i}`}
            className="w-1/2 mt-[5px] no-underline text-black text-sm sm:text-base"
          >
            {link.title}
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}

export default function SideMenu() {
  const [isActive, setIsActive] = useState(false);
  const [menuDims, setMenuDims] = useState(getMenuDimensions());

  useEffect(() => {
    const handleResize = () => setMenuDims(getMenuDimensions());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuVariants = getMenuVariants(menuDims);

  return (
    <div className="fixed right-4 top-4 sm:right-[30px] sm:top-[30px] md:right-[50px] md:top-[50px] z-100">
      <motion.div
        className="bg-white rounded-[25px] relative"
        variants={menuVariants}
        animate={isActive ? "open" : "closed"}
        initial="closed"
      >
        <AnimatePresence>
          {isActive && <Nav onClose={() => setIsActive(false)} />}
        </AnimatePresence>
      </motion.div>
      <MenuButton
        isActive={isActive}
        toggleMenu={() => setIsActive(!isActive)}
      />
    </div>
  );
}
