import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/module-placeholder";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/_authenticated/trips")({
  head: () => ({
    meta: [
      { title: `Trips · ${BRAND.fullName}` },
      { name: "description", content: "Trip schedules, passengers and attendance in {BRAND.fullName}." },
      { property: "og:title", content: `Trips · ${BRAND.fullName}` },
      { property: "og:description", content: "Trip schedules, passengers and attendance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <ModulePlaceholder path="/trips" />,
});
