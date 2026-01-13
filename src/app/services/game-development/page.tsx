import { Metadata } from "next";
import { Gamepad2 } from "lucide-react";
import { ServicePageLayout } from "@/components/services/ServicePageLayout";
import { getServiceMetadata } from "@/lib/seo/metadata";
import { SERVICES } from "@/lib/seo/constants";
import {
  generateServiceSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  SchemaScript,
} from "@/lib/seo/schema";

export const metadata: Metadata = getServiceMetadata("gameDevelopment");

const service = SERVICES.gameDevelopment;

const capabilities = [
  "Unreal Engine 5 development",
  "Unity game development",
  "PC game development",
  "Console game development (PlayStation, Xbox, Switch)",
  "Mobile game development",
  "VR game development (Quest, PCVR)",
  "AR experiences and games",
  "Multiplayer and networking",
  "Game UI/UX design",
  "3D asset creation and optimization",
  "Game audio and music integration",
  "QA testing and optimization",
  "Live operations and analytics",
  "Game porting and optimization",
];

const technologies = [
  "Unreal Engine 5",
  "Unity",
  "C++",
  "C#",
  "Blueprints",
  "Photon",
  "PlayFab",
  "Steam SDK",
  "PlayStation SDK",
  "Xbox GDK",
  "OpenXR",
  "Blender",
  "Maya",
  "Substance",
  "FMOD",
];

const industries = [
  { name: "Gaming", slug: "gaming" },
  { name: "Healthcare", slug: "healthcare" },
  { name: "E-commerce", slug: "ecommerce" },
  { name: "SaaS", slug: "saas" },
];

const faqs = [
  {
    question: "Which game engine should I choose - Unreal or Unity?",
    answer:
      "Unreal Engine 5 excels at high-fidelity visuals, large open worlds, and AAA-quality experiences. Unity is more versatile for mobile games, 2D games, and projects requiring rapid iteration. We help you choose based on your visual requirements, target platforms, team experience, and budget.",
  },
  {
    question: "How long does game development take?",
    answer:
      "Timeline varies significantly by scope. A mobile game MVP can take 3-6 months. Mid-size PC/console games typically require 12-24 months. AAA-quality projects may take 2-4 years. We provide detailed timelines during pre-production after scope is defined.",
  },
  {
    question: "Do you develop for consoles (PlayStation, Xbox, Switch)?",
    answer:
      "Yes. We are registered developers for all major platforms. We handle platform-specific optimization, certification requirements, and submission processes. Console development typically requires additional time for certification and platform compliance.",
  },
  {
    question: "Can you help with VR/AR development?",
    answer:
      "Yes. We develop VR experiences for Meta Quest, PCVR (SteamVR), and PlayStation VR, as well as AR applications for mobile devices and enterprise headsets. We have experience with both gaming and enterprise/training applications.",
  },
  {
    question: "Do you work with existing game studios?",
    answer:
      "Yes. We provide co-development services for studios needing additional capacity, specialized expertise (AI, networking, VR), or specific platform support. We integrate with your existing pipelines and tools.",
  },
];

export default function GameDevelopmentPage() {
  const serviceSchema = generateServiceSchema({
    name: service.name,
    description: service.description,
    url: `https://expontmind.com/services/${service.slug}`,
    serviceType: "Game Development Services",
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
        headline="Game Development"
        subheadline="Immersive Experiences"
        description="We create engaging games and interactive experiences using Unreal Engine and Unity. From indie titles to AAA-quality productions, our team delivers compelling gameplay, stunning visuals, and technical excellence across PC, console, mobile, and VR platforms."
        icon={<Gamepad2 className="w-8 h-8 text-white" />}
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
        {/* Platform Support */}
        <section className="px-[6vw] mb-20">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-8">
            Platforms We Support
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "PC (Steam, Epic)",
              "PlayStation 5",
              "Xbox Series X|S",
              "Nintendo Switch",
              "iOS",
              "Android",
              "Meta Quest",
              "PCVR (SteamVR)",
            ].map((platform) => (
              <div
                key={platform}
                className="p-4 bg-stone-900/30 border border-stone-800 text-center text-stone-300"
              >
                {platform}
              </div>
            ))}
          </div>
        </section>

        {/* Game Types */}
        <section className="px-[6vw] py-20 bg-stone-950 mb-20">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-12">
            Games We Create
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-white">Entertainment Games</h3>
              <ul className="space-y-2 text-stone-400 text-sm">
                <li>- Action and Adventure</li>
                <li>- RPGs and Open World</li>
                <li>- Multiplayer and Online</li>
                <li>- Mobile and Casual</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-white">Serious Games</h3>
              <ul className="space-y-2 text-stone-400 text-sm">
                <li>- Training Simulations</li>
                <li>- Educational Games</li>
                <li>- Healthcare Applications</li>
                <li>- Corporate Training</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-white">Immersive Experiences</h3>
              <ul className="space-y-2 text-stone-400 text-sm">
                <li>- VR Games and Experiences</li>
                <li>- AR Applications</li>
                <li>- Location-based Entertainment</li>
                <li>- Interactive Installations</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Development Process */}
        <section className="px-[6vw] mb-20">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-8">
            Game Development Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { phase: "Concept", desc: "Game design, mechanics, and scope definition" },
              { phase: "Pre-Production", desc: "Prototyping, art direction, technical planning" },
              { phase: "Production", desc: "Asset creation, programming, level design" },
              { phase: "Polish", desc: "Bug fixing, optimization, balancing" },
              { phase: "Launch", desc: "Platform submission, marketing, live ops" },
            ].map((item, index) => (
              <div key={item.phase} className="p-4 bg-stone-900/30 border border-stone-800">
                <span className="text-stone-600 text-xs font-mono">
                  Phase {index + 1}
                </span>
                <h3 className="text-lg font-medium text-white mt-2 mb-2">{item.phase}</h3>
                <p className="text-stone-400 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </ServicePageLayout>
    </>
  );
}
