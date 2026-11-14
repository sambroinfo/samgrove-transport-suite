import { createFileRoute } from "@tanstack/react-router";
import type { User } from "@supabase/supabase-js";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppHeader } from "@/components/layout/app-header";
import { OrgProvider } from "@/lib/org-context";
import { ModulePlaceholder } from "@/components/module-placeholder";

export const Route = createFileRoute("/zz-shell-preview")({ ssr: false, component: P });
const user = { id: "00000000-0000-0000-0000-000000000000", email: "preview@samgrove.test" } as User;
function P() {
  return (
    <OrgProvider userId={user.id}>
      <SidebarProvider>
        <div className="flex min-h-svh w-full">
          <AppSidebar />
          <SidebarInset className="min-w-0 bg-background">
            <AppHeader user={user} />
            <div className="flex-1 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8"><ModulePlaceholder path="/vehicles" /></div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </OrgProvider>
  );
}
