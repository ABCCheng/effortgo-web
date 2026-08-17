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

export const localeConfig = {
  en: { name: "English", dictionary: en },
  "zh-Hans": { name: "简体中文", dictionary: zhHans },
  "zh-Hant": { name: "繁体中文", dictionary: zhHant },
  pa: { name: "Punjabi", dictionary: pa },
  es: { name: "Spanish", dictionary: es },
  fr: { name: "Français", dictionary: fr },
  ja: { name: "日本語", dictionary: ja },
  ko: { name: "한국어", dictionary: ko },
  ru: { name: "Русский", dictionary: ru },
  vi: { name: "Tiếng Việt", dictionary: vi },
} as const satisfies Record<
  string,
  { name: string; dictionary: typeof en }
>;

export type Locale = keyof typeof localeConfig;

export const locales = Object.keys(localeConfig) as Locale[];

export const defaultLocale: Locale = "en";

export type Dictionary = (typeof localeConfig)[Locale]["dictionary"];

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
  if (path === "/" && locale === defaultLocale && !forcePrefix) {
    return "/";
  }

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
