import type { Metadata } from "next";

import { defaultLocale, dictionaries, locales, localizePath, type Locale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

const siteName = "EffortGo";
const defaultOgImage = "/icon-512.png";

function absoluteUrl(path: string) {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

export function localizedAbsoluteUrl(path: string, locale: Locale) {
  return absoluteUrl(localizePath(path, locale, locale !== defaultLocale));
}

export function languageAlternates(path: string) {
  return {
    "x-default": absoluteUrl(localizePath(path, defaultLocale)),
    ...Object.fromEntries(
      locales.map((locale) => [
        locale,
        localizedAbsoluteUrl(path, locale),
      ])
    ),
  } satisfies Record<string, string>;
}

export function buildPublicPageMetadata({
  locale,
  path,
  title,
  description,
  image = defaultOgImage,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const canonical = localizedAbsoluteUrl(path, locale);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName,
      locale,
      title,
      description,
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
    twitter: {
      card: image === defaultOgImage ? "summary" : "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function buildNoIndexMetadata(title: string): Metadata {
  return {
    title,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export function getLocalizedPageMetadata(locale: Locale, path: "/") {
  const dictionary = dictionaries[locale];

  return buildPublicPageMetadata({
    locale,
    path,
    title: "EffortGo",
    description: dictionary.home.description,
  });
}
