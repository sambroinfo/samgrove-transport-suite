import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bus, MapPinned, ShieldAlert } from "lucide-react";
import heroImage from "@/assets/auth-hero.jpg";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${BRAND.fullName} — ${BRAND.tagline}` },
      {
        name: "description",
        content: "Multi-tenant office transportation management: fleet, routes, trips, live tracking and rider safety.",
      },
      { property: "og:title", content: BRAND.fullName },
      { property: "og:description", content: BRAND.tagline },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const PILLARS = [
  { icon: Bus, label: "Fleet & seats" },
  { icon: MapPinned, label: "Live tracking" },
  { icon: ShieldAlert, label: "Rider safety" },
];

function Index() {
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSignedIn(Boolean(data.session)));
  }, []);

  return (
    <div className="relative min-h-svh overflow-hidden surface-ink">
      <img
        src={heroImage}
        alt="SAMGROVE shuttle heading toward the office district at dusk"
        width={1024}
        height={1440}
        className="absolute inset-0 size-full object-cover object-[50%_75%] opacity-80"
      />
      <div className="absolute inset-0 bg-veil" />
      <div className="relative mx-auto flex min-h-svh max-w-6xl flex-col px-5 py-6 sm:px-8 lg:py-10">
        <header className="flex items-center justify-between">
          <Logo tone="inverse" />
          <span className="eyebrow text-ink-muted">v{BRAND.version}</span>
        </header>
        <main className="mt-auto max-w-2xl pb-6 pt-24 animate-rise">
          <p className="eyebrow text-signal">Office transport management</p>
          <h1 className="mt-3 text-4xl font-semibold leading-[1.05] text-ink-foreground sm:text-6xl">
            {BRAND.tagline}
          </h1>
          <ul className="mt-6 flex flex-wrap gap-2">
            {PILLARS.map((p) => (
              <li
                key={p.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-sidebar-border bg-ink/60 px-3 py-1.5 text-xs font-medium text-ink-foreground backdrop-blur-sm"
              >
                <p.icon className="size-3.5 text-signal" />
                {p.label}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            {signedIn ? (
              <Button asChild variant="signal" size="xl">
                <Link to="/dashboard">
                  Open dashboard <ArrowRight />
                </Link>
              </Button>
            ) : (
              <Button asChild variant="signal" size="xl">
                <Link to="/auth" search={{ redirect: undefined }}>
                  Sign in <ArrowRight />
                </Link>
              </Button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
