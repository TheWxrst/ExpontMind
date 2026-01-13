import { MetadataRoute } from "next";
import { SERVICES, INDUSTRIES, SITE_CONFIG } from "@/lib/seo/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;

  // Core pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/industries`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/company/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  // Service pages
  const servicePages: MetadataRoute.Sitemap = Object.values(SERVICES).flatMap(
    (service) => {
      const pages: MetadataRoute.Sitemap = [
        {
          url: `${baseUrl}/services/${service.slug}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.8,
        },
      ];

      // Sub-service pages
      if (service.subServices && service.subServices.length > 0) {
        service.subServices.forEach((subService) => {
          pages.push({
            url: `${baseUrl}/services/${service.slug}/${subService.slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
          });
        });
      }

      return pages;
    }
  );

  // Industry pages
  const industryPages: MetadataRoute.Sitemap = Object.values(INDUSTRIES).map(
    (industry) => ({
      url: `${baseUrl}/industries/${industry.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  // Combine all pages
  return [...corePages, ...servicePages, ...industryPages];
}
