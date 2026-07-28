import type { Metadata, Viewport } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { Suspense } from "react";

import { AppShell } from "@/components/layout/AppShell";
import { LocaleProvider } from "@/components/providers/locale-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { defaultLocale } from "@/lib/i18n";
import { SITE_TITLE, SITE_URL } from "@/lib/site";

import "./globals.css";

const GOOGLE_TAG_ID = "G-070VWDMMTJ";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "EffortGo",
  title: {
    default: SITE_TITLE,
    template: "%s",
  },
  description: "EffortGo is a focused personal web app platform for efficient action and self-improvement.",
  openGraph: {
    type: "website",
    url: "/",
    siteName: "EffortGo",
    title: SITE_TITLE,
    description: "EffortGo is a focused personal web app platform for efficient action and self-improvement.",
    images: [
      {
        url: "/logo-512-v1.png",
        width: 512,
        height: 512,
        alt: "EffortGo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: "EffortGo is a focused personal web app platform for efficient action and self-improvement.",
    images: ["/logo-512-v1.png"],
  },
  appleWebApp: {
    capable: true,
    title: "EffortGo",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [{ url: "/logo-v1.png", sizes: "256x256", type: "image/png" }],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/logo-192-v1.png", sizes: "192x192", type: "image/png" },
      { url: "/logo-512-v1.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1ec" },
    { media: "(prefers-color-scheme: dark)", color: "#12100f" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={defaultLocale} className="h-full">
      <body>
        <ThemeProvider>
          <Suspense fallback={null}>
            <LocaleProvider>
              <AppShell>{children}</AppShell>
            </LocaleProvider>
          </Suspense>
        </ThemeProvider>
      </body>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_TAG_ID}');
        `}
      </Script>
    </html>
  );
}
