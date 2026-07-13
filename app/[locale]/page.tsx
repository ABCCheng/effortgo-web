import { notFound } from "next/navigation";

import { EffortGoHome } from "@/app/pages/EffortGoHome";
import { defaultLocale, isLocale, locales } from "@/lib/i18n";
import { getLocalizedPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return getLocalizedPageMetadata(isLocale(locale) ? locale : defaultLocale, "/");
}

export default async function LocalizedHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <EffortGoHome />;
}
