"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useCallback, useState } from "react";

// Check if mobile
const isMobile = () => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 640;
};

// Get responsive card dimensions based on screen size
const getCardDimensions = () => {
  if (typeof window === "undefined") return { width: 320, height: 480, gap: 24 };
  const w = window.innerWidth;
  if (w < 480) return { width: 260, height: 390, gap: 40 };
  if (w < 640) return { width: 280, height: 420, gap: 40 };
  if (w < 768) return { width: 280, height: 420, gap: 20 };
  return { width: 320, height: 480, gap: 24 };
};

const HolographicCard = dynamic(() => import("@/components/HolographicCard"), {
  ssr: false,
});

const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

interface CardData {
  text: string;
  label: string;
  descTop: string;
  descBottom: string;
}

interface CardStackProps {
  cards?: CardData[];
  className?: string;
}

// Mobile card component - flips once when entering viewport (no state)
function MobileCard({
  card,
  cardDims,
  index,
}: {
  card: CardData;
  cardDims: { width: number; height: number; gap: number };
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const hasFlippedRef = useRef(false);

  useEffect(() => {
    const cardEl = cardRef.current;
    const innerEl = innerRef.current;
    if (!cardEl || !innerEl) return;

    // Use IntersectionObserver to detect when card enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasFlippedRef.current) {
            hasFlippedRef.current = true;
            // Add staggered delay based on index for visual effect
            setTimeout(() => {
              innerEl.style.transform = "rotateY(0deg)";
            }, index * 100);
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of card is visible
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    observer.observe(cardEl);

    return () => {
      observer.disconnect();
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      style={{
        width: `${cardDims.width}px`,
        height: `${cardDims.height}px`,
        perspective: "1200px",
      }}
    >
      <div
        ref={innerRef}
        style={{
          width: "100%",
          height: "100%",
          transform: "rotateY(180deg)",
          transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transformStyle: "preserve-3d",
        }}
      >
        <HolographicCard
          text={card.text}
          label={card.label}
          descTop={card.descTop}
          descBottom={card.descBottom}
          autoRotate={false}
          externalRotationY={0}
          color0={[180, 200, 210]}
          color1={[220, 240, 255]}
        />
      </div>
    </div>
  );
}

const defaultCards: CardData[] = [
  {
    text: "CODE",
    label: "EXPERIENCE",
    descTop: "Precision engineering fused with",
    descBottom: "creativity for flawless performance",
  },
  {
    text: "3D",
    label: "INTERACTIVE",
    descTop: "Immersive visuals and realtime",
    descBottom: "interaction that truly stand out",
  },
  {
    text: "AI",
    label: "AUTOMATION",
    descTop: "Automation and intelligence that",
    descBottom: "elevate every digital experience",
  },
  {
    text: "UXUI",
    label: "CREATIVE",
    descTop: "Premium, intuitive interfaces",
    descBottom: "crafted for effortless user journeys",
  },
];

export function CardStack({
  cards = defaultCards,
  className = "",
}: CardStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [cardDims, setCardDims] = useState({ width: 320, height: 480, gap: 24 });
  const [mobile, setMobile] = useState(false); // Default false for SSR

  // Initialize and update dimensions on client
  useEffect(() => {
    // Set initial values on client
    setCardDims(getCardDimensions());
    setMobile(isMobile());

    const handleResize = () => {
      setCardDims(getCardDimensions());
      setMobile(isMobile());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Current and target values for smooth animation
  const scrollProgressRef = useRef(0);
  const targetScrollProgressRef = useRef(0);
  const rafRef = useRef<number>(0);

  // Store card rotations in refs (no re-render)
  // Start at 180° (showing back of card)
  const cardRotationsRef = useRef<number[]>(cards.map(() => 180));
  const targetCardRotationsRef = useRef<number[]>(cards.map(() => 180));

  // Store HolographicCard update functions
  const cardUpdateFnsRef = useRef<((rotation: number) => void)[]>([]);

  // Calculate card transform based on progress
  const updateCardTransforms = useCallback(
    (progress: number) => {
      const totalCards = cards.length;
      const cardWidth = cardDims.width;
      const gap = cardDims.gap;

      // Phase 1: 0 to 0.25 - spread out to row
      // Phase 2: 0.25 to 0.75 - flip cards with delay (bounce effect) - 50% of scroll
      // Phase 3: 0.75 to 1.0 - hold position (100vh scroll)
      const spreadProgress = Math.min(progress / 0.25, 1);
      const flipProgress = Math.max(Math.min((progress - 0.25) / 0.5, 1), 0);

      cardRefs.current.forEach((cardEl, index) => {
        if (!cardEl) return;

        // Final positions (spread out in a row)
        const totalWidth = (totalCards - 1) * (cardWidth + gap);
        const startX = -totalWidth / 2;
        const finalX = startX + index * (cardWidth + gap);

        // Initial stacked position - fan out like playing cards (centered)
        const centerOffset = ((totalCards - 1) / 2) * 15;
        const initialX = index * -8 - centerOffset; // Centered horizontal offset
        const initialY = index * 3; // Vertical offset (cards go down from top)
        const initialZ = -index * 3; // Slight depth

        // Smooth interpolation for spreading (Phase 1)
        const easedSpread = easeOutCubic(spreadProgress);
        const currentX = lerp(initialX, finalX, easedSpread);
        const currentY = lerp(initialY, 0, easedSpread);
        const currentZ = lerp(initialZ, 0, easedSpread);

        // Scale - all cards same size
        const currentScale = 1;

        // Opacity - all cards visible
        const currentOpacity = 1;

        // Rotation during spread (Phase 1) - fan out like playing cards (centered)
        const centerIndex = (totalCards - 1) / 2;
        const initialRotateZ = (index - centerIndex) * -4; // Symmetric tilt from center
        const currentRotateZ = lerp(initialRotateZ, 0, easedSpread);

        // Phase 2: Flip cards with staggered delay (left to right)
        // Cards flip: 180° → 200° (overshoot) → 0° (front) with bounce
        const flipDelay = index * 0.1; // Less delay between cards
        const cardFlipProgress = Math.max(
          Math.min((flipProgress - flipDelay) / 0.7, 1), // Slower individual flip
          0
        );

        // Bounce easing: goes past target then settles back
        // 180° → 200° (overshoot by 20°) → 0° (final)
        let targetRotation: number;
        if (cardFlipProgress < 0.4) {
          // First part: 180° → -20° (overshoot past 0°)
          const overShootProgress = cardFlipProgress / 0.4;
          const easedOvershoot = easeOutCubic(overShootProgress);
          targetRotation = 180 - easedOvershoot * 200; // goes to -20°
        } else {
          // Second part: -20° → 0° (settle back)
          const settleProgress = (cardFlipProgress - 0.4) / 0.6;
          const easedSettle = easeOutCubic(settleProgress);
          targetRotation = -20 + easedSettle * 20; // goes back to 0°
        }

        targetCardRotationsRef.current[index] = targetRotation;

        // Apply transforms directly to DOM (rotateY handled by HolographicCard)
        cardEl.style.transform = `
          translateX(${currentX}px)
          translateY(${currentY}px)
          translateZ(${currentZ}px)
          rotateZ(${currentRotateZ}deg)
          scale(${currentScale})
        `;
        cardEl.style.opacity = `${currentOpacity}`;
        cardEl.style.zIndex = `${totalCards - index}`;
      });
    },
    [cards.length, cardDims.width, cardDims.gap]
  );

  // Animation loop with smooth lerp
  const animate = useCallback(() => {
    // Smooth lerp for scroll progress
    scrollProgressRef.current = lerp(
      scrollProgressRef.current,
      targetScrollProgressRef.current,
      0.06
    );

    // Smooth lerp for each card's rotation (Y axis for flip only)
    for (let i = 0; i < cardRotationsRef.current.length; i++) {
      cardRotationsRef.current[i] = lerp(
        cardRotationsRef.current[i],
        targetCardRotationsRef.current[i],
        0.08
      );

      // Update HolographicCard's internal rotation via callback
      if (cardUpdateFnsRef.current[i]) {
        cardUpdateFnsRef.current[i](cardRotationsRef.current[i]);
      }
    }

    // Update card transforms
    updateCardTransforms(scrollProgressRef.current);

    // Continue animation loop
    rafRef.current = requestAnimationFrame(animate);
  }, [updateCardTransforms]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Start animation loop
    rafRef.current = requestAnimationFrame(animate);

    // Scroll handler
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const containerTop = container.offsetTop;
      const scrollHeight = window.innerHeight * 4; // 400vh for animation phases

      const rawProgress = (scrollTop - containerTop) / scrollHeight;
      targetScrollProgressRef.current = Math.max(0, Math.min(1, rawProgress));
    };

    // Add event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  // Mobile: vertical scroll layout with individual card flip on scroll
  if (mobile) {
    return (
      <div
        ref={containerRef}
        className={`relative ${className} z-10 bg-black`}
      >
        <div className="flex flex-col items-center gap-8 py-16 px-4">
          {cards.map((card, index) => (
            <MobileCard
              key={index}
              card={card}
              cardDims={cardDims}
              index={index}
            />
          ))}
        </div>
      </div>
    );
  }

  // Desktop: horizontal spread with scroll animation
  return (
    <div
      ref={containerRef}
      className={`h-[500vh] relative ${className} z-10 bg-black`}
    >
      <div className="h-screen flex items-center justify-center sticky top-0">
        <div
          className="relative flex items-center justify-center"
          style={{
            perspective: "1200px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="absolute"
              style={{
                width: `${cardDims.width}px`,
                height: `${cardDims.height}px`,
                transformStyle: "preserve-3d",
                willChange: "transform, opacity",
              }}
            >
              <HolographicCard
                text={card.text}
                label={card.label}
                descTop={card.descTop}
                descBottom={card.descBottom}
                autoRotate={false}
                externalRotationY={0}
                color0={[180, 200, 210]}
                color1={[220, 240, 255]}
                onRotationUpdate={(fn: (rotation: number) => void) => {
                  cardUpdateFnsRef.current[index] = fn;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardStack;
