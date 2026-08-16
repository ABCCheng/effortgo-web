import type { Metadata, Viewport } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { Suspense } from "react";

import { AppShell } from "@/components/layout/AppShell";
import { LocaleProvider } from "@/components/providers/locale-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { defaultLocale } from "@/lib/i18n";
import { SITE_TITLE, SITE_URL } from "@/lib/site";
import { APP_THEME_COLORS, THEME_STORAGE_KEY } from "@/lib/stores/theme";

import "./globals.css";

const GOOGLE_TAG_ID = "G-070VWDMMTJ";
const INITIAL_THEME_SCRIPT = `
  (() => {
    const root = document.documentElement;
    const themeColors = ${JSON.stringify(APP_THEME_COLORS)};
    let themeMode = "system";

    try {
      const storedTheme = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
      if (storedTheme === "light" || storedTheme === "dark" || storedTheme === "system") {
        themeMode = storedTheme;
      }
    } catch {}

    const systemIsDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
    const isDark = themeMode === "dark" || (themeMode === "system" && systemIsDark);
    const activeThemeColor = isDark ? themeColors.dark : themeColors.light;
    root.classList.toggle("dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";
    root.style.setProperty("--app-safe-top-color", activeThemeColor);
    document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
      meta.removeAttribute("media");
      meta.setAttribute("content", activeThemeColor);
    });

    if (window.matchMedia?.("(max-width: 767px)").matches) {
      root.style.backgroundColor = activeThemeColor;
    }
  })();
`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "EffortGo",
  appleWebApp: {
    capable: false,
    title: "EffortGo",
  },
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
    { media: "(prefers-color-scheme: light)", color: APP_THEME_COLORS.light },
    { media: "(prefers-color-scheme: dark)", color: APP_THEME_COLORS.dark },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={defaultLocale} className="h-full" suppressHydrationWarning>
      <body>
        <Script id="initial-theme" strategy="beforeInteractive">
          {INITIAL_THEME_SCRIPT}
        </Script>
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
