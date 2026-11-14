import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/module-placeholder";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/_authenticated/drivers")({
  head: () => ({
    meta: [
      { title: `Drivers · ${BRAND.fullName}` },
      { name: "description", content: `Driver roster and vehicle assignments in ${BRAND.fullName}.` },
      { property: "og:title", content: `Drivers · ${BRAND.fullName}` },
      { property: "og:description", content: "Driver roster and vehicle assignments." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <ModulePlaceholder path="/drivers" />,
});
