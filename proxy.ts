import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, locales } from "@/lib/i18n";

const PUBLIC_FILE = /\.[^/]+$/;
const LOCALE_LIKE_SEGMENT = /^[a-z]{2}(?:-[A-Za-z]{2,4})?$/;

function getLocalePrefix(pathname: string) {
  const segment = pathname.split("/").filter(Boolean)[0];
  return segment || null;
}

function hasLocalePrefix(pathname: string) {
  const segment = getLocalePrefix(pathname);
  return locales.includes(segment as (typeof locales)[number]);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const localePrefix = getLocalePrefix(pathname);

  if (pathname === "/en") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url, 308);
  }

  if (localePrefix && !hasLocalePrefix(pathname) && LOCALE_LIKE_SEGMENT.test(localePrefix)) {
    const url = request.nextUrl.clone();
    const restPath = pathname.slice(localePrefix.length + 1);
    url.pathname = restPath ? `/${defaultLocale}${restPath}` : `/${defaultLocale}`;
    return NextResponse.redirect(url, 308);
  }

  if (
    pathname.startsWith("/_next/") ||
    pathname === "/favicon.ico" ||
    PUBLIC_FILE.test(pathname) ||
    hasLocalePrefix(pathname)
  ) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;
  return NextResponse.rewrite(url);
}
