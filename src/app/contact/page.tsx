import { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { Header } from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { getContactMetadata } from "@/lib/seo/metadata";
import { SITE_CONFIG, SERVICES } from "@/lib/seo/constants";
import {
  generateProfessionalServiceSchema,
  generateBreadcrumbSchema,
  SchemaScript,
} from "@/lib/seo/schema";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = getContactMetadata();

export default function ContactPage() {
  const localBusinessSchema = generateProfessionalServiceSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://expontmind.com" },
    { name: "Contact", url: "https://expontmind.com/contact" },
  ]);

  return (
    <>
      <SchemaScript schema={[localBusinessSchema, breadcrumbSchema]} />
      <div className="min-h-screen font-sans bg-[#0f0a0a]">
        <Header />

        <main className="pt-32 pb-20">
          {/* Breadcrumbs */}
          <div className="px-[6vw] mb-8">
            <Breadcrumbs items={[{ label: "Contact", href: "/contact" }]} />
          </div>

          {/* Hero Section */}
          <section className="px-[6vw] mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 max-w-4xl">
              Let&apos;s Build Something
              <span className="text-stone-400"> Extraordinary</span>
            </h1>
            <p className="text-lg text-stone-400 max-w-2xl leading-relaxed">
              Ready to start your project? Contact us for a free consultation.
              We respond to all inquiries within 24 hours.
            </p>
          </section>

          {/* Main Content */}
          <section className="px-[6vw]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-medium text-white mb-6">
                  Send Us a Message
                </h2>
                <ContactForm />
              </div>

              {/* Contact Info */}
              <div className="space-y-12">
                <div>
                  <h2 className="text-2xl font-medium text-white mb-6">
                    Contact Information
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Mail className="w-5 h-5 text-stone-500 mt-1" />
                      <div>
                        <p className="text-stone-500 text-sm mb-1">Email</p>
                        <a
                          href={`mailto:${SITE_CONFIG.email}`}
                          className="text-white hover:text-stone-300 transition-colors"
                        >
                          {SITE_CONFIG.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Phone className="w-5 h-5 text-stone-500 mt-1" />
                      <div>
                        <p className="text-stone-500 text-sm mb-1">Phone</p>
                        <a
                          href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
                          className="text-white hover:text-stone-300 transition-colors"
                        >
                          {SITE_CONFIG.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-stone-500 mt-1" />
                      <div>
                        <p className="text-stone-500 text-sm mb-1">Address</p>
                        <p className="text-white">
                          {SITE_CONFIG.address.street}
                          <br />
                          {SITE_CONFIG.address.locality}, {SITE_CONFIG.address.region}
                          <br />
                          {SITE_CONFIG.address.country}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Clock className="w-5 h-5 text-stone-500 mt-1" />
                      <div>
                        <p className="text-stone-500 text-sm mb-1">Business Hours</p>
                        <p className="text-white">
                          Monday - Friday: 9:00 AM - 6:00 PM (UTC+8)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">
                    Explore Our Services
                  </h3>
                  <div className="space-y-2">
                    {Object.values(SERVICES).slice(0, 4).map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="flex items-center justify-between p-3 bg-stone-900/30 border border-stone-800 hover:border-stone-600 text-stone-300 hover:text-white transition-all group"
                      >
                        <span>{service.name}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Response Promise */}
                <div className="p-6 bg-stone-900/30 border border-stone-800">
                  <h3 className="text-lg font-medium text-white mb-3">
                    What to Expect
                  </h3>
                  <ul className="space-y-2 text-stone-400 text-sm">
                    <li>- Response within 24 hours</li>
                    <li>- Free initial consultation</li>
                    <li>- Detailed proposal within 48 hours</li>
                    <li>- No commitment required</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
