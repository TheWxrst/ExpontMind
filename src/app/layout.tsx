import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { LoadingProvider } from "@/context/LoadingContext";
import Loader from "@/components/Loader";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  SchemaScript,
} from "@/lib/seo/schema";
import { SITE_CONFIG } from "@/lib/seo/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f0a0a",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | AI Solutions, Mobile Apps & Custom Software Development`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
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
    "machine learning solutions",
    "React development",
    "Next.js development",
    "Unreal Engine development",
  ],
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: "OiC1_qDJFuPSNxn3vaysNMInQEc7Y3rDu-WodNlkP2c",
  },
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | AI Solutions, Mobile Apps & Custom Software Development`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: `${SITE_CONFIG.url}/og/default.jpg`,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - Global Technology Company`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | AI Solutions, Mobile Apps & Custom Software Development`,
    description: SITE_CONFIG.description,
    creator: SITE_CONFIG.twitterHandle,
    site: SITE_CONFIG.twitterHandle,
    images: [`${SITE_CONFIG.url}/og/default.jpg`],
  },
  robots: {
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
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate schemas for homepage
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <html lang="en">
      <head>
        <SchemaScript schema={[organizationSchema, websiteSchema]} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoadingProvider>
          <Loader />
          <CustomCursor triggerSelector="a, button, .cursor-hover" />
          {children}
        </LoadingProvider>
      </body>
    </html>
  );
}
