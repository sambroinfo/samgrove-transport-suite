import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/module-placeholder";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/_authenticated/emergencies")({
  head: () => ({
    meta: [
      { title: `Emergencies · ${BRAND.fullName}` },
      { name: "description", content: "Incident reporting and response in {BRAND.fullName}." },
      { property: "og:title", content: `Emergencies · ${BRAND.fullName}` },
      { property: "og:description", content: "Incident reporting and response." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <ModulePlaceholder path="/emergencies" />,
});
