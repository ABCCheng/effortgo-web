"use client";

import { Languages, Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useLocaleContext } from "@/components/providers/locale-provider";
import { useThemeContext } from "@/components/providers/theme-provider";
import { localeNames, locales, localizePath, type Locale } from "@/lib/i18n";
import { savePreferredLocale } from "@/lib/stores/locale";

export function DesktopAppHeader() {
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
    <header className="app-header-chrome sticky top-0 z-40 border-b border-border/60 bg-transparent">
      <div className="mx-auto flex min-h-16 w-full max-w-270 flex-col justify-center px-4">
        <div className="flex w-full items-center justify-between">
          <a href="/" className="flex min-w-0 items-center gap-2.5" aria-label="EffortGo">
            <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-lg bg-primary">
              <Image src="/logo.svg" alt="" width={80} height={80} priority />
            </span>
            <span className="min-w-max text-4xl font-bold leading-tight text-primary">EffortGo</span>
          </a>

          <div className="flex min-w-max items-center justify-end gap-1 lg:gap-2">
            <button
              type="button"
              className="flex size-10 cursor-pointer items-center justify-center rounded-lg bg-destructive/10 text-primary transition hover:bg-destructive/20 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
              aria-label={isDark ? home.actions.lightTheme : home.actions.darkTheme}
              title={isDark ? home.actions.lightTheme : home.actions.darkTheme}
              onClick={() => setThemeMode(isDark ? "light" : "dark")}
            >
              {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </button>

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
                      <span>{localeNames[item]}</span>
                      {item === locale ? <span className="size-1.5 rounded-full bg-primary" /> : null}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
