"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-6 py-24 bg-[#0f0a0a] overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none"
        aria-hidden="true"
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                           linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Eyebrow text */}
        <motion.p
          className="text-stone-500 text-sm tracking-widest uppercase mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Global Technology Partner
        </motion.p>

        {/* Main headline - H1 for SEO */}
        <motion.h1
          id="hero-heading"
          className="text-4xl md:text-5xl lg:text-7xl font-light text-white leading-tight mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          AI Solutions, Mobile Apps &<br />
          <span className="text-stone-400">Custom Software</span> for
          <br />
          Global Enterprises
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg md:text-xl text-stone-400 max-w-3xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          We partner with startups and Fortune 500 companies to build software
          that drives measurable business growth. AI automation, mobile apps,
          web platforms, and immersive gaming experiences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-none hover:bg-stone-200 transition-colors duration-300 group"
          >
            Schedule a Consultation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/work"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-stone-600 text-white font-medium rounded-none hover:border-white hover:bg-white/5 transition-all duration-300"
          >
            <Play className="w-4 h-4" />
            View Our Work
          </Link>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-8 text-stone-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            <span>Available for Q1 2026 projects</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-stone-700" />
          <div>Clients in 40+ countries</div>
          <div className="hidden sm:block w-px h-4 bg-stone-700" />
          <div>Response within 24 hours</div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <div className="w-6 h-10 border border-stone-700 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-2 bg-stone-500 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
