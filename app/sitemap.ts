import type { MetadataRoute } from "next";

import { defaultLocale, locales, type Locale } from "@/lib/i18n";
import { languageAlternates, localizedAbsoluteUrl } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

type SitemapItem = MetadataRoute.Sitemap[number];

const siteLastModified = new Date("2026-07-13T00:00:00.000Z");

const publicRoutes = [
  {
    path: "/",
    changeFrequency: "weekly",
    priority: 1,
    lastModified: siteLastModified,
  },
] satisfies Array<{
  path: "/";
  changeFrequency: NonNullable<SitemapItem["changeFrequency"]>;
  priority: number;
  lastModified: Date;
}>;

function localePriority(priority: number, locale: Locale) {
  return locale === defaultLocale ? priority : Math.max(priority - 0.1, 0.1);
}

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.flatMap((route) =>
    locales.map((locale: Locale) => ({
      url: localizedAbsoluteUrl(route.path, locale),
      lastModified: route.lastModified,
      changeFrequency: route.changeFrequency,
      priority: localePriority(route.priority, locale),
      alternates: {
        languages: languageAlternates(route.path),
      },
    }))
  );
}
