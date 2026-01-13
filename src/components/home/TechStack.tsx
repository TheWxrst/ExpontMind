"use client";

import { motion } from "framer-motion";
import { TECHNOLOGIES } from "@/lib/seo/constants";

const categoryLabels: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  mobile: "Mobile",
  game: "Game Engines",
  "3d": "3D & Graphics",
  ai: "AI & ML",
  cloud: "Cloud",
  database: "Database",
  language: "Languages",
};

const categoryOrder = [
  "frontend",
  "backend",
  "mobile",
  "ai",
  "game",
  "3d",
  "cloud",
  "database",
];

type Technology = (typeof TECHNOLOGIES)[number];

export function TechStack() {
  // Group technologies by category
  const grouped = TECHNOLOGIES.reduce(
    (acc, tech) => {
      const category = tech.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(tech);
      return acc;
    },
    {} as Record<string, Technology[]>
  );

  return (
    <section
      className="py-24 px-6 bg-black"
      aria-labelledby="tech-stack-heading"
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
            id="tech-stack-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6"
          >
            Enterprise-Grade Technology Stack
          </h2>
          <p className="text-lg text-stone-400 max-w-3xl mx-auto">
            We leverage proven technologies trusted by leading companies worldwide.
            Our stack is continuously evaluated for performance, security, and
            maintainability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categoryOrder.map((category, categoryIndex) => {
            const techs = grouped[category];
            if (!techs) return null;

            return (
              <motion.div
                key={category}
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <h3 className="text-sm font-medium text-stone-500 uppercase tracking-wider">
                  {categoryLabels[category] || category}
                </h3>
                <ul className="space-y-2">
                  {techs.map((tech) => (
                    <li
                      key={tech.slug}
                      className="text-stone-300 hover:text-white transition-colors cursor-default"
                    >
                      {tech.name}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-16 pt-16 border-t border-stone-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-light text-white mb-2">50+</div>
              <div className="text-stone-500 text-sm">Technologies Mastered</div>
            </div>
            <div>
              <div className="text-4xl font-light text-white mb-2">100%</div>
              <div className="text-stone-500 text-sm">Cloud-Native Ready</div>
            </div>
            <div>
              <div className="text-4xl font-light text-white mb-2">24/7</div>
              <div className="text-stone-500 text-sm">Monitoring & Support</div>
            </div>
            <div>
              <div className="text-4xl font-light text-white mb-2">99.9%</div>
              <div className="text-stone-500 text-sm">Uptime Guarantee</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
