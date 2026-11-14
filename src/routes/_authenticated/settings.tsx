import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/module-placeholder";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({
    meta: [
      { title: `Settings · ${BRAND.fullName}` },
      { name: "description", content: "Organization, members, roles and permissions in {BRAND.fullName}." },
      { property: "og:title", content: `Settings · ${BRAND.fullName}` },
      { property: "og:description", content: "Organization, members, roles and permissions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <ModulePlaceholder path="/settings" />,
});
