"use client";

import { Languages, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useLocaleContext } from "@/components/providers/locale-provider";
import { useThemeContext } from "@/components/providers/theme-provider";
import { localeConfig, locales, localizePath, type Locale } from "@/lib/i18n";
import { savePreferredLocale } from "@/lib/stores/locale";

export function AppHeader() {
  const router = useRouter();
  const { locale, dictionary } = useLocaleContext();
  const { isDark, setThemeMode } = useThemeContext();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const home = dictionary.home;

  const handleLocaleChange = (nextLocale: Locale) => {
    setIsLanguageOpen(false);
    savePreferredLocale(nextLocale);
    router.replace(localizePath("/", nextLocale, true));
  };

  useEffect(() => {
    if (!isLanguageOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!languageMenuRef.current?.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLanguageOpen]);

  return (
    <header className="app-header-chrome sticky top-0 z-40 bg-transparent pb-2 pt-(--app-safe-header-top) md:py-[1.35rem]">
      <div className="mx-auto flex h-10 w-full max-w-[1200px] items-center px-4 lg:px-6">
        <div className="flex w-full items-center justify-between gap-3 lg:gap-4">
          <Link href="/" className="flex min-w-0 items-center gap-1" aria-label="EffortGo">
            <span className="app-logo h-10 w-[154px] shrink-0" aria-hidden="true" />
          </Link>

          <nav className="ml-8 mr-auto hidden min-w-0 items-center gap-5 text-base font-bold text-muted-foreground xl:flex" aria-label="Main navigation">
            <a className="flex min-h-10 items-center whitespace-nowrap py-1 transition hover:text-primary" href="#apps">
              {home.appsTitle}
            </a>
          </nav>

          <div className="flex min-w-max items-center justify-end gap-1 lg:gap-2">
            <div ref={languageMenuRef} className="relative">
              <button
                type="button"
                aria-label={home.actions.language}
                aria-expanded={isLanguageOpen}
                aria-haspopup="menu"
                title={home.actions.language}
                className="flex size-10 cursor-pointer items-center justify-center rounded-lg bg-destructive/10 text-primary transition hover:bg-destructive/20 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
                onClick={() => setIsLanguageOpen((value) => !value)}
              >
                <Languages className="size-5" />
              </button>

              {isLanguageOpen ? (
                <div
                  role="menu"
                  aria-label={home.actions.language}
                  className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-40 overflow-hidden rounded-lg border border-border bg-popover p-1 text-sm text-popover-foreground shadow-lg backdrop-blur-2xl"
                >
                  {locales.map((item) => (
                    <button
                      key={item}
                      type="button"
                      role="menuitemradio"
                      aria-checked={item === locale}
                      className="flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-2 text-left transition hover:bg-destructive/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 data-[active=true]:bg-destructive/10 data-[active=true]:text-primary"
                      data-active={item === locale}
                      onClick={() => handleLocaleChange(item)}
                    >
                      <span>{localeConfig[item].name}</span>
                      {item === locale ? <span className="size-1.5 rounded-full bg-primary" /> : null}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <button
              type="button"
              className="flex size-10 cursor-pointer items-center justify-center rounded-lg bg-destructive/10 text-primary transition hover:bg-destructive/20 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
              aria-label={isDark ? home.actions.lightTheme : home.actions.darkTheme}
              title={isDark ? home.actions.lightTheme : home.actions.darkTheme}
              onClick={() => setThemeMode(isDark ? "light" : "dark")}
            >
              {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
