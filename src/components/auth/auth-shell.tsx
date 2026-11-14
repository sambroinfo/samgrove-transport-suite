import type { ReactNode } from "react";
import heroImage from "@/assets/auth-hero.jpg";
import { Logo } from "@/components/brand/logo";
import { LanguageSelect } from "@/components/layout/language-select";
import { BRAND } from "@/lib/brand";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="min-h-svh bg-background lg:grid lg:grid-cols-[1.05fr_1fr]">
      {/* Brand panel: a short band on phones, a full-height column on desktop. */}
      <aside className="relative h-56 overflow-hidden surface-ink sm:h-64 lg:sticky lg:top-0 lg:h-svh">
        <img
          src={heroImage}
          alt="SAMGROVE shuttle on a city expressway at dusk"
          width={1024}
          height={1440}
          className="absolute inset-0 size-full object-cover object-[50%_70%] opacity-90"
        />
        <div className="absolute inset-0 bg-veil" />
        <div className="relative flex h-full flex-col justify-between p-5 sm:p-8 lg:p-12">
          <Logo tone="inverse" />
          <div className="max-w-md animate-rise">
            <p className="eyebrow text-signal">v{BRAND.version}</p>
            <p className="mt-2 font-display text-2xl font-semibold leading-tight text-ink-foreground sm:text-3xl lg:text-5xl">
              {BRAND.tagline}
            </p>
            <p className="mt-4 hidden max-w-sm text-sm leading-relaxed text-ink-muted lg:block">
              Fleet, routes, riders and safety for your office commute — in one control room.
            </p>
          </div>
        </div>
      </aside>

      <main className="relative -mt-6 flex justify-center rounded-t-3xl bg-background px-5 pb-10 pt-8 sm:px-8 lg:mt-0 lg:items-center lg:rounded-none lg:py-12">
        <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
          <LanguageSelect />
        </div>
        <div className="w-full max-w-sm animate-rise">
          <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">{title}</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-8 text-sm text-muted-foreground">{footer}</div>}
          <p className="mt-12 eyebrow text-muted-foreground">
            {BRAND.fullName} · v{BRAND.version}
          </p>
        </div>
      </main>
    </div>
  );
}
