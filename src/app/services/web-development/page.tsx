import { Metadata } from "next";
import { Globe } from "lucide-react";
import { ServicePageLayout } from "@/components/services/ServicePageLayout";
import { getServiceMetadata } from "@/lib/seo/metadata";
import { SERVICES } from "@/lib/seo/constants";
import {
  generateServiceSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  SchemaScript,
} from "@/lib/seo/schema";

export const metadata: Metadata = getServiceMetadata("webDevelopment");

const service = SERVICES.webDevelopment;

const capabilities = [
  "Custom web application development",
  "React and Next.js frontend development",
  "Node.js and Python backend development",
  "Progressive Web Apps (PWA)",
  "E-commerce platforms and storefronts",
  "SaaS platform development",
  "Headless CMS implementation",
  "API development and integration",
  "Database design and optimization",
  "Cloud infrastructure and DevOps",
  "Performance optimization",
  "SEO-friendly architecture",
  "Accessibility (WCAG) compliance",
  "Web security and penetration testing",
];

const technologies = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "Django",
  "FastAPI",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "GraphQL",
  "REST APIs",
  "AWS",
  "Vercel",
  "Docker",
  "Tailwind CSS",
];

const industries = [
  { name: "SaaS", slug: "saas" },
  { name: "E-commerce", slug: "ecommerce" },
  { name: "Fintech", slug: "fintech" },
  { name: "Healthcare", slug: "healthcare" },
  { name: "Gaming", slug: "gaming" },
];

const faqs = [
  {
    question: "What technologies do you use for web development?",
    answer:
      "Our primary stack is React/Next.js for frontend and Node.js or Python for backend, with PostgreSQL or MongoDB for databases. We choose technologies based on your specific requirements - scalability needs, team familiarity, and long-term maintenance considerations. We're also experienced with other frameworks when project needs require them.",
  },
  {
    question: "How do you ensure web application security?",
    answer:
      "Security is integrated throughout development. We follow OWASP guidelines, implement proper authentication (OAuth, JWT), encrypt sensitive data, conduct code reviews, and perform penetration testing before launch. For regulated industries, we ensure compliance with relevant standards (HIPAA, PCI-DSS, SOC 2).",
  },
  {
    question: "Can you optimize our existing web application?",
    answer:
      "Yes. We offer performance audits and optimization services for existing applications. This includes code optimization, database query improvements, caching strategies, CDN implementation, and infrastructure scaling. We also provide refactoring and modernization for legacy applications.",
  },
  {
    question: "Do you build custom CMS or use existing platforms?",
    answer:
      "Both. For content-heavy sites, we implement headless CMS solutions (Contentful, Sanity, Strapi) that give editors flexibility while maintaining performance. For unique requirements, we build custom admin interfaces. We recommend based on your content management needs and team capabilities.",
  },
  {
    question: "How do you handle scalability?",
    answer:
      "We design for scale from the start with cloud-native architecture, containerization, load balancing, and database optimization. Our applications handle traffic spikes gracefully. We provide ongoing monitoring and can scale infrastructure as your user base grows.",
  },
];

export default function WebDevelopmentPage() {
  const serviceSchema = generateServiceSchema({
    name: service.name,
    description: service.description,
    url: `https://expontmind.com/services/${service.slug}`,
    serviceType: "Web Development Services",
  });

  const faqSchema = generateFAQSchema(faqs);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://expontmind.com" },
    { name: "Services", url: "https://expontmind.com/services" },
    { name: service.name, url: `https://expontmind.com/services/${service.slug}` },
  ]);

  return (
    <>
      <SchemaScript schema={[serviceSchema, faqSchema, breadcrumbSchema]} />
      <ServicePageLayout
        serviceName={service.name}
        serviceSlug={service.slug}
        headline="Web Development"
        subheadline="Built for Performance"
        description="We build fast, scalable web applications that drive business results. From corporate websites to complex SaaS platforms, our web solutions combine modern architecture with thoughtful UX to deliver exceptional digital experiences."
        icon={<Globe className="w-8 h-8 text-white" />}
        subServices={service.subServices.map((s) => ({
          name: s.name,
          slug: s.slug,
          description: s.description,
        }))}
        capabilities={capabilities}
        technologies={technologies}
        industries={industries}
        faqs={faqs}
      >
        {/* Architecture Approaches */}
        <section className="px-[6vw] mb-20">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-8">
            Architecture Approaches
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-stone-900/30 border border-stone-800">
              <h3 className="text-xl font-medium text-white mb-4">Server-Side Rendering (SSR)</h3>
              <p className="text-stone-400 text-sm mb-4">
                Next.js SSR for SEO-critical applications with dynamic content. Pages render on server for fast initial load and search engine visibility.
              </p>
              <p className="text-stone-500 text-xs">
                Best for: Marketing sites, e-commerce, content platforms
              </p>
            </div>
            <div className="p-6 bg-stone-900/30 border border-stone-800">
              <h3 className="text-xl font-medium text-white mb-4">Static Generation (SSG)</h3>
              <p className="text-stone-400 text-sm mb-4">
                Pre-built pages at build time for maximum performance. Combined with ISR for dynamic content updates without full rebuilds.
              </p>
              <p className="text-stone-500 text-xs">
                Best for: Documentation, blogs, landing pages
              </p>
            </div>
            <div className="p-6 bg-stone-900/30 border border-stone-800">
              <h3 className="text-xl font-medium text-white mb-4">Single Page Application (SPA)</h3>
              <p className="text-stone-400 text-sm mb-4">
                React SPAs for highly interactive applications with complex state management and real-time features.
              </p>
              <p className="text-stone-500 text-xs">
                Best for: Dashboards, admin panels, internal tools
              </p>
            </div>
            <div className="p-6 bg-stone-900/30 border border-stone-800">
              <h3 className="text-xl font-medium text-white mb-4">Microservices</h3>
              <p className="text-stone-400 text-sm mb-4">
                Distributed architecture for enterprise applications. Independent services that scale and deploy independently.
              </p>
              <p className="text-stone-500 text-xs">
                Best for: Large-scale SaaS, enterprise platforms
              </p>
            </div>
          </div>
        </section>

        {/* What We Build */}
        <section className="px-[6vw] py-20 bg-stone-950 mb-20">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-12">
            Web Solutions We Deliver
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-white">Business Websites</h3>
              <ul className="space-y-2 text-stone-400 text-sm">
                <li>- Corporate websites</li>
                <li>- Landing pages</li>
                <li>- Marketing microsites</li>
                <li>- Portfolio showcases</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-white">Web Applications</h3>
              <ul className="space-y-2 text-stone-400 text-sm">
                <li>- SaaS platforms</li>
                <li>- Customer portals</li>
                <li>- Admin dashboards</li>
                <li>- Internal tools</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-white">E-commerce</h3>
              <ul className="space-y-2 text-stone-400 text-sm">
                <li>- Custom storefronts</li>
                <li>- Marketplace platforms</li>
                <li>- Headless commerce</li>
                <li>- Subscription systems</li>
              </ul>
            </div>
          </div>
        </section>
      </ServicePageLayout>
    </>
  );
}
