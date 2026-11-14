import { useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Building2, Check, LogOut } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { profileQuery } from "@/lib/queries";
import { useOrg } from "@/lib/org-context";
import { useI18n } from "@/lib/i18n";

function initials(name: string) {
  const parts = name.trim().split(/[\s@._-]+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "?";
}

export function ProfileMenu({ user }: { user: User }) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: profile } = useQuery(profileQuery(user.id));
  const { memberships, current, setCurrentOrgId } = useOrg();

  const displayName = profile?.full_name || user.email || "";
  const email = profile?.email || user.email || "";

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", search: { redirect: undefined }, replace: true });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center gap-2.5 rounded-full p-0.5 outline-none focus-visible:ring-2 focus-visible:ring-ring md:rounded-lg md:pr-2"
        aria-label={t("header.profile")}
      >
        <Avatar className="size-8 border border-border">
          {profile?.avatar_url && <AvatarImage src={profile.avatar_url} alt="" />}
          <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
            {initials(displayName)}
          </AvatarFallback>
        </Avatar>
        <span className="hidden min-w-0 flex-col text-left leading-tight md:flex">
          <span className="max-w-40 truncate text-sm font-semibold">{displayName}</span>
          {current && <span className="max-w-40 truncate text-xs text-muted-foreground">{current.name}</span>}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="font-normal">
          <p className="truncate text-sm font-semibold">{displayName}</p>
          <p className="truncate text-xs text-muted-foreground">{email}</p>
        </DropdownMenuLabel>
        {memberships.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="eyebrow text-muted-foreground">{t("header.organization")}</DropdownMenuLabel>
            {memberships.map((m) => (
              <DropdownMenuItem key={m.organizationId} onSelect={() => setCurrentOrgId(m.organizationId)}>
                <Building2 />
                <span className="truncate">{m.name}</span>
                {current?.organizationId === m.organizationId && <Check className="ml-auto text-success" />}
              </DropdownMenuItem>
            ))}
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={signOut} className="text-destructive focus:text-destructive">
          <LogOut />
          {t("auth.signOut")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
