import { Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { Bell, CheckCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { markAllNotificationsRead, notificationsQuery } from "@/lib/queries";
import { useOrg } from "@/lib/org-context";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function NotificationsMenu({ userId }: { userId: string }) {
  const { t } = useI18n();
  const { current } = useOrg();
  const orgId = current?.organizationId ?? null;
  const queryClient = useQueryClient();
  const { data = [] } = useQuery(notificationsQuery(userId, orgId));
  const unread = data.filter((n) => !n.read_at).length;

  const markAll = useMutation({
    mutationFn: () => markAllNotificationsRead(userId, orgId!),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications", userId] }),
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label={t("header.notifications")}>
          <Bell className="!size-[1.15rem]" />
          {unread > 0 && (
            <span className="absolute right-1 top-1 flex min-w-4 items-center justify-center rounded-full bg-gradient-signal px-1 text-[0.6rem] font-bold leading-4 text-signal-foreground">
              {unread > 9 ? "9+" : unread}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[min(22rem,calc(100vw-1.5rem))] p-0">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <p className="font-display text-sm font-semibold">{t("header.notifications")}</p>
          {unread > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1 px-2 text-xs"
              onClick={() => markAll.mutate()}
              disabled={markAll.isPending}
            >
              <CheckCheck className="!size-3.5" />
              {t("header.markAllRead")}
            </Button>
          )}
        </div>
        {data.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-muted-foreground">{t("header.noNotifications")}</p>
        ) : (
          <ul className="max-h-80 divide-y overflow-y-auto">
            {data.map((n) => (
              <li key={n.id} className={cn("px-4 py-3", !n.read_at && "bg-signal-soft/40")}>
                <div className="flex items-start gap-2">
                  {!n.read_at && <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-signal" aria-hidden />}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{n.title}</p>
                    <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{n.body}</p>
                    <p className="mt-1 eyebrow !text-[0.6rem] text-muted-foreground">
                      {formatDistanceToNow(new Date(n.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="border-t p-2">
          <Button asChild variant="ghost" size="sm" className="w-full">
            <Link to="/notifications">{t("header.viewAll")}</Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
