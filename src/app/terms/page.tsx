"use client";

import { motion } from "framer-motion";
import NoiseOverlay from "@/components/NoiseOverlay";
import Footer from "@/components/navigation/Footer";
import { Header } from "@/components/navigation/Header";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen font-sans bg-[#0f0a0a] text-white">
      <NoiseOverlay opacity={0.05} zIndex={1000} />
      <Header />

      {/* Main Content */}
      <main className="relative z-10 min-h-screen pt-32 pb-20 px-6 sm:px-12 md:px-24 lg:px-32">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          {/* Title */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-medium uppercase tracking-wide mb-4"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
          >
            Terms of Service
          </motion.h1>

          <motion.p
            className="text-white/40 text-sm uppercase tracking-widest mb-16"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Last Updated: June 2024
          </motion.p>

          {/* Intro */}
          <motion.p
            className="text-white/70 text-lg leading-relaxed mb-16"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Welcome to ExpontMind. By accessing or using our websites, apps,
            chatbots, and other services (&quot;Services&quot;), you agree to
            these Terms of Service (&quot;Terms&quot;).
          </motion.p>

          {/* Sections */}
          <div className="space-y-16">
            {/* Section 1 */}
            <motion.section
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl sm:text-3xl font-medium uppercase tracking-wide mb-6 text-white/90">
                1. Use of Services
              </h2>
              <p className="text-white/60">
                You agree to use our Services only for lawful purposes and in
                accordance with these Terms.
              </p>
            </motion.section>

            {/* Section 2 */}
            <motion.section
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <h2 className="text-2xl sm:text-3xl font-medium uppercase tracking-wide mb-6 text-white/90">
                2. User Responsibilities
              </h2>
              <p className="text-white/60 mb-4">You are responsible for:</p>
              <ul className="space-y-2 text-white/60">
                <li className="flex items-start gap-3">
                  <span className="text-white/30 mt-1">&#x2022;</span>
                  <span>Providing accurate and up-to-date information</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/30 mt-1">&#x2022;</span>
                  <span>
                    Maintaining confidentiality of your account (if applicable)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/30 mt-1">&#x2022;</span>
                  <span>
                    Not engaging in harmful, illegal, or unauthorized activities
                  </span>
                </li>
              </ul>
            </motion.section>

            {/* Section 3 */}
            <motion.section
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl sm:text-3xl font-medium uppercase tracking-wide mb-6 text-white/90">
                3. Intellectual Property
              </h2>
              <p className="text-white/60">
                All content, trademarks, and technology in our Services are
                owned by ExpontMind or our partners. You may not copy, modify,
                or distribute them without permission.
              </p>
            </motion.section>

            {/* Section 4 */}
            <motion.section
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <h2 className="text-2xl sm:text-3xl font-medium uppercase tracking-wide mb-6 text-white/90">
                4. Payments
              </h2>
              <p className="text-white/40 text-sm uppercase tracking-wider mb-4">
                If applicable
              </p>
              <p className="text-white/60">
                If you purchase products or services through our platforms, you
                agree to pay all fees and follow the specified payment terms.
              </p>
            </motion.section>

            {/* Section 5 */}
            <motion.section
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-2xl sm:text-3xl font-medium uppercase tracking-wide mb-6 text-white/90">
                5. Termination
              </h2>
              <p className="text-white/60">
                We may suspend or terminate access to our Services at any time,
                especially if you violate these Terms.
              </p>
            </motion.section>

            {/* Section 6 */}
            <motion.section
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              <h2 className="text-2xl sm:text-3xl font-medium uppercase tracking-wide mb-6 text-white/90">
                6. Disclaimers
              </h2>
              <p className="text-white/60">
                Our Services are provided &quot;as is&quot; without warranties
                of any kind. We do not guarantee that our Services will always
                be available or error-free.
              </p>
            </motion.section>

            {/* Section 7 */}
            <motion.section
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-medium uppercase tracking-wide mb-6 text-white/90">
                7. Limitation of Liability
              </h2>
              <p className="text-white/60">
                We are not liable for any damages resulting from your use of our
                Services, except where prohibited by law.
              </p>
            </motion.section>

            {/* Section 8 */}
            <motion.section
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              <h2 className="text-2xl sm:text-3xl font-medium uppercase tracking-wide mb-6 text-white/90">
                8. Changes to Terms
              </h2>
              <p className="text-white/60">
                We may update these Terms at any time. Changes will be posted on
                this page with the updated date.
              </p>
            </motion.section>

            {/* Section 9 - Contact */}
            <motion.section
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-white/5 border border-white/10 rounded-lg p-8"
            >
              <h2 className="text-2xl sm:text-3xl font-medium uppercase tracking-wide mb-6 text-white/90">
                9. Contact Us
              </h2>
              <p className="text-white/60 mb-4">
                If you have questions about these Terms, please contact us at:
              </p>
              <a
                href="mailto:expontmindsolutions@gmail.com"
                className="inline-flex items-center gap-2 text-white/90 hover:text-white text-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                expontmindsolutions@gmail.com
              </a>
            </motion.section>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
