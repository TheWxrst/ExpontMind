"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Globe2, Users } from "lucide-react";

const propositions = [
  {
    icon: Globe2,
    title: "Global Delivery",
    description:
      "We serve clients across North America, Europe, and Asia-Pacific with dedicated teams operating across time zones.",
  },
  {
    icon: Zap,
    title: "Rapid Development",
    description:
      "Agile methodology with 2-week sprints, continuous deployment, and regular stakeholder demos for full transparency.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC 2 compliant processes, secure code reviews, and industry-standard encryption for all projects.",
  },
  {
    icon: Users,
    title: "Dedicated Teams",
    description:
      "Senior engineers assigned to your project, not junior developers cycling through. Consistency drives quality.",
  },
];

export function ValueProp() {
  return (
    <section
      className="py-24 px-6 bg-black border-y border-stone-900"
      aria-labelledby="value-prop-heading"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="max-w-3xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            id="value-prop-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6"
          >
            Technology Partnership, Not Just Development
          </h2>
          <p className="text-lg text-stone-400">
            We combine technical expertise with strategic thinking. Every line of
            code we write serves your business objectives, not just technical
            requirements.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {propositions.map((prop, index) => {
            const Icon = prop.icon;

            return (
              <motion.div
                key={prop.title}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="p-3 bg-stone-900 w-fit mb-4 group-hover:bg-stone-800 transition-colors">
                  <Icon className="w-6 h-6 text-stone-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  {prop.title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                  {prop.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
