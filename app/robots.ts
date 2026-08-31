import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

const appSitemaps = [
  "https://flashmaple.effortgo.xyz/sitemap.xml",
  "https://lifestep.effortgo.xyz/sitemap.xml",
];

export default function robots(): MetadataRoute.Robots {
  const siteHost = new URL(SITE_URL).host;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: [`${SITE_URL}/sitemap.xml`, ...appSitemaps],
    host: siteHost,
  };
}
