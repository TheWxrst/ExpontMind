import { Metadata } from "next";
import { Smartphone } from "lucide-react";
import { ServicePageLayout } from "@/components/services/ServicePageLayout";
import { getServiceMetadata } from "@/lib/seo/metadata";
import { SERVICES } from "@/lib/seo/constants";
import {
  generateServiceSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  SchemaScript,
} from "@/lib/seo/schema";

export const metadata: Metadata = getServiceMetadata("mobileAppDevelopment");

const service = SERVICES.mobileAppDevelopment;

const capabilities = [
  "Native iOS development with Swift and SwiftUI",
  "Native Android development with Kotlin",
  "Cross-platform apps with React Native",
  "Cross-platform apps with Flutter",
  "Mobile app UI/UX design",
  "Backend API development for mobile",
  "Push notification systems",
  "In-app purchase and subscription integration",
  "Offline-first architecture",
  "Mobile analytics and crash reporting",
  "App Store and Play Store optimization (ASO)",
  "Mobile app security and encryption",
  "Performance optimization",
  "App maintenance and updates",
];

const technologies = [
  "Swift",
  "SwiftUI",
  "Kotlin",
  "Jetpack Compose",
  "React Native",
  "Flutter",
  "Dart",
  "TypeScript",
  "Firebase",
  "AWS Amplify",
  "GraphQL",
  "REST APIs",
  "SQLite",
  "Realm",
  "Core Data",
];

const industries = [
  { name: "Healthcare", slug: "healthcare" },
  { name: "Fintech", slug: "fintech" },
  { name: "E-commerce", slug: "ecommerce" },
  { name: "SaaS", slug: "saas" },
  { name: "Gaming", slug: "gaming" },
];

const faqs = [
  {
    question: "Should I build native apps or cross-platform?",
    answer:
      "It depends on your requirements. Native apps (Swift/Kotlin) offer the best performance and access to latest platform features, ideal for complex apps or when platform-specific UX is critical. Cross-platform (React Native/Flutter) reduces development time and cost by sharing code across iOS and Android, suitable for most business apps. We help you choose based on your specific needs, timeline, and budget.",
  },
  {
    question: "How long does mobile app development take?",
    answer:
      "A simple MVP typically takes 2-3 months. Medium-complexity apps with custom backend take 4-6 months. Enterprise-grade applications with complex features may require 6-12 months. We provide detailed timelines during discovery based on your feature requirements.",
  },
  {
    question: "What is your mobile app development process?",
    answer:
      "We follow an agile methodology: 1) Discovery and requirements analysis, 2) UI/UX design with prototypes, 3) Development in 2-week sprints with regular demos, 4) QA testing across devices, 5) App store submission and launch, 6) Post-launch monitoring and iterations. You're involved at every stage.",
  },
  {
    question: "Do you provide app maintenance after launch?",
    answer:
      "Yes. We offer ongoing maintenance packages that include bug fixes, OS compatibility updates, performance monitoring, and feature enhancements. Mobile platforms evolve rapidly, and regular maintenance ensures your app stays current and functional.",
  },
  {
    question: "How do you handle app store submissions?",
    answer:
      "We manage the entire submission process for both Apple App Store and Google Play Store. This includes preparing store listings, screenshots, app previews, and handling review feedback. We also optimize for discoverability with ASO (App Store Optimization) best practices.",
  },
];

export default function MobileAppDevelopmentPage() {
  const serviceSchema = generateServiceSchema({
    name: service.name,
    description: service.description,
    url: `https://expontmind.com/services/${service.slug}`,
    serviceType: "Mobile App Development Services",
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
        headline="Mobile App Development"
        subheadline="That Users Love"
        description="We build native and cross-platform mobile applications that deliver exceptional user experiences. From startup MVPs to enterprise apps serving millions, our mobile solutions combine beautiful design with robust engineering to drive engagement and growth."
        icon={<Smartphone className="w-8 h-8 text-white" />}
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
        {/* Platform Comparison */}
        <section className="px-[6vw] mb-20">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-8">
            Choosing the Right Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-stone-900/30 border border-stone-800">
              <h3 className="text-xl font-medium text-white mb-4">Native iOS</h3>
              <p className="text-stone-400 text-sm mb-4">
                Swift and SwiftUI for maximum performance and seamless Apple ecosystem integration.
              </p>
              <p className="text-stone-500 text-xs">
                Best for: Apple-first products, complex animations, hardware integration
              </p>
            </div>
            <div className="p-6 bg-stone-900/30 border border-stone-800">
              <h3 className="text-xl font-medium text-white mb-4">Native Android</h3>
              <p className="text-stone-400 text-sm mb-4">
                Kotlin and Jetpack Compose for optimal Android experience and platform features.
              </p>
              <p className="text-stone-500 text-xs">
                Best for: Android-first products, enterprise MDM, device diversity
              </p>
            </div>
            <div className="p-6 bg-stone-900/30 border border-stone-800">
              <h3 className="text-xl font-medium text-white mb-4">Cross-Platform</h3>
              <p className="text-stone-400 text-sm mb-4">
                React Native or Flutter for shared codebase across iOS and Android.
              </p>
              <p className="text-stone-500 text-xs">
                Best for: Faster time-to-market, budget optimization, feature parity
              </p>
            </div>
          </div>
        </section>

        {/* App Types */}
        <section className="px-[6vw] py-20 bg-stone-950 mb-20">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-12">
            Apps We Build
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Consumer Apps",
              "Enterprise Apps",
              "E-commerce Apps",
              "Healthcare Apps",
              "Fintech Apps",
              "Social Apps",
              "On-demand Apps",
              "IoT Apps",
            ].map((type) => (
              <div
                key={type}
                className="p-4 bg-stone-900/50 border border-stone-800 text-center text-stone-300"
              >
                {type}
              </div>
            ))}
          </div>
        </section>
      </ServicePageLayout>
    </>
  );
}
