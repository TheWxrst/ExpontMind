import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Brain, Smartphone, Globe, Gamepad2, Box, Code2, LucideIcon } from "lucide-react";
import { Header } from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CtaSection } from "@/components/ui/CtaSection";
import { getServicesHubMetadata } from "@/lib/seo/metadata";
import { SERVICES } from "@/lib/seo/constants";

export const metadata: Metadata = getServicesHubMetadata();

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
    "Transform your business with intelligent automation. Our AI solutions include machine learning models, chatbots, process automation, and predictive analytics that deliver measurable ROI.",
  "mobile-app-development":
    "Native and cross-platform mobile applications for iOS and Android. From startup MVPs to enterprise apps serving millions of users, we build mobile experiences that drive engagement.",
  "web-development":
    "Modern web applications built with React, Next.js, and Node.js. Fast, scalable, and optimized for conversion. From corporate websites to complex SaaS platforms.",
  "game-development":
    "Immersive gaming experiences using Unreal Engine and Unity. PC, console, mobile, and VR/AR development for studios and enterprises worldwide.",
  "3d-modeling":
    "Professional 3D modeling, animation, and visualization services. Product renders, architectural visualization, character modeling, and real-time WebGL experiences.",
  "custom-software":
    "Bespoke enterprise software solutions. SaaS platforms, API development, cloud solutions, and legacy modernization built for scale and security.",
};

export default function ServicesPage() {
  const services = Object.values(SERVICES);

  return (
    <div className="min-h-screen font-sans bg-[#0f0a0a]">
      <Header />

      <main className="pt-32 pb-20">
        {/* Breadcrumbs */}
        <div className="px-[6vw] mb-8">
          <Breadcrumbs items={[{ label: "Services", href: "/services" }]} />
        </div>

        {/* Hero Section */}
        <section className="px-[6vw] mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 max-w-4xl">
            Technology Services That
            <span className="text-stone-400"> Drive Business Growth</span>
          </h1>
          <p className="text-lg text-stone-400 max-w-3xl leading-relaxed">
            From AI-powered automation to immersive gaming experiences, we deliver
            end-to-end technology solutions that transform how businesses operate
            and compete. Every engagement is built on a foundation of strategic
            thinking, technical excellence, and measurable outcomes.
          </p>
        </section>

        {/* Services Grid */}
        <section className="px-[6vw] mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = serviceIcons[service.slug] || Code2;
              const description = serviceDescriptions[service.slug] || service.description;

              return (
                <article
                  key={service.slug}
                  className="group relative"
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="block h-full p-8 md:p-10 bg-stone-900/30 border border-stone-800 hover:border-stone-600 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-4 bg-stone-800 group-hover:bg-stone-700 transition-colors">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <span className="text-stone-600 text-sm font-mono">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-medium text-white mb-4 group-hover:text-stone-200 transition-colors">
                      {service.name}
                    </h2>

                    <p className="text-stone-400 leading-relaxed mb-6">
                      {description}
                    </p>

                    {/* Sub-services preview */}
                    {service.subServices && service.subServices.length > 0 && (
                      <div className="mb-6">
                        <p className="text-stone-500 text-sm mb-2">Includes:</p>
                        <div className="flex flex-wrap gap-2">
                          {service.subServices.map((sub) => (
                            <span
                              key={sub.slug}
                              className="text-xs px-3 py-1 bg-stone-800/50 text-stone-400 rounded"
                            >
                              {sub.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center text-stone-500 group-hover:text-white transition-colors">
                      <span className="font-medium">Learn more</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="px-[6vw] py-20 bg-black mb-20">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-12 max-w-2xl">
            Why Companies Choose ExpontMind
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-white">Strategic Partnership</h3>
              <p className="text-stone-400 leading-relaxed">
                We function as an extension of your team, not just a vendor.
                Every technical decision is aligned with your business objectives.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-white">Proven Expertise</h3>
              <p className="text-stone-400 leading-relaxed">
                Senior engineers with deep expertise across AI, mobile, web, and
                gaming. No junior developers cycling through your project.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-white">Global Delivery</h3>
              <p className="text-stone-400 leading-relaxed">
                Dedicated teams operating across time zones, serving clients in
                North America, Europe, and Asia-Pacific with consistent quality.
              </p>
            </div>
          </div>
        </section>

        {/* Process Preview */}
        <section className="px-[6vw] mb-20">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-12">
            Our Engagement Process
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Discovery", desc: "Requirements analysis and strategic planning" },
              { step: "02", title: "Design", desc: "Architecture and UX design with your input" },
              { step: "03", title: "Development", desc: "Agile sprints with regular demos" },
              { step: "04", title: "Launch", desc: "Deployment, monitoring, and ongoing support" },
            ].map((item) => (
              <div key={item.step} className="p-6 bg-stone-900/30 border border-stone-800">
                <span className="text-3xl font-light text-stone-700 mb-4 block">
                  {item.step}
                </span>
                <h3 className="text-lg font-medium text-white mb-2">{item.title}</h3>
                <p className="text-stone-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <CtaSection
          title="Ready to Start Your Project?"
          subtitle="Schedule a free consultation to discuss your requirements. We'll provide a detailed proposal within 48 hours."
          primaryCta={{ label: "Schedule Consultation", href: "/contact" }}
          secondaryCta={{ label: "View Our Work", href: "/work" }}
        />
      </main>

      <Footer />
    </div>
  );
}
