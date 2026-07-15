"use client";

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { useEffect, useState } from "react";
import { Dot } from "lucide-react";

type BottomTabIcon = ElementType<{ className?: string; "aria-hidden"?: boolean }>;

export function AppFooter() {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const updateBottomState = () => {
      const documentElement = document.documentElement;
      setIsAtBottom(
        window.innerHeight + window.scrollY >= documentElement.scrollHeight - 24
      );
    };

    updateBottomState();
    window.addEventListener("scroll", updateBottomState, { passive: true });
    window.addEventListener("resize", updateBottomState);

    return () => {
      window.removeEventListener("scroll", updateBottomState);
      window.removeEventListener("resize", updateBottomState);
    };
  }, []);

  return (
    <footer
      className={cx(
        "pointer-events-none fixed inset-x-0 bottom-0 z-40 hidden items-center justify-center px-4 py-1 text-xs text-muted-foreground md:flex",
        isAtBottom && "max-md:flex max-md:bottom-[calc(var(--app-safe-footer-bottom)+var(--app-tab-height)+0.75rem)]"
      )}
    >
      <span>© 2024-2026 ABCCheng</span>
      <Dot aria-hidden="true" className="size-4" />
      <span>{process.env.APP_VERSION}</span>
    </footer>
  );
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function AppBottomTabBar({
  className,
  children,
  ariaLabel = "Primary",
  ...props
}: ComponentPropsWithoutRef<"nav"> & {
  ariaLabel?: string;
}) {
  return (
    <nav
      data-slot="app-bottom-tab-bar"
      aria-label={ariaLabel}
      className={cx(
        "app-bottom-chrome pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-(--app-safe-footer-bottom) pt-3",
        className
      )}
      {...props}
    >
      <div className="pointer-events-auto flex h-(--app-tab-height) w-[min(17rem,calc(100%-2rem))] items-center justify-between rounded-[2rem] border border-primary/10 bg-card px-2 shadow-none backdrop-blur-2xl supports-backdrop-filter:bg-card/95 dark:border-white/10 dark:shadow-[0_18px_46px_rgba(0,0,0,0.42)]">
        {children}
      </div>
    </nav>
  );
}

export function AppBottomTabButton({
  className,
  active,
  icon: Icon,
  iconClassName,
  label,
  href,
  external,
  target,
  rel,
  children,
  ...props
}: ComponentPropsWithoutRef<"a"> & {
  active?: boolean;
  external?: boolean;
  icon: BottomTabIcon;
  iconClassName?: string;
  label: ReactNode;
}) {
  return (
    <a
      data-slot="app-bottom-tab-button"
      data-active={active ? "" : undefined}
      href={href}
      target={external ? "_blank" : target}
      rel={external ? "noreferrer" : rel}
      aria-label={typeof label === "string" ? label : props["aria-label"]}
      title={typeof label === "string" ? label : props.title}
      className={cx(
        "group relative flex h-12 min-w-0 flex-1 items-center justify-center rounded-[1.5rem] text-primary transition duration-200 ease-out",
        "hover:text-primary active:scale-[0.96]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        active && "text-primary",
        className
      )}
      {...props}
    >
      {children ?? <AppBottomTabContent active={active} icon={Icon} iconClassName={iconClassName} />}
    </a>
  );
}

export function AppBottomTabContent({
  active,
  icon: Icon,
  iconClassName,
}: {
  active?: boolean;
  icon: BottomTabIcon;
  iconClassName?: string;
}) {
  return (
    <>
      <span
        className={cx(
          "grid size-11 place-items-center rounded-full transition duration-200 ease-out",
          "group-hover:bg-destructive/20 group-hover:text-primary",
          active && "bg-destructive/20 text-primary"
        )}
      >
        <Icon
          aria-hidden={true}
          className={cx(
            "size-6 shrink-0 transition-transform duration-200",
            "group-hover:scale-110",
            active && "scale-110 stroke-[2.45]",
            iconClassName
          )}
        />
      </span>
    </>
  );
}
