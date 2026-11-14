import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/module-placeholder";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/_authenticated/reports")({
  head: () => ({
    meta: [
      { title: `Reports · ${BRAND.fullName}` },
      { name: "description", content: "Punctuality, attendance and utilisation reports in {BRAND.fullName}." },
      { property: "og:title", content: `Reports · ${BRAND.fullName}` },
      { property: "og:description", content: "Punctuality, attendance and utilisation reports." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <ModulePlaceholder path="/reports" />,
});
