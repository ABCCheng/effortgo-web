"use client";

import {
  ArrowUpRight,
  BookOpenText,
  Sparkles,
  LayoutGrid,
  Wrench,
  Zap,
} from "lucide-react";

import { useLocaleContext } from "@/components/providers/locale-provider";

const contentShellClass = "mx-auto w-full px-4";

const appIconMap = {
  flashMaple: Zap,
  egTools: Wrench,
  pdfCraft: BookOpenText,
} as const;

const appCategoryMap = {
  flashMaple: "NEWS",
  egTools: "TOOL",
  pdfCraft: "TOOL",
} as const;

export function EffortGoHome() {
  const { dictionary } = useLocaleContext();
  const home = dictionary.home;

  return (
    <div className="home-page flex min-h-dvh flex-col bg-transparent text-foreground">
      <main className={`${contentShellClass} flex w-full flex-1 flex-col pb-8 pt-4`}>
        <section className="grid w-full justify-items-center gap-10 md:py-2 lg:grid-cols-[minmax(0,1fr)_minmax(380px,440px)] lg:items-start lg:justify-items-stretch">
          <div className="home-hero-copy flex max-w-none flex-col items-center text-center lg:items-start lg:text-left">
            <p className="home-eyebrow mb-4 inline-flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-1 text-sm text-primary">
              <Sparkles className="size-4 text-primary" />
              {home.eyebrow}
            </p>
            <h1 className="text-4xl font-medium leading-tight tracking-normal lg:whitespace-nowrap">
              {home.slogan}
            </h1>
            <p className="mx-auto mt-6 w-full max-w-2xl text-center text-base leading-8 text-muted-foreground sm:text-left sm:text-lg lg:mx-0">
              {home.description}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:w-full lg:max-w-[440px] lg:justify-self-end lg:grid-cols-1">
            {home.highlights.map((item) => (
              <article key={item.title} className="home-highlight-card rounded-lg border border-border bg-card p-4 shadow-sm backdrop-blur-xl">
                <h2 className="text-base font-semibold text-primary dark:text-white">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 w-full">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-normal">{home.appsTitle}</h2>
            <LayoutGrid className="size-5 text-muted-foreground" />
          </div>

          <div className="home-apps-grid grid w-full gap-4 md:grid-cols-3">
            {home.apps.map((app) => {
              const Icon = appIconMap[app.id as keyof typeof appIconMap] ?? Sparkles;
              const category = appCategoryMap[app.id as keyof typeof appCategoryMap] ?? "TOOL";
              return (
                <a
                  key={app.name}
                  href={app.href}
                  target="_blank"
                  rel="noreferrer"
                  className="home-app-card group flex min-h-48 flex-col rounded-lg border border-border bg-card p-5 shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-primary/50 hover:bg-muted/70 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
                >
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <span className="home-app-icon flex size-12 items-center justify-center rounded-lg bg-primary text-white">
                      <Icon className="size-6" />
                    </span>
                    <span className="flex flex-col items-end gap-2">
                      <ArrowUpRight className="size-5 text-muted-foreground transition group-hover:text-primary" />
                      <span className="home-app-category rounded-md border border-border px-2 py-0.5 text-[0.68rem] font-semibold uppercase tracking-normal text-muted-foreground transition group-hover:border-primary/40 group-hover:text-primary">
                        {category}
                      </span>
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold tracking-normal">{app.name}</h3>
                  <p className="mt-3 overflow-hidden text-sm leading-6 text-muted-foreground [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
                    {app.description}
                  </p>
                </a>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
