// SEO Constants for ExpontMind
// Global technology company - AI, Mobile, Web, Game Development

export const SITE_CONFIG = {
  name: "ExpontMind",
  tagline: "AI Solutions, Mobile Apps & Custom Software for Global Enterprises",
  description:
    "Global technology company delivering AI automation, mobile app development, web solutions, and game development. Enterprise-grade software for startups to Fortune 500.",
  url: "https://expontmind.com",
  locale: "en_US",
  type: "website",
  twitterHandle: "@expontmind",
  email: "expontmindsolutions@gmail.com",
  phone: "+976 8093-3171",
  address: {
    street: "UB Mart Building, 3rd Floor",
    locality: "Ulaanbaatar",
    region: "Sukhbaatar District",
    country: "MN",
    postalCode: "14200",
  },
  foundingYear: "2024",
  socialLinks: {
    twitter: "https://twitter.com/expontmind",
    linkedin: "https://linkedin.com/company/expontmind",
    instagram: "https://instagram.com/expontmind",
    github: "https://github.com/expontmind",
  },
} as const;

export const SERVICES = {
  aiAutomation: {
    name: "AI & Automation",
    slug: "ai-automation",
    title: "AI & Automation Services | Machine Learning Solutions | ExpontMind",
    description:
      "Enterprise AI solutions including machine learning, chatbot development, and process automation. Transform your business with intelligent automation that delivers measurable ROI.",
    keywords: [
      "AI development company",
      "machine learning solutions",
      "AI automation services",
      "chatbot development",
      "process automation",
      "AI consulting",
      "custom AI solutions",
      "enterprise AI",
      "predictive analytics",
      "natural language processing",
    ],
    subServices: [
      {
        name: "Machine Learning",
        slug: "machine-learning",
        description: "Custom ML models for predictive analytics and intelligent decision-making",
      },
      {
        name: "Chatbot Development",
        slug: "chatbot-development",
        description: "AI-powered conversational interfaces for customer service and engagement",
      },
      {
        name: "Process Automation",
        slug: "process-automation",
        description: "Intelligent workflow automation that reduces costs and increases efficiency",
      },
    ],
  },
  mobileAppDevelopment: {
    name: "Mobile App Development",
    slug: "mobile-app-development",
    title: "Mobile App Development Services | iOS & Android Apps | ExpontMind",
    description:
      "Full-service mobile app development for iOS, Android, and cross-platform. From startup MVPs to enterprise applications, we build apps that users love.",
    keywords: [
      "mobile app development company",
      "iOS app development",
      "Android app development",
      "React Native development",
      "Flutter development",
      "cross-platform apps",
      "enterprise mobile apps",
      "mobile app agency",
      "app development services",
      "mobile software development",
    ],
    subServices: [
      {
        name: "iOS Development",
        slug: "ios",
        description: "Native iOS applications built with Swift for optimal performance",
      },
      {
        name: "Android Development",
        slug: "android",
        description: "Native Android apps with Kotlin for the world's largest mobile platform",
      },
      {
        name: "Cross-Platform",
        slug: "cross-platform",
        description: "React Native and Flutter apps that work seamlessly on both platforms",
      },
    ],
  },
  webDevelopment: {
    name: "Web Development",
    slug: "web-development",
    title: "Web Development Services | React & Next.js Experts | ExpontMind",
    description:
      "Custom web development services including React, Next.js, and Node.js. We build fast, scalable web applications that drive business growth.",
    keywords: [
      "web development services",
      "custom web development",
      "React development",
      "Next.js development",
      "full-stack development",
      "Node.js development",
      "enterprise web applications",
      "web application development",
      "frontend development",
      "backend development",
    ],
    subServices: [
      {
        name: "Frontend Development",
        slug: "frontend",
        description: "Modern React and Next.js frontends with exceptional user experience",
      },
      {
        name: "Backend Development",
        slug: "backend",
        description: "Scalable Node.js and Python backends built for performance",
      },
      {
        name: "Full-Stack Development",
        slug: "fullstack",
        description: "End-to-end web application development from database to UI",
      },
    ],
  },
  gameDevelopment: {
    name: "Game Development",
    slug: "game-development",
    title: "Game Development Company | Unreal Engine & Unity | ExpontMind",
    description:
      "Professional game development services for PC, console, and VR/AR. Our team delivers immersive gaming experiences using Unreal Engine and Unity.",
    keywords: [
      "game development company",
      "Unreal Engine development",
      "Unity development",
      "VR game development",
      "AR development",
      "PC game development",
      "console game development",
      "game studio",
      "serious games",
      "game development services",
    ],
    subServices: [
      {
        name: "Unreal Engine",
        slug: "unreal-engine",
        description: "AAA-quality games and experiences built with Unreal Engine 5",
      },
      {
        name: "Unity Development",
        slug: "unity",
        description: "Versatile game development for mobile, PC, and console platforms",
      },
      {
        name: "VR/AR Development",
        slug: "vr-ar",
        description: "Immersive virtual and augmented reality experiences",
      },
    ],
  },
  threeDModeling: {
    name: "3D Modeling & Animation",
    slug: "3d-modeling",
    title: "3D Modeling & Animation Services | Visualization | ExpontMind",
    description:
      "Professional 3D modeling, animation, and visualization services. From product renders to architectural visualization, we bring your concepts to life.",
    keywords: [
      "3D modeling services",
      "3D animation",
      "product visualization",
      "architectural visualization",
      "3D rendering",
      "character modeling",
      "motion graphics",
      "WebGL development",
      "3D visualization",
      "CGI services",
    ],
    subServices: [],
  },
  customSoftware: {
    name: "Custom Software",
    slug: "custom-software",
    title: "Custom Software Development | Enterprise Solutions | ExpontMind",
    description:
      "Bespoke software development for enterprises. We build scalable, secure custom software solutions that solve complex business challenges.",
    keywords: [
      "custom software development",
      "enterprise software",
      "bespoke software",
      "SaaS development",
      "API development",
      "cloud solutions",
      "legacy modernization",
      "software consulting",
      "enterprise systems",
      "software development company",
    ],
    subServices: [],
  },
} as const;

export const INDUSTRIES = {
  healthcare: {
    name: "Healthcare",
    slug: "healthcare",
    title: "Healthcare Software Development | HIPAA Compliant | ExpontMind",
    description:
      "Healthcare software development including telehealth platforms, medical device software, and EHR integrations. HIPAA-compliant solutions that improve patient outcomes.",
    keywords: [
      "healthcare software development",
      "telehealth development",
      "medical software",
      "HIPAA compliant apps",
      "healthtech",
      "EHR integration",
      "medical device software",
      "healthcare app development",
    ],
  },
  fintech: {
    name: "Fintech",
    slug: "fintech",
    title: "Fintech Software Development | Banking & Payments | ExpontMind",
    description:
      "Fintech software development for banking, payments, and financial services. PCI-DSS compliant solutions that transform financial operations.",
    keywords: [
      "fintech development",
      "banking app development",
      "payment solutions",
      "financial software",
      "PCI-DSS compliant",
      "neobank development",
      "trading platforms",
      "fintech app development",
    ],
  },
  gaming: {
    name: "Gaming & Entertainment",
    slug: "gaming",
    title: "Gaming Software Development | Entertainment Tech | ExpontMind",
    description:
      "Gaming and entertainment software development. From game studios to streaming platforms, we build engaging digital experiences.",
    keywords: [
      "gaming software",
      "game studio services",
      "entertainment apps",
      "streaming platforms",
      "esports development",
      "gaming technology",
      "interactive entertainment",
    ],
  },
  saas: {
    name: "SaaS",
    slug: "saas",
    title: "SaaS Development Company | B2B & B2C Platforms | ExpontMind",
    description:
      "SaaS product development for B2B and B2C markets. We build scalable, multi-tenant platforms that grow with your business.",
    keywords: [
      "SaaS development",
      "SaaS product development",
      "B2B SaaS",
      "B2C SaaS",
      "multi-tenant applications",
      "SaaS platform development",
      "subscription software",
      "cloud applications",
    ],
  },
  ecommerce: {
    name: "E-commerce & Retail",
    slug: "ecommerce",
    title: "E-commerce Development | Online Retail Solutions | ExpontMind",
    description:
      "E-commerce development for online retail. Custom storefronts, marketplace platforms, and headless commerce solutions that drive sales.",
    keywords: [
      "ecommerce development",
      "online store development",
      "marketplace development",
      "headless commerce",
      "Shopify development",
      "retail software",
      "ecommerce platforms",
      "online retail solutions",
    ],
  },
} as const;

export const TECHNOLOGIES = [
  { name: "React", slug: "react", category: "frontend" },
  { name: "Next.js", slug: "nextjs", category: "frontend" },
  { name: "TypeScript", slug: "typescript", category: "language" },
  { name: "Node.js", slug: "nodejs", category: "backend" },
  { name: "Python", slug: "python", category: "backend" },
  { name: "React Native", slug: "react-native", category: "mobile" },
  { name: "Flutter", slug: "flutter", category: "mobile" },
  { name: "Swift", slug: "swift", category: "mobile" },
  { name: "Kotlin", slug: "kotlin", category: "mobile" },
  { name: "Unreal Engine", slug: "unreal-engine", category: "game" },
  { name: "Unity", slug: "unity", category: "game" },
  { name: "Three.js", slug: "threejs", category: "3d" },
  { name: "WebGL", slug: "webgl", category: "3d" },
  { name: "TensorFlow", slug: "tensorflow", category: "ai" },
  { name: "PyTorch", slug: "pytorch", category: "ai" },
  { name: "AWS", slug: "aws", category: "cloud" },
  { name: "Google Cloud", slug: "google-cloud", category: "cloud" },
  { name: "Azure", slug: "azure", category: "cloud" },
  { name: "PostgreSQL", slug: "postgresql", category: "database" },
  { name: "MongoDB", slug: "mongodb", category: "database" },
] as const;

export const DEFAULT_KEYWORDS = [
  "software development company",
  "technology partner",
  "digital agency",
  "custom software",
  "enterprise solutions",
  "AI development",
  "mobile app development",
  "web development",
  "game development",
  "3D modeling",
  "digital transformation",
  "technology consulting",
];
