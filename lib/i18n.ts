import en from "@/messages/en.json";
import es from "@/messages/es.json";
import fr from "@/messages/fr.json";
import ja from "@/messages/ja.json";
import ko from "@/messages/ko.json";
import pa from "@/messages/pa.json";
import ru from "@/messages/ru.json";
import vi from "@/messages/vi.json";
import zhHans from "@/messages/zh-Hans.json";
import zhHant from "@/messages/zh-Hant.json";

export const locales = [
  "en",
  "zh-Hans",
  "zh-Hant",
  "pa",
  "es",
  "fr",
  "ja",
  "ko",
  "ru",
  "vi",
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  "zh-Hans": "简体中文",
  "zh-Hant": "繁体中文",
  pa: "Punjabi",
  es: "Spanish",
  fr: "Français",
  ja: "日本語",
  ko: "한국어",
  ru: "Русский",
  vi: "Tiếng Việt",
};

export const localeBackendLanguages: Record<Locale, string> = {
  en: "en",
  "zh-Hans": "zh-Hans",
  "zh-Hant": "zh-Hant",
  pa: "pa",
  es: "es",
  fr: "fr",
  ja: "ja",
  ko: "ko",
  ru: "ru",
  vi: "vi",
};

export const dictionaries = {
  en,
  "zh-Hans": zhHans,
  "zh-Hant": zhHant,
  pa,
  es,
  fr,
  ja,
  ko,
  ru,
  vi,
} satisfies Record<Locale, typeof en>;

export type Dictionary = (typeof dictionaries)[Locale];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function normalizeLocale(value: string | null | undefined): Locale | null {
  if (!value) return null;
  if (isLocale(value)) return value;
  return null;
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split("/").filter(Boolean)[0];
  return normalizeLocale(segment) ?? defaultLocale;
}

export function hasLocalePrefix(pathname: string) {
  const segment = pathname.split("/").filter(Boolean)[0];
  return Boolean(segment && normalizeLocale(segment));
}

export function stripLocaleFromPathname(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);

  if (segments[0] && normalizeLocale(segments[0])) {
    const path = `/${segments.slice(1).join("/")}`;
    return path === "/" ? "/" : path.replace(/\/$/, "");
  }

  return pathname === "" ? "/" : pathname;
}

export function localizePath(path: string, locale: Locale, forcePrefix = false) {
  void forcePrefix;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export function t(dict: Dictionary, path: string, params?: Record<string, string | number>) {
  const value = path.split(".").reduce<unknown>((node, key) => {
    if (node && typeof node === "object" && key in node) {
      return (node as Record<string, unknown>)[key];
    }
    return undefined;
  }, dict);

  if (typeof value !== "string") {
    return path;
  }

  return Object.entries(params ?? {}).reduce(
    (text, [key, param]) => text.replaceAll(`{{${key}}}`, String(param)),
    value
  );
}
