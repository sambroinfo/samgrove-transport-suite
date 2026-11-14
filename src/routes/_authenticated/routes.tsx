import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/module-placeholder";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/_authenticated/routes")({
  head: () => ({
    meta: [
      { title: `Routes · ${BRAND.fullName}` },
      { name: "description", content: "Routes, stops and pickup points in {BRAND.fullName}." },
      { property: "og:title", content: `Routes · ${BRAND.fullName}` },
      { property: "og:description", content: "Routes, stops and pickup points." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <ModulePlaceholder path="/routes" />,
});
