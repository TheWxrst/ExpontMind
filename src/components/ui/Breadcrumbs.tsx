"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { generateBreadcrumbSchema, SchemaScript } from "@/lib/seo/schema";
import { SITE_CONFIG } from "@/lib/seo/constants";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  // Build full items array with home
  const allItems = [{ label: "Home", href: "/" }, ...items];

  // Generate schema data
  const schemaItems = allItems.map((item) => ({
    name: item.label,
    url: item.href.startsWith("http") ? item.href : `${SITE_CONFIG.url}${item.href}`,
  }));

  const breadcrumbSchema = generateBreadcrumbSchema(schemaItems);

  return (
    <>
      <SchemaScript schema={breadcrumbSchema} />
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center text-sm text-stone-400 ${className}`}
      >
        <ol className="flex items-center flex-wrap gap-1">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            const isFirst = index === 0;

            return (
              <li key={item.href} className="flex items-center">
                {index > 0 && (
                  <ChevronRight
                    className="w-4 h-4 mx-2 text-stone-600"
                    aria-hidden="true"
                  />
                )}
                {isLast ? (
                  <span
                    className="text-stone-200 font-medium"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors duration-200 flex items-center gap-1"
                  >
                    {isFirst && <Home className="w-4 h-4" aria-hidden="true" />}
                    <span className={isFirst ? "sr-only sm:not-sr-only" : ""}>
                      {item.label}
                    </span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
