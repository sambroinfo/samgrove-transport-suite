import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/module-placeholder";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/_authenticated/gps-tracking")({
  head: () => ({
    meta: [
      { title: `GPS Tracking · ${BRAND.fullName}` },
      { name: "description", content: `Live vehicle positions and geofences in ${BRAND.fullName}.` },
      { property: "og:title", content: `GPS Tracking · ${BRAND.fullName}` },
      { property: "og:description", content: "Live vehicle positions and geofences." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <ModulePlaceholder path="/gps-tracking" />,
});
