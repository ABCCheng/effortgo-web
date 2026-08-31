"use client";

import {
  ArrowUpRight,
  LayoutGrid,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

import { useLocaleContext } from "@/components/providers/locale-provider";

const contentShellClass = "mx-auto w-full max-w-[1200px] px-4 lg:px-6";

const appAssetMap = {
  FlashMaple: {
    light: "/apps-logo/flashmaple-og.png",
    dark: "/apps-logo/flashmaple-og-dark.png",
    logo: "/apps-logo/logo-flashmaple.svg",
  },
  LifeStep: {
    light: "/apps-logo/lifestep-og.png",
    dark: "/apps-logo/lifestep-og-dark.png",
    logo: "/apps-logo/logo-lifestep.svg",
  },
} as const;

export function EffortGoHome() {
  const { dictionary, locale } = useLocaleContext();
  const home = dictionary.home;
  const sloganWeight = locale === "zh-Hant" ? "font-semibold" : "font-medium";

  return (
    <div className="home-page flex min-h-dvh w-full flex-col bg-transparent text-foreground">
      <main className={`${contentShellClass} flex w-full flex-1 flex-col pb-8 pt-4`}>
        <section className="grid w-full gap-10 md:py-2 lg:grid-cols-[minmax(0,1fr)_minmax(380px,440px)] lg:items-start">
          <div className="home-hero-copy flex w-full max-w-none flex-col items-center text-center lg:items-start lg:text-left">
            <p className="home-eyebrow mb-4 inline-flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-1 text-sm text-primary">
              <Sparkles className="size-4 text-primary" />
              {home.eyebrow}
            </p>
            <h1 className={`text-4xl ${sloganWeight} leading-tight tracking-normal lg:whitespace-nowrap`}>
              {home.slogan}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-left text-base leading-8 text-muted-foreground sm:text-lg lg:mx-0">
              {home.description}
            </p>
          </div>

          <div className="grid w-full gap-3 sm:grid-cols-3 lg:w-full lg:max-w-[440px] lg:justify-self-end lg:grid-cols-1">
            {home.highlights.map((item) => (
              <article key={item.title} className="home-highlight-card rounded-lg border border-border bg-card p-4 shadow-sm backdrop-blur-xl">
                <h2 className="text-base font-semibold text-primary dark:text-white">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="apps" className="mt-10 w-full scroll-mt-24">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-normal">{home.appsTitle}</h2>
            <LayoutGrid className="size-5 text-muted-foreground" />
          </div>

          <div className="home-apps-grid grid w-full gap-4 md:max-w-[780px] md:grid-cols-2">
            {home.apps.map((app) => {
              const asset = appAssetMap[app.id as keyof typeof appAssetMap];
              return (
                <a
                  key={app.id}
                  href={app.href}
                  target="_blank"
                  rel="noreferrer"
                  className="home-app-card group flex min-h-48 flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm backdrop-blur-xl transition-[border-color,box-shadow] duration-200 hover:border-primary/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
                >
                  {asset && (
                    <div className="relative aspect-[1200/630] w-full overflow-hidden border-b border-border bg-muted">
                      <Image
                        src={asset.light}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover dark:hidden"
                      />
                      <Image
                        src={asset.dark}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="hidden object-cover dark:block"
                      />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-4">
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <span className="home-app-icon flex size-12 items-center justify-center rounded-lg bg-primary text-white">
                        <Image
                          src={asset.logo}
                          alt=""
                          width={40}
                          height={40}
                          className="size-10 object-contain brightness-0 invert"
                        />
                      </span>
                      <span className="flex flex-col items-end gap-2">
                        <ArrowUpRight className="size-5 text-muted-foreground transition group-hover:text-primary" />
                        <span className="home-app-category rounded-md border border-border px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-normal text-muted-foreground transition group-hover:border-primary/40 group-hover:text-primary">
                          {app.category}
                        </span>
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold tracking-normal">{app.id}</h3>
                    <p className="mt-2 overflow-hidden text-sm leading-6 text-muted-foreground [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                      {app.description}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
