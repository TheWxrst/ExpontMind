"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CtaSectionProps {
  title?: string;
  subtitle?: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  variant?: "default" | "dark" | "gradient";
  className?: string;
}

export function CtaSection({
  title = "Start Your Digital Transformation",
  subtitle = "Let's discuss how we can help you achieve your technology goals. Our team is ready to bring your vision to life.",
  primaryCta = { label: "Schedule a Consultation", href: "/contact" },
  secondaryCta = { label: "View Our Work", href: "/work" },
  variant = "default",
  className = "",
}: CtaSectionProps) {
  const bgClasses = {
    default: "bg-stone-900/50",
    dark: "bg-black",
    gradient: "bg-gradient-to-br from-stone-900 to-stone-800",
  };

  return (
    <section
      className={`py-24 px-6 ${bgClasses[variant]} ${className}`}
      aria-labelledby="cta-heading"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          id="cta-heading"
          className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>

        <motion.p
          className="text-lg text-stone-400 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-none hover:bg-stone-200 transition-colors duration-300 group"
          >
            {primaryCta.label}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-stone-600 text-white font-medium rounded-none hover:border-white hover:bg-white/5 transition-all duration-300"
            >
              {secondaryCta.label}
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}
