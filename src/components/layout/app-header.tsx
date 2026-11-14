import { useRouterState } from "@tanstack/react-router";
import type { User } from "@supabase/supabase-js";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { LanguageSelect } from "@/components/layout/language-select";
import { NotificationsMenu } from "@/components/layout/notifications-menu";
import { ProfileMenu } from "@/components/layout/profile-menu";
import { findNavItem } from "@/lib/navigation";
import { useI18n } from "@/lib/i18n";

export function AppHeader({ user }: { user: User }) {
  const { t } = useI18n();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const item = findNavItem(pathname);

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-2 border-b bg-background/85 px-3 backdrop-blur-md supports-[backdrop-filter]:bg-background/70 sm:h-16 sm:px-5">
      <SidebarTrigger className="size-9" />
      <Separator orientation="vertical" className="mx-1 hidden h-5 sm:block" />
      <p className="min-w-0 flex-1 truncate font-display text-base font-semibold sm:text-lg">
        {item ? t(item.label) : ""}
      </p>
      <div className="flex items-center gap-0.5 sm:gap-1.5">
        <LanguageSelect />
        <NotificationsMenu userId={user.id} />
        <Separator orientation="vertical" className="mx-1 hidden h-6 md:block" />
        <ProfileMenu user={user} />
      </div>
    </header>
  );
}
