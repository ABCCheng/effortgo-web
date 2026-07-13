import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";

import { AppShell } from "@/components/layout/AppShell";
import { LocaleProvider } from "@/components/providers/locale-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { defaultLocale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "EffortGo",
  title: {
    default: "EffortGo",
    template: "%s",
  },
  description: "EffortGo is a focused personal web app platform for efficient action and self-improvement.",
  openGraph: {
    type: "website",
    url: "/",
    siteName: "EffortGo",
    title: "EffortGo",
    description: "EffortGo is a focused personal web app platform for efficient action and self-improvement.",
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: "EffortGo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "EffortGo",
    description: "EffortGo is a focused personal web app platform for efficient action and self-improvement.",
    images: ["/icon-512.png"],
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
    icon: [{ url: "/icon.png", sizes: "256x256", type: "image/png" }],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
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
    </html>
  );
}
