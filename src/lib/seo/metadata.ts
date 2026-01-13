// Metadata Generators for ExpontMind
// Reusable metadata templates for Next.js App Router

import type { Metadata } from "next";
import { SITE_CONFIG, SERVICES, INDUSTRIES, DEFAULT_KEYWORDS } from "./constants";

interface PageMetadataProps {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}

// Generate full metadata object for any page
export function generatePageMetadata({
  title,
  description,
  keywords = [],
  path = "",
  image,
  noIndex = false,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
}: PageMetadataProps): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;
  const ogImage = image || `${SITE_CONFIG.url}/og/default.jpg`;
  const allKeywords = [...new Set([...keywords, ...DEFAULT_KEYWORDS])];

  const metadata: Metadata = {
    title: title,
    description: description,
    keywords: allKeywords,
    authors: authors?.map((name) => ({ name })) || [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: title,
      description: description,
      url: url,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: SITE_CONFIG.locale,
      type: type,
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [ogImage],
      creator: SITE_CONFIG.twitterHandle,
      site: SITE_CONFIG.twitterHandle,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };

  // Add article-specific metadata
  if (type === "article" && publishedTime) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: "article",
      publishedTime,
      modifiedTime: modifiedTime || publishedTime,
      authors: authors || [SITE_CONFIG.name],
    } as Metadata["openGraph"];
  }

  return metadata;
}

// Homepage metadata
export function getHomeMetadata(): Metadata {
  return generatePageMetadata({
    title: `${SITE_CONFIG.name} | AI Solutions, Mobile Apps & Custom Software Development`,
    description: SITE_CONFIG.description,
    keywords: [
      "software development company",
      "AI development company",
      "mobile app development",
      "web development services",
      "game development company",
      "custom software development",
      "enterprise software",
      "digital transformation",
      "technology partner",
      "full-service tech agency",
    ],
    path: "",
  });
}

// Service page metadata generator
export function getServiceMetadata(serviceKey: keyof typeof SERVICES): Metadata {
  const service = SERVICES[serviceKey];
  return generatePageMetadata({
    title: service.title,
    description: service.description,
    keywords: [...service.keywords],
    path: `/services/${service.slug}`,
  });
}

// Sub-service page metadata generator
export function getSubServiceMetadata(
  serviceKey: keyof typeof SERVICES,
  subServiceSlug: string
): Metadata | null {
  const service = SERVICES[serviceKey];
  const subService = service.subServices.find((s) => s.slug === subServiceSlug);

  if (!subService) return null;

  return generatePageMetadata({
    title: `${subService.name} Services | ${service.name} | ExpontMind`,
    description: `${subService.description}. Expert ${subService.name.toLowerCase()} solutions from ExpontMind. Get a free consultation.`,
    keywords: [...service.keywords, subService.name.toLowerCase(), `${subService.name.toLowerCase()} services`],
    path: `/services/${service.slug}/${subService.slug}`,
  });
}

// Industry page metadata generator
export function getIndustryMetadata(industryKey: keyof typeof INDUSTRIES): Metadata {
  const industry = INDUSTRIES[industryKey];
  return generatePageMetadata({
    title: industry.title,
    description: industry.description,
    keywords: [...industry.keywords],
    path: `/industries/${industry.slug}`,
  });
}

// Blog listing metadata
export function getBlogMetadata(): Metadata {
  return generatePageMetadata({
    title: "Blog & Insights | Technology Trends & Best Practices | ExpontMind",
    description:
      "Expert insights on AI, mobile development, web technologies, and game development. Stay ahead with our technology blog covering trends, tutorials, and best practices.",
    keywords: [
      "technology blog",
      "software development insights",
      "AI trends",
      "mobile development tips",
      "web development best practices",
      "game development tutorials",
      "tech industry insights",
    ],
    path: "/blog",
  });
}

// Blog article metadata generator
export function getBlogArticleMetadata(article: {
  title: string;
  excerpt: string;
  slug: string;
  featuredImage?: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  tags?: string[];
}): Metadata {
  return generatePageMetadata({
    title: `${article.title} | ExpontMind Blog`,
    description: article.excerpt,
    keywords: article.tags || [],
    path: `/blog/${article.slug}`,
    image: article.featuredImage,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    authors: [article.author],
  });
}

// Work/Portfolio metadata
export function getWorkMetadata(): Metadata {
  return generatePageMetadata({
    title: "Our Work | Case Studies & Portfolio | ExpontMind",
    description:
      "Explore our portfolio of successful projects across AI, mobile apps, web development, and games. See how we deliver results for startups and enterprises.",
    keywords: [
      "software portfolio",
      "case studies",
      "development projects",
      "client work",
      "software success stories",
      "tech portfolio",
    ],
    path: "/work",
  });
}

// Contact page metadata
export function getContactMetadata(): Metadata {
  return generatePageMetadata({
    title: "Contact Us | Get a Free Consultation | ExpontMind",
    description:
      "Contact ExpontMind for your software development needs. Get a free consultation on AI, mobile apps, web development, or game projects. Response within 24 hours.",
    keywords: [
      "contact software company",
      "free consultation",
      "software development quote",
      "hire developers",
      "technology partner",
    ],
    path: "/contact",
  });
}

// About page metadata
export function getAboutMetadata(): Metadata {
  return generatePageMetadata({
    title: "About Us | Our Team & Mission | ExpontMind",
    description:
      "Learn about ExpontMind - a global technology company delivering AI solutions, mobile apps, web development, and games. Meet our team and discover our mission.",
    keywords: [
      "about ExpontMind",
      "software company",
      "technology team",
      "company mission",
      "development agency",
    ],
    path: "/company/about",
  });
}

// Services hub metadata
export function getServicesHubMetadata(): Metadata {
  return generatePageMetadata({
    title: "Our Services | AI, Mobile, Web & Game Development | ExpontMind",
    description:
      "Comprehensive technology services including AI automation, mobile app development, web development, game development, 3D modeling, and custom software solutions.",
    keywords: [
      "technology services",
      "software development services",
      "AI services",
      "mobile development services",
      "web development services",
      "game development services",
      "3D modeling services",
      "custom software services",
    ],
    path: "/services",
  });
}

// Industries hub metadata
export function getIndustriesHubMetadata(): Metadata {
  return generatePageMetadata({
    title: "Industries We Serve | Sector Expertise | ExpontMind",
    description:
      "Industry-specific software solutions for healthcare, fintech, gaming, SaaS, and e-commerce. We understand your sector's unique challenges and compliance requirements.",
    keywords: [
      "industry solutions",
      "healthcare software",
      "fintech development",
      "gaming software",
      "SaaS development",
      "ecommerce solutions",
      "sector expertise",
    ],
    path: "/industries",
  });
}
