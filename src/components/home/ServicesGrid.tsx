"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Brain,
  Smartphone,
  Globe,
  Gamepad2,
  Box,
  Code2,
  ArrowRight,
  LucideIcon,
} from "lucide-react";
import { SERVICES } from "@/lib/seo/constants";

const serviceIcons: Record<string, LucideIcon> = {
  "ai-automation": Brain,
  "mobile-app-development": Smartphone,
  "web-development": Globe,
  "game-development": Gamepad2,
  "3d-modeling": Box,
  "custom-software": Code2,
};

const serviceDescriptions: Record<string, string> = {
  "ai-automation":
    "Machine learning, intelligent automation, and AI-powered solutions that transform business operations and drive measurable efficiency gains.",
  "mobile-app-development":
    "Native and cross-platform mobile applications for iOS and Android. From MVPs to enterprise-scale apps with millions of users.",
  "web-development":
    "Modern web applications built with React, Next.js, and Node.js. Fast, scalable, and optimized for conversion.",
  "game-development":
    "Immersive gaming experiences using Unreal Engine and Unity. PC, console, and VR/AR development for studios worldwide.",
  "3d-modeling":
    "Product visualization, architectural renders, character modeling, and real-time 3D web experiences using WebGL.",
  "custom-software":
    "Enterprise software solutions, SaaS platforms, and legacy modernization. Built for scale, security, and long-term growth.",
};

export function ServicesGrid() {
  const services = Object.values(SERVICES);

  return (
    <section
      className="py-24 px-6 bg-stone-950"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            id="services-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6"
          >
            End-to-End Technology Services
          </h2>
          <p className="text-lg text-stone-400 max-w-3xl mx-auto">
            From concept to deployment, we deliver comprehensive solutions across
            AI, mobile, web, gaming, and enterprise software development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.slug] || Code2;
            const description = serviceDescriptions[service.slug] || service.description;

            return (
              <motion.article
                key={service.slug}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="block h-full p-8 bg-stone-900/50 border border-stone-800 hover:border-stone-600 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 bg-stone-800 group-hover:bg-stone-700 transition-colors">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-stone-600 text-sm font-mono">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="text-xl font-medium text-white mb-3 group-hover:text-stone-200 transition-colors">
                    {service.name}
                  </h3>

                  <p className="text-stone-400 text-sm leading-relaxed mb-6">
                    {description}
                  </p>

                  <div className="flex items-center text-stone-500 group-hover:text-white transition-colors text-sm">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-stone-400 hover:text-white transition-colors"
          >
            View all services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
