"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  type ReactNode,
} from "react";

import {
  defaultLocale,
  getLocaleFromPathname,
  hasLocalePrefix,
  localizePath,
  localeConfig,
  stripLocaleFromPathname,
  type Dictionary,
  type Locale,
} from "@/lib/i18n";
import { getPreferredLocale } from "@/lib/stores/locale";

type LocaleContextValue = {
  locale: Locale;
  dictionary: Dictionary;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: defaultLocale,
  dictionary: localeConfig[defaultLocale].dictionary,
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = getLocaleFromPathname(pathname);

  const preferredLocalePath = useCallback(() => {
    if (hasLocalePrefix(pathname)) {
      return null;
    }

    const preferredLocale = getPreferredLocale();
    if (!preferredLocale || preferredLocale === locale) return null;

    const query = typeof window === "undefined" ? "" : window.location.search.slice(1);
    const path = stripLocaleFromPathname(pathname);
    const nextPath = localizePath(path, preferredLocale, hasLocalePrefix(pathname));
    return query ? `${nextPath}?${query}` : nextPath;
  }, [locale, pathname]);

  useLayoutEffect(() => {
    const nextPath = preferredLocalePath();
    if (!nextPath) return;
    window.history.replaceState(window.history.state, "", nextPath);
  }, [preferredLocalePath]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    const nextPath = preferredLocalePath();
    if (!nextPath) return;
    router.replace(nextPath);
  }, [preferredLocalePath, router]);

  const value = useMemo(
    () => ({ locale, dictionary: localeConfig[locale].dictionary }),
    [locale]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocaleContext() {
  return useContext(LocaleContext);
}
