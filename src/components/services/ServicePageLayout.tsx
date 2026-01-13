"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/Breadcrumbs";
import { CtaSection } from "@/components/ui/CtaSection";

interface SubService {
  name: string;
  slug: string;
  description: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface ServicePageLayoutProps {
  serviceName: string;
  serviceSlug: string;
  headline: string;
  subheadline: string;
  description: string;
  icon: React.ReactNode;
  subServices?: SubService[];
  capabilities: string[];
  technologies: string[];
  industries: { name: string; slug: string }[];
  faqs: FAQItem[];
  children?: React.ReactNode;
}

export function ServicePageLayout({
  serviceName,
  serviceSlug,
  headline,
  subheadline,
  description,
  icon,
  subServices = [],
  capabilities,
  technologies,
  industries,
  faqs,
  children,
}: ServicePageLayoutProps) {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Services", href: "/services" },
    { label: serviceName, href: `/services/${serviceSlug}` },
  ];

  return (
    <div className="min-h-screen font-sans bg-[#0f0a0a]">
      <Header />

      <main className="pt-32 pb-20">
        {/* Breadcrumbs */}
        <div className="px-[6vw] mb-8">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        {/* Hero Section */}
        <section className="px-[6vw] mb-20">
          <div className="flex items-start gap-6 mb-8">
            <div className="p-4 bg-stone-800">
              {icon}
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 max-w-4xl">
            {headline}
            <span className="text-stone-400"> {subheadline}</span>
          </h1>
          <p className="text-lg text-stone-400 max-w-3xl leading-relaxed">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-medium hover:bg-stone-200 transition-colors"
            >
              Get a Free Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-stone-600 text-white font-medium hover:border-white transition-colors"
            >
              View Related Projects
            </Link>
          </div>
        </section>

        {/* Sub-services (if any) */}
        {subServices.length > 0 && (
          <section className="px-[6vw] mb-20">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-8">
              Our {serviceName} Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subServices.map((sub, index) => (
                <Link
                  key={sub.slug}
                  href={`/services/${serviceSlug}/${sub.slug}`}
                  className="group p-6 bg-stone-900/30 border border-stone-800 hover:border-stone-600 transition-all"
                >
                  <span className="text-stone-600 text-sm font-mono mb-4 block">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-medium text-white mb-3 group-hover:text-stone-200">
                    {sub.name}
                  </h3>
                  <p className="text-stone-400 text-sm mb-4">{sub.description}</p>
                  <span className="text-stone-500 group-hover:text-white text-sm flex items-center gap-2">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Capabilities */}
        <section className="px-[6vw] py-20 bg-black mb-20">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-12">
            What We Deliver
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4"
              >
                <span className="text-stone-600 text-sm font-mono mt-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-stone-300">{capability}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Custom content slot */}
        {children}

        {/* Technologies */}
        <section className="px-[6vw] mb-20">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-8">
            Technologies We Use
          </h2>
          <div className="flex flex-wrap gap-3">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-stone-900/50 border border-stone-800 text-stone-300 text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Industries */}
        <section className="px-[6vw] mb-20">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-8">
            Industries We Serve
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="p-4 bg-stone-900/30 border border-stone-800 hover:border-stone-600 text-center text-stone-300 hover:text-white transition-all"
              >
                {industry.name}
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="px-[6vw] mb-20">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 max-w-3xl">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-stone-800 pb-6">
                <h3 className="text-lg font-medium text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-stone-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <CtaSection
          title={`Ready to Start Your ${serviceName} Project?`}
          subtitle="Schedule a free consultation to discuss your requirements. We provide detailed proposals within 48 hours."
          primaryCta={{ label: "Get a Free Quote", href: "/contact" }}
          secondaryCta={{ label: "View Our Work", href: "/work" }}
        />
      </main>

      <Footer />
    </div>
  );
}
