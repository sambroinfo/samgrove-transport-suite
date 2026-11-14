import { Link, useRouterState } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Logo, LogoMark } from "@/components/brand/logo";
import { NAV_GROUPS } from "@/lib/navigation";
import { useI18n } from "@/lib/i18n";
import { BRAND } from "@/lib/brand";

export function AppSidebar() {
  const { t } = useI18n();
  const { state, isMobile, setOpenMobile } = useSidebar();
  const collapsed = state === "collapsed" && !isMobile;
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (to: string) => pathname === to || pathname.startsWith(`${to}/`);

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarHeader className="px-3 pb-2 pt-4">
        <Link
          to="/dashboard"
          onClick={() => isMobile && setOpenMobile(false)}
          className="flex items-center rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
        >
          {collapsed ? <LogoMark className="size-8" /> : <Logo tone="inverse" />}
        </Link>
      </SidebarHeader>

      <SidebarContent className="gap-0 py-2">
        {NAV_GROUPS.map((group) => (
          <SidebarGroup key={group.label} className="py-1.5">
            <SidebarGroupLabel className="eyebrow !text-[0.6rem] text-ink-muted/70">
              {t(group.label)}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const active = isActive(item.to);
                  return (
                    <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={t(item.label)}
                      className="h-9 rounded-lg text-[0.9rem] font-medium data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground [&>svg]:size-[1.1rem]"
                    >
                      <Link to={item.to} onClick={() => isMobile && setOpenMobile(false)}>
                        <item.icon className={active ? "text-sidebar-primary" : undefined} />
                        <span>{t(item.label)}</span>
                        {active && !collapsed && (
                          <span className="ml-auto size-1.5 rounded-full bg-sidebar-primary" aria-hidden />
                        )}
                      </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="px-4 pb-4">
        {!collapsed && (
          <div className="rounded-xl border border-sidebar-border bg-sidebar-accent/50 p-3">
            <p className="text-xs font-semibold text-sidebar-accent-foreground">{BRAND.tagline}</p>
            <p className="mt-1 eyebrow !text-[0.6rem] text-ink-muted">
              {t("common.version")} {BRAND.version}
            </p>
          </div>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
