import type { MetadataRoute } from "next";

import { defaultLocale, locales, localizePath, type Locale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

const publicRoutes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
] as const;

function absoluteUrl(path: string) {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

function languageAlternates(path: string) {
  return {
    "x-default": absoluteUrl(localizePath(path, defaultLocale)),
    ...Object.fromEntries(
      locales.map((locale) => [
        locale,
        absoluteUrl(localizePath(path, locale, locale !== defaultLocale)),
      ])
    ),
  } satisfies Record<string, string>;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return publicRoutes.flatMap((route) =>
    locales.map((locale: Locale) => ({
      url: absoluteUrl(localizePath(route.path, locale, locale !== defaultLocale)),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: languageAlternates(route.path),
      },
    }))
  );
}
