"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { SERVICES, INDUSTRIES, SITE_CONFIG } from "@/lib/seo/constants";

interface FooterProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[450px] space-y-4">
      <div className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="NAME"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-[11px] text-[rgba(245,245,245,0.9)] placeholder-[rgba(245,245,245,0.4)] uppercase tracking-widest font-mono focus:border-white/30 transition-all duration-300 outline-none ring-0 shadow-none focus:outline-none focus:ring-0 focus:shadow-none appearance-none"
        />
        <input
          type="email"
          name="email"
          placeholder="EMAIL"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-[11px] text-[rgba(245,245,245,0.9)] placeholder-[rgba(245,245,245,0.4)] uppercase tracking-widest font-mono focus:border-white/30 transition-all duration-300 outline-none ring-0 shadow-none focus:outline-none focus:ring-0 focus:shadow-none appearance-none"
        />
        <textarea
          name="message"
          placeholder="MESSAGE"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-[11px] text-[rgba(245,245,245,0.9)] placeholder-[rgba(245,245,245,0.4)] uppercase tracking-widest font-mono focus:border-white/30 transition-all duration-300 outline-none ring-0 shadow-none focus:outline-none focus:ring-0 focus:shadow-none appearance-none resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-[11px] text-[rgba(245,245,245,0.9)] uppercase tracking-widest font-mono hover:bg-white/20 focus:border-white/40 transition-all duration-300 outline-none ring-0 shadow-none focus:outline-none focus:ring-0 focus:shadow-none appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "SENDING..." : "SEND MESSAGE"}
      </button>

      {status === "success" && (
        <p className="text-[10px] text-green-400/80 uppercase tracking-widest text-center">
          Message sent successfully!
        </p>
      )}

      {status === "error" && (
        <p className="text-[10px] text-red-400/80 uppercase tracking-widest text-center">
          {errorMessage}
        </p>
      )}
    </form>
  );
}

// Sitemap link component
function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[10px] tracking-[0.2em] text-white/50 uppercase font-medium">
        {title}
      </h3>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[11px] text-white/70 hover:text-white transition-colors normal-case"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer({ className = "", style, id }: FooterProps) {
  // Generate service links
  const serviceLinks = Object.values(SERVICES).map((service) => ({
    label: service.name,
    href: `/services/${service.slug}`,
  }));

  // Generate industry links
  const industryLinks = Object.values(INDUSTRIES).map((industry) => ({
    label: industry.name,
    href: `/industries/${industry.slug}`,
  }));

  // Company links
  const companyLinks = [
    { label: "About Us", href: "/company/about" },
    { label: "Our Work", href: "/work" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/company/careers" },
    { label: "Contact", href: "/contact" },
  ];

  // Resource links
  const resourceLinks = [
    { label: "Case Studies", href: "/work" },
    { label: "Blog", href: "/blog" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ];

  return (
    <footer
      id={id}
      className="relative"
      style={{
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
        zIndex: 100,
      }}
      aria-label="Site footer"
    >
      <div className="bg-black">
        <div
          className={`relative w-full bg-black z-10 py-16 px-[6vw] font-mono text-[11px] text-[rgba(245,245,245,0.9)] uppercase leading-[1.2] ${className}`}
          style={style}
        >
          {/* CTA Section */}
          <div className="mb-16">
            <p className="text-[6vw] sm:text-[5vw] md:text-[4vw] lg:text-[3vw] font-light text-white leading-[1.1] normal-case">
              Let&apos;s create something
              <br />
              <span className="text-white/40">extraordinary together</span>
            </p>
          </div>

          {/* Main Content - Contact Info + Sitemap */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            {/* Left Column - Contact Info */}
            <div className="lg:col-span-4 flex flex-col gap-8 normal-case">
              {/* Email */}
              <div className="flex items-start gap-4">
                <Mail size={20} className="text-white/50 mt-1" />
                <div className="flex flex-col gap-1">
                  <p className="text-[10px] tracking-widest text-white/50 uppercase">
                    Email
                  </p>
                  <Link
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="text-[13px] text-white/90 hover:text-white transition-colors"
                  >
                    {SITE_CONFIG.email}
                  </Link>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <Phone size={20} className="text-white/50 mt-1" />
                <div className="flex flex-col gap-1">
                  <p className="text-[10px] tracking-widest text-white/50 uppercase">
                    Phone
                  </p>
                  <a
                    href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
                    className="text-[13px] text-white/90 hover:text-white transition-colors"
                  >
                    {SITE_CONFIG.phone}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-white/50 mt-1" />
                <div className="flex flex-col gap-1">
                  <p className="text-[10px] tracking-widest text-white/50 uppercase">
                    Address
                  </p>
                  <p className="text-[13px] text-white/70 leading-relaxed max-w-[300px]">
                    {SITE_CONFIG.address.street}, {SITE_CONFIG.address.locality},{" "}
                    {SITE_CONFIG.address.country}
                  </p>
                </div>
              </div>
            </div>

            {/* Middle Column - Sitemap Links */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-8">
              <FooterLinkColumn title="Services" links={serviceLinks} />
              <FooterLinkColumn title="Industries" links={industryLinks} />
            </div>

            {/* Right Column - Contact Form + More Links */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="grid grid-cols-2 gap-8 mb-4">
                <FooterLinkColumn title="Company" links={companyLinks} />
                <FooterLinkColumn title="Resources" links={resourceLinks} />
              </div>

              <div className="mt-auto">
                <p className="text-[10px] tracking-widest text-white/50 uppercase mb-4">
                  Get in Touch
                </p>
                <ContactForm />
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="w-full flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/10 gap-6">
            {/* Legal Links */}
            <div className="flex gap-6 text-[9px] tracking-widest">
              <Link
                href="/privacy"
                className="text-[rgba(245,245,245,0.6)] no-underline hover:text-[rgba(245,245,245,0.9)] transition-colors"
              >
                PRIVACY
              </Link>
              <Link
                href="/terms"
                className="text-[rgba(245,245,245,0.6)] no-underline hover:text-[rgba(245,245,245,0.9)] transition-colors"
              >
                TERMS
              </Link>
              <Link
                href="/sitemap.xml"
                className="text-[rgba(245,245,245,0.6)] no-underline hover:text-[rgba(245,245,245,0.9)] transition-colors"
              >
                SITEMAP
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex gap-6 text-[9px] tracking-widest">
              <Link
                href={SITE_CONFIG.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[rgba(245,245,245,0.6)] no-underline hover:text-[rgba(245,245,245,0.9)] transition-colors"
              >
                TWITTER
              </Link>
              <Link
                href={SITE_CONFIG.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[rgba(245,245,245,0.6)] no-underline hover:text-[rgba(245,245,245,0.9)] transition-colors"
              >
                INSTAGRAM
              </Link>
              <Link
                href={SITE_CONFIG.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[rgba(245,245,245,0.6)] no-underline hover:text-[rgba(245,245,245,0.9)] transition-colors"
              >
                LINKEDIN
              </Link>
              <Link
                href={SITE_CONFIG.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[rgba(245,245,245,0.6)] no-underline hover:text-[rgba(245,245,245,0.9)] transition-colors"
              >
                GITHUB
              </Link>
            </div>

            {/* Copyright */}
            <div className="text-[9px] tracking-widest text-[rgba(245,245,245,0.6)]">
              © {new Date().getFullYear()} {SITE_CONFIG.name.toUpperCase()}. ALL
              RIGHTS RESERVED.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
