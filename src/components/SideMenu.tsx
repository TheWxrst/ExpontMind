"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { SERVICES, INDUSTRIES } from "@/lib/seo/constants";

// Default dimensions (used for SSR and initial state)
const defaultMenuDims = {
  width: "480px",
  height: "auto",
  top: "-25px",
  right: "-25px",
};

// Responsive menu dimensions based on screen size
const getMenuDimensions = () => {
  if (typeof window === "undefined") return defaultMenuDims;
  const w = window.innerWidth;
  if (w < 640)
    return {
      width: "calc(100vw - 10px)",
      height: "auto",
      top: "-10px",
      right: "-10px",
    };
  if (w < 768)
    return { width: "360px", height: "auto", top: "-15px", right: "-15px" };
  return { width: "520px", height: "auto", top: "-25px", right: "-25px" };
};

type MenuView = "main" | "services" | "industries";

const mainLinks = [
  { title: "HOME", href: "/", action: "navigate" },
  { title: "SERVICES", href: "/services", action: "submenu", submenu: "services" as const },
  { title: "INDUSTRIES", href: "/industries", action: "submenu", submenu: "industries" as const },
  { title: "WORK", href: "/work", action: "navigate" },
  { title: "BLOG", href: "/blog", action: "navigate" },
  { title: "CONTACT", href: "/contact", action: "navigate" },
];

const serviceLinks = Object.values(SERVICES).map((service) => ({
  title: service.name.toUpperCase(),
  href: `/services/${service.slug}`,
}));

const industryLinks = Object.values(INDUSTRIES).map((industry) => ({
  title: industry.name.toUpperCase(),
  href: `/industries/${industry.slug}`,
}));

const footerLinks = [
  { title: "Twitter", href: "https://twitter.com/expontmind" },
  { title: "LinkedIn", href: "https://linkedin.com/company/expontmind" },
  { title: "Instagram", href: "https://instagram.com/expontmind" },
  { title: "GitHub", href: "https://github.com/expontmind" },
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

// Text reveal animation variants for each character
const charReveal = {
  initial: {
    y: "100%",
    opacity: 0,
  },
  enter: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.03,
      ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
    },
  }),
  exit: {
    y: "-100%",
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  },
};

// Animated link text component with character reveal
function AnimatedLinkText({
  text,
  linkIndex,
}: {
  text: string;
  linkIndex: number;
}) {
  return (
    <span className="flex overflow-hidden">
      {text.split("").map((char, charIndex) => (
        <motion.span
          key={charIndex}
          custom={linkIndex * 5 + charIndex}
          variants={charReveal}
          initial="initial"
          animate="enter"
          exit="exit"
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

function Nav({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<MenuView>("main");

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: (typeof mainLinks)[0]
  ) => {
    if (link.action === "submenu" && link.submenu) {
      e.preventDefault();
      setCurrentView(link.submenu);
    } else if (link.action === "navigate") {
      e.preventDefault();
      onClose();
      setTimeout(() => {
        router.push(link.href);
      }, 300);
    }
  };

  const handleSubLinkClick = (href: string) => {
    onClose();
    setTimeout(() => {
      router.push(href);
    }, 300);
  };

  const renderMainNav = () => (
    <>
      <div className="flex flex-col gap-[6px] sm:gap-[8px]">
        {mainLinks.map((link, i) => (
          <div key={`b_${i}`} className="overflow-hidden">
            <a
              href={link.href}
              onClick={(e) => handleLinkClick(e, link)}
              className="text-black no-underline text-[24px] sm:text-[32px] md:text-[40px] block flex items-center justify-between group"
            >
              <AnimatedLinkText text={link.title} linkIndex={i} />
              {link.action === "submenu" && (
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              )}
            </a>
          </div>
        ))}
      </div>
      <motion.div className="flex flex-wrap">
        {footerLinks.map((link, i) => (
          <motion.a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            variants={slideIn}
            custom={i}
            initial="initial"
            animate="enter"
            exit="exit"
            key={`f_${i}`}
            className="w-1/2 mt-[5px] no-underline text-black text-sm sm:text-base hover:underline"
          >
            {link.title}
          </motion.a>
        ))}
      </motion.div>
    </>
  );

  const renderSubNav = (
    title: string,
    links: { title: string; href: string }[],
    parentHref: string
  ) => (
    <>
      <div className="flex flex-col gap-[6px] sm:gap-[8px]">
        <button
          onClick={() => setCurrentView("main")}
          className="text-stone-500 text-sm uppercase flex items-center gap-2 mb-4 hover:text-black transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Back
        </button>

        <div className="overflow-hidden mb-4">
          <Link
            href={parentHref}
            onClick={() => handleSubLinkClick(parentHref)}
            className="text-black no-underline text-[20px] sm:text-[26px] md:text-[32px] block font-medium"
          >
            ALL {title}
          </Link>
        </div>

        {links.map((link, i) => (
          <div key={`s_${i}`} className="overflow-hidden">
            <Link
              href={link.href}
              onClick={() => handleSubLinkClick(link.href)}
              className="text-stone-700 hover:text-black no-underline text-[18px] sm:text-[22px] md:text-[26px] block transition-colors"
            >
              <AnimatedLinkText text={link.title} linkIndex={i} />
            </Link>
          </div>
        ))}
      </div>

      <motion.div
        className="mt-auto pt-6 border-t border-stone-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          href="/contact"
          onClick={() => handleSubLinkClick("/contact")}
          className="text-black font-medium hover:underline"
        >
          Get a Quote
        </Link>
      </motion.div>
    </>
  );

  return (
    <div className="flex flex-col gap-8 justify-between px-6 sm:px-8 md:px-10 pt-[60px] sm:pt-[80px] md:pt-[100px] pb-[30px] sm:pb-[40px] md:pb-[50px] h-full box-border min-h-[400px]">
      <AnimatePresence mode="wait">
        {currentView === "main" && (
          <motion.div
            key="main"
            className="flex flex-col gap-10 justify-between flex-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderMainNav()}
          </motion.div>
        )}

        {currentView === "services" && (
          <motion.div
            key="services"
            className="flex flex-col gap-6 justify-between flex-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            {renderSubNav("SERVICES", serviceLinks, "/services")}
          </motion.div>
        )}

        {currentView === "industries" && (
          <motion.div
            key="industries"
            className="flex flex-col gap-6 justify-between flex-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            {renderSubNav("INDUSTRIES", industryLinks, "/industries")}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SideMenu() {
  const [isActive, setIsActive] = useState(false);
  // Use default dimensions initially to avoid hydration mismatch
  const [menuDims, setMenuDims] = useState(defaultMenuDims);

  useEffect(() => {
    // Set correct dimensions on mount
    setMenuDims(getMenuDimensions());
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
