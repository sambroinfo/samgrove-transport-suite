import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { CalendarClock, Siren } from "lucide-react";
import { openIncidentsQuery, todaysTripsQuery } from "@/lib/queries";
import { useI18n } from "@/lib/i18n";
import { StatusPill, type PillTone } from "@/components/ui/status-pill";
import { Skeleton } from "@/components/ui/skeleton";
import type { Database } from "@/integrations/supabase/types";

type Enums = Database["public"]["Enums"];

const TRIP_TONE: Record<Enums["trip_status"], PillTone> = {
  scheduled: "neutral",
  ready: "signal",
  in_progress: "live",
  paused: "warning",
  completed: "neutral",
  cancelled: "danger",
  failed: "danger",
};

const SEVERITY_TONE: Record<Enums["incident_severity"], PillTone> = {
  low: "neutral",
  medium: "signal",
  high: "warning",
  critical: "danger",
};

const label = (v: string) => v.replace(/_/g, " ");

function Panel({ title, icon: Icon, children }: { title: string; icon: typeof Siren; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border bg-card shadow-card">
      <h2 className="flex items-center gap-2 px-4 py-3.5 text-base font-semibold sm:px-5">
        <Icon className="size-4 text-muted-foreground" />
        {title}
      </h2>
      <div className="border-t px-4 py-2 sm:px-5">{children}</div>
    </section>
  );
}

function ListState({ loading, error, empty, emptyText }: { loading: boolean; error: boolean; empty: boolean; emptyText: string }) {
  const { t } = useI18n();
  if (loading)
    return (
      <div className="space-y-2 py-3">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
      </div>
    );
  if (error) return <p className="py-6 text-center text-sm text-muted-foreground">{t("dash.loadError")}</p>;
  if (empty) return <p className="py-6 text-center text-sm text-muted-foreground">{emptyText}</p>;
  return null;
}

export function TodaysTrips({ orgId }: { orgId: string }) {
  const { t, locale } = useI18n();
  const { data = [], isLoading, isError } = useQuery(todaysTripsQuery(orgId));
  const time = new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" });

  return (
    <Panel title={t("dash.todaysTrips")} icon={CalendarClock}>
      <ListState loading={isLoading} error={isError} empty={data.length === 0} emptyText={t("dash.noTrips")} />
      {!isLoading && !isError && data.length > 0 && (
        <ul className="divide-y">
          {data.map((trip) => (
            <li key={trip.id} className="flex items-center gap-3 py-3">
              <span className="w-14 shrink-0 font-mono text-sm font-medium tabular-nums">
                {time.format(new Date(trip.scheduled_at))}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{trip.vehicles?.vehicle_code ?? "—"}</p>
                <p className="truncate text-xs capitalize text-muted-foreground">{label(trip.direction)}</p>
              </div>
              <StatusPill tone={TRIP_TONE[trip.status]} className="capitalize">{label(trip.status)}</StatusPill>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}

export function OpenIncidents({ orgId }: { orgId: string }) {
  const { t } = useI18n();
  const { data = [], isLoading, isError } = useQuery(openIncidentsQuery(orgId));

  return (
    <Panel title={t("dash.openIncidents")} icon={Siren}>
      <ListState loading={isLoading} error={isError} empty={data.length === 0} emptyText={t("dash.noIncidents")} />
      {!isLoading && !isError && data.length > 0 && (
        <ul className="divide-y">
          {data.map((inc) => (
            <li key={inc.id} className="flex items-center gap-3 py-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold capitalize">{label(inc.incident_type)}</p>
                <p className="text-xs text-muted-foreground">
                  {label(inc.status)} · {formatDistanceToNow(new Date(inc.created_at), { addSuffix: true })}
                </p>
              </div>
              <StatusPill tone={SEVERITY_TONE[inc.severity]} className="capitalize">{inc.severity}</StatusPill>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}
