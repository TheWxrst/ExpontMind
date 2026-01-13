"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  Lightbulb,
  PenTool,
  Code,
  TestTube,
  Rocket,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We analyze your business requirements, identify key challenges, and define measurable success criteria.",
    icon: MessageSquare,
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "Our architects design a technical roadmap aligned with your business goals and budget constraints.",
    icon: Lightbulb,
  },
  {
    number: "03",
    title: "Design",
    description:
      "User experience and interface design that balances aesthetics with functionality and conversion.",
    icon: PenTool,
  },
  {
    number: "04",
    title: "Development",
    description:
      "Agile development with regular demos, continuous integration, and transparent progress tracking.",
    icon: Code,
  },
  {
    number: "05",
    title: "Testing",
    description:
      "Comprehensive QA including automated testing, security audits, and performance optimization.",
    icon: TestTube,
  },
  {
    number: "06",
    title: "Launch & Support",
    description:
      "Smooth deployment with monitoring, maintenance, and continuous improvement post-launch.",
    icon: Rocket,
  },
];

export function Process() {
  return (
    <section
      className="py-24 px-6 bg-stone-950"
      aria-labelledby="process-heading"
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
            id="process-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6"
          >
            From Concept to Launch
          </h2>
          <p className="text-lg text-stone-400 max-w-3xl mx-auto">
            Our proven development methodology ensures transparency, quality, and
            on-time delivery for projects of any complexity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="p-8 bg-stone-900/30 border border-stone-800 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl font-light text-stone-700">
                      {step.number}
                    </span>
                    <div className="p-2 bg-stone-800">
                      <Icon className="w-5 h-5 text-stone-400" />
                    </div>
                  </div>

                  <h3 className="text-xl font-medium text-white mb-3">
                    {step.title}
                  </h3>

                  <p className="text-stone-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector line for desktop */}
                {index < steps.length - 1 && index % 3 !== 2 && (
                  <div
                    className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-stone-800"
                    aria-hidden="true"
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-stone-500 text-sm">
            Average project timeline: 8-16 weeks depending on scope and complexity
          </p>
        </motion.div>
      </div>
    </section>
  );
}
