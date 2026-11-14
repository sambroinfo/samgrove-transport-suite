import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/module-placeholder";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/_authenticated/vehicles")({
  head: () => ({
    meta: [
      { title: `Vehicles · ${BRAND.fullName}` },
      { name: "description", content: "Fleet register, seats and maintenance in {BRAND.fullName}." },
      { property: "og:title", content: `Vehicles · ${BRAND.fullName}` },
      { property: "og:description", content: "Fleet register, seats and maintenance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <ModulePlaceholder path="/vehicles" />,
});
