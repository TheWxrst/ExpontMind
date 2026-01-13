import { Metadata } from "next";
import { Brain } from "lucide-react";
import { ServicePageLayout } from "@/components/services/ServicePageLayout";
import { getServiceMetadata } from "@/lib/seo/metadata";
import { SERVICES, INDUSTRIES } from "@/lib/seo/constants";
import {
  generateServiceSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  SchemaScript,
} from "@/lib/seo/schema";

export const metadata: Metadata = getServiceMetadata("aiAutomation");

const service = SERVICES.aiAutomation;

const capabilities = [
  "Custom machine learning model development and training",
  "Natural language processing and text analytics",
  "Computer vision and image recognition systems",
  "Predictive analytics and forecasting models",
  "Intelligent chatbots and virtual assistants",
  "Robotic process automation (RPA) implementation",
  "AI-powered recommendation engines",
  "Sentiment analysis and customer insights",
  "Automated decision-making systems",
  "AI integration with existing enterprise systems",
  "MLOps and model deployment pipelines",
  "Continuous model monitoring and optimization",
];

const technologies = [
  "TensorFlow",
  "PyTorch",
  "OpenAI GPT",
  "Claude API",
  "LangChain",
  "Hugging Face",
  "scikit-learn",
  "Python",
  "FastAPI",
  "AWS SageMaker",
  "Google Vertex AI",
  "Azure ML",
  "Docker",
  "Kubernetes",
  "MLflow",
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
    question: "How long does it take to develop a custom AI solution?",
    answer:
      "Timeline depends on complexity. A simple chatbot or automation can be deployed in 4-6 weeks. Complex ML models with custom training typically require 3-6 months. We provide detailed timelines during the discovery phase after understanding your specific requirements.",
  },
  {
    question: "What data do you need to build an AI solution?",
    answer:
      "The data requirements vary by project. For ML models, you'll need historical data relevant to your use case. We help you identify what data is needed, assess data quality, and implement data collection strategies if needed. We can also work with synthetic data or pre-trained models for certain applications.",
  },
  {
    question: "How do you ensure AI solutions are secure and compliant?",
    answer:
      "Security is built into every stage of development. We implement encryption, access controls, and audit logging. For regulated industries, we ensure compliance with HIPAA, GDPR, SOC 2, and other relevant standards. All models undergo bias testing and ethical review.",
  },
  {
    question: "Can AI solutions integrate with our existing systems?",
    answer:
      "Yes. We specialize in integrating AI capabilities with existing enterprise systems, CRMs, ERPs, and databases. Our solutions are designed with APIs that connect seamlessly with your technology stack, whether cloud-based or on-premise.",
  },
  {
    question: "What is the typical ROI for AI automation projects?",
    answer:
      "ROI varies by use case, but clients typically see 30-70% reduction in manual processing time for automation projects. Predictive analytics implementations often deliver 15-40% improvement in decision accuracy. We help you define success metrics and measure outcomes.",
  },
];

export default function AIAutomationPage() {
  // Generate schemas
  const serviceSchema = generateServiceSchema({
    name: service.name,
    description: service.description,
    url: `https://expontmind.com/services/${service.slug}`,
    serviceType: "AI Development Services",
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
        headline="AI & Automation Solutions"
        subheadline="That Transform Operations"
        description="We build intelligent systems that automate complex processes, extract insights from data, and enable smarter decision-making. From machine learning models to conversational AI, our solutions deliver measurable business impact and competitive advantage."
        icon={<Brain className="w-8 h-8 text-white" />}
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
        {/* Custom content for AI page */}
        <section className="px-[6vw] mb-20">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-8">
            Our AI Development Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Discovery & Data Assessment",
                desc: "We analyze your business objectives, existing data assets, and infrastructure to identify high-impact AI opportunities.",
              },
              {
                step: "02",
                title: "Model Development",
                desc: "Our data scientists develop, train, and validate models using your data, with iterative refinement based on performance metrics.",
              },
              {
                step: "03",
                title: "Integration & Deployment",
                desc: "We integrate AI capabilities into your workflows with production-ready APIs, monitoring, and scaling infrastructure.",
              },
              {
                step: "04",
                title: "Optimization & Support",
                desc: "Continuous model monitoring, retraining, and optimization ensure sustained performance as your data evolves.",
              },
            ].map((item) => (
              <div key={item.step} className="p-6 bg-stone-900/30 border border-stone-800">
                <span className="text-3xl font-light text-stone-700 mb-4 block">
                  {item.step}
                </span>
                <h3 className="text-lg font-medium text-white mb-3">{item.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section className="px-[6vw] py-20 bg-stone-950 mb-20">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-12">
            AI Solutions by Use Case
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-white">Customer Experience</h3>
              <ul className="space-y-2 text-stone-400">
                <li>- Intelligent chatbots for 24/7 support</li>
                <li>- Personalized product recommendations</li>
                <li>- Sentiment analysis for feedback</li>
                <li>- Voice assistants and IVR systems</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-white">Operations</h3>
              <ul className="space-y-2 text-stone-400">
                <li>- Document processing automation</li>
                <li>- Predictive maintenance</li>
                <li>- Supply chain optimization</li>
                <li>- Quality control with computer vision</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-white">Analytics & Insights</h3>
              <ul className="space-y-2 text-stone-400">
                <li>- Demand forecasting</li>
                <li>- Fraud detection</li>
                <li>- Customer churn prediction</li>
                <li>- Market trend analysis</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-white">Content & Creative</h3>
              <ul className="space-y-2 text-stone-400">
                <li>- Automated content generation</li>
                <li>- Image and video analysis</li>
                <li>- Translation and localization</li>
                <li>- Content moderation</li>
              </ul>
            </div>
          </div>
        </section>
      </ServicePageLayout>
    </>
  );
}
