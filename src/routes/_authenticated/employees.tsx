import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/module-placeholder";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/_authenticated/employees")({
  head: () => ({
    meta: [
      { title: `Employees · ${BRAND.fullName}` },
      { name: "description", content: "Employee directory and pickup allocations in {BRAND.fullName}." },
      { property: "og:title", content: `Employees · ${BRAND.fullName}` },
      { property: "og:description", content: "Employee directory and pickup allocations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <ModulePlaceholder path="/employees" />,
});
