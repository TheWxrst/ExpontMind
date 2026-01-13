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

export default function PrivacyPolicy() {
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
            Privacy Policy
          </motion.h1>

          <motion.p
            className="text-white/40 text-sm uppercase tracking-widest mb-16"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Last Updated: December 2024
          </motion.p>

          {/* Intro */}
          <motion.p
            className="text-white/70 text-lg leading-relaxed mb-16"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            ExpontMind (&quot;we,&quot; &quot;our,&quot; &quot;us&quot;) is
            committed to protecting your privacy. This Privacy Policy explains
            how we collect, use, and protect your personal information when you
            use our services, including our apps, websites, chatbots, and other
            technology projects.
          </motion.p>

          {/* Sections */}
          <div className="space-y-16">
            {/* Section 1 */}
            <motion.section
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl sm:text-3xl font-medium uppercase tracking-wide mb-6 text-white/90">
                1. Information We Collect
              </h2>
              <p className="text-white/60 mb-6">
                We may collect and store the following personal information from
                you:
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <h3 className="text-lg font-medium uppercase tracking-wider mb-4 text-white/80">
                    Personal Information
                  </h3>
                  <ul className="space-y-2 text-white/60">
                    <li className="flex items-start gap-3">
                      <span className="text-white/30 mt-1">&#x2022;</span>
                      <span>Name</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-white/30 mt-1">&#x2022;</span>
                      <span>Email address (including Gmail addresses)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-white/30 mt-1">&#x2022;</span>
                      <span>Phone number</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-white/30 mt-1">&#x2022;</span>
                      <span>
                        Any information you provide through our chatbots or
                        forms
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <h3 className="text-lg font-medium uppercase tracking-wider mb-4 text-white/80">
                    Technical Information
                  </h3>
                  <ul className="space-y-2 text-white/60">
                    <li className="flex items-start gap-3">
                      <span className="text-white/30 mt-1">&#x2022;</span>
                      <span>IP address</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-white/30 mt-1">&#x2022;</span>
                      <span>Browser type</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-white/30 mt-1">&#x2022;</span>
                      <span>Device details</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-white/30 mt-1">&#x2022;</span>
                      <span>Cookies and usage data</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Section 2 */}
            <motion.section
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <h2 className="text-2xl sm:text-3xl font-medium uppercase tracking-wide mb-6 text-white/90">
                2. How We Collect Information
              </h2>
              <p className="text-white/60 mb-4">
                We collect your information when:
              </p>
              <ul className="space-y-2 text-white/60">
                <li className="flex items-start gap-3">
                  <span className="text-white/30 mt-1">&#x2022;</span>
                  <span>You use our chatbots, apps, or websites</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/30 mt-1">&#x2022;</span>
                  <span>
                    You submit forms or messages through our platforms
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/30 mt-1">&#x2022;</span>
                  <span>
                    You interact with our Facebook Messenger chatbots
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
                3. How We Use Your Information
              </h2>
              <p className="text-white/60 mb-4">
                We use your personal information to:
              </p>
              <ul className="space-y-2 text-white/60">
                <li className="flex items-start gap-3">
                  <span className="text-white/30 mt-1">&#x2022;</span>
                  <span>Provide and operate our services</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/30 mt-1">&#x2022;</span>
                  <span>
                    Communicate with you (such as through chatbots or email)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/30 mt-1">&#x2022;</span>
                  <span>Improve and customize our services</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/30 mt-1">&#x2022;</span>
                  <span>Analyze usage for service improvement</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/30 mt-1">&#x2022;</span>
                  <span>Comply with legal obligations</span>
                </li>
              </ul>
            </motion.section>

            {/* Section 4 */}
            <motion.section
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <h2 className="text-2xl sm:text-3xl font-medium uppercase tracking-wide mb-6 text-white/90">
                4. Where We Store Your Data
              </h2>
              <p className="text-white/60 mb-6">
                We securely store your data using:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-medium uppercase tracking-wider mb-2 text-white/90">
                    Vercel
                  </h3>
                  <p className="text-white/50 text-sm">For hosting</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-medium uppercase tracking-wider mb-2 text-white/90">
                    MongoDB
                  </h3>
                  <p className="text-white/50 text-sm">For database storage</p>
                </div>
              </div>
            </motion.section>

            {/* Section 5 */}
            <motion.section
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-2xl sm:text-3xl font-medium uppercase tracking-wide mb-6 text-white/90">
                5. Data Sharing
              </h2>
              <p className="text-white/60 mb-4">
                We do not sell your personal information. We may share data
                with:
              </p>
              <ul className="space-y-2 text-white/60">
                <li className="flex items-start gap-3">
                  <span className="text-white/30 mt-1">&#x2022;</span>
                  <span>
                    Service providers (such as database or hosting providers)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/30 mt-1">&#x2022;</span>
                  <span>Legal authorities if required by law</span>
                </li>
              </ul>
            </motion.section>

            {/* Section 6 */}
            <motion.section
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              <h2 className="text-2xl sm:text-3xl font-medium uppercase tracking-wide mb-6 text-white/90">
                6. Cookies & Tracking
              </h2>
              <p className="text-white/60">
                Our websites and apps may use cookies and similar technologies
                for analytics and functionality.
              </p>
            </motion.section>

            {/* Section 7 */}
            <motion.section
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-medium uppercase tracking-wide mb-6 text-white/90">
                7. Your Rights
              </h2>
              <p className="text-white/60 mb-4">You have the right to:</p>
              <ul className="space-y-2 text-white/60 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-white/30 mt-1">&#x2022;</span>
                  <span>Request access to your personal data</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/30 mt-1">&#x2022;</span>
                  <span>Request correction or deletion of your data</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/30 mt-1">&#x2022;</span>
                  <span>
                    Opt out of marketing communications (if applicable)
                  </span>
                </li>
              </ul>
              <p className="text-white/60">
                To exercise these rights, contact us at{" "}
                <a
                  href="mailto:expontmindsolutions@gmail.com"
                  className="text-white/90 hover:text-white underline underline-offset-4 transition-colors"
                >
                  expontmindsolutions@gmail.com
                </a>
              </p>
            </motion.section>

            {/* Section 8 */}
            <motion.section
              variants={fadeIn}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              <h2 className="text-2xl sm:text-3xl font-medium uppercase tracking-wide mb-6 text-white/90">
                8. Data Security
              </h2>
              <p className="text-white/60">
                We take reasonable technical and organizational measures to
                protect your personal data.
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
                If you have any questions or requests regarding your privacy,
                please contact us at:
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
