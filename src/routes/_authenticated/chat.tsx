import { createFileRoute } from "@tanstack/react-router";
import { ModulePlaceholder } from "@/components/module-placeholder";
import { BRAND } from "@/lib/brand";

export const Route = createFileRoute("/_authenticated/chat")({
  head: () => ({
    meta: [
      { title: `Chat · ${BRAND.fullName}` },
      { name: "description", content: `Vehicle and trip group chats in ${BRAND.fullName}.` },
      { property: "og:title", content: `Chat · ${BRAND.fullName}` },
      { property: "og:description", content: "Vehicle and trip group chats." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <ModulePlaceholder path="/chat" />,
});
