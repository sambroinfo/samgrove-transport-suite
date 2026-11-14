import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/module-placeholder";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/_authenticated/notifications")({
  head: () => ({
    meta: [
      { title: `Notifications · ${BRAND.fullName}` },
      { name: "description", content: `Your notification inbox and preferences in ${BRAND.fullName}.` },
      { property: "og:title", content: `Notifications · ${BRAND.fullName}` },
      { property: "og:description", content: "Your notification inbox and preferences." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <ModulePlaceholder path="/notifications" />,
});
