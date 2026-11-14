import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { MapPinned, Radio } from "lucide-react";
import { vehiclePositionsQuery } from "@/lib/queries";
import { useI18n } from "@/lib/i18n";
import { StatusPill, type PillTone } from "@/components/ui/status-pill";
import { Skeleton } from "@/components/ui/skeleton";
import type { Database } from "@/integrations/supabase/types";

type Health = Database["public"]["Enums"]["gps_health"];
const HEALTH: { key: Health; tone: PillTone }[] = [
  { key: "live", tone: "live" },
  { key: "delayed", tone: "warning" },
  { key: "stale", tone: "signal" },
  { key: "offline", tone: "neutral" },
];

export function FleetMapPreview({ orgId }: { orgId: string }) {
  const { t } = useI18n();
  const { data, isLoading, isError } = useQuery(vehiclePositionsQuery(orgId));
  const positions = data ?? [];
  const counts = HEALTH.map((h) => ({ ...h, count: positions.filter((p) => p.health === h.key).length }));

  return (
    <section className="flex flex-col overflow-hidden rounded-2xl border bg-card shadow-card">
      <div className="flex items-center justify-between gap-3 px-4 py-3.5 sm:px-5">
        <h2 className="flex items-center gap-2 text-base font-semibold">
          <MapPinned className="size-4 text-muted-foreground" />
          {t("dash.fleetMap")}
        </h2>
        <span className="eyebrow rounded-md border px-2 py-1 text-muted-foreground">{t("dash.mapPreview")}</span>
      </div>

      {/* Decorative preview only: no vehicle markers are drawn until real map tracking ships. */}
      <div className="relative h-56 map-grid sm:h-72" role="img" aria-label={t("dash.mapNote")}>
        <svg className="absolute inset-0 size-full" viewBox="0 0 600 300" preserveAspectRatio="none" aria-hidden>
          <path d="M-10 230 C 120 210, 160 120, 280 130 S 470 60, 610 80" className="animate-route stroke-signal/70" strokeWidth="3" fill="none" />
          <path d="M-10 90 C 90 110, 200 200, 320 190 S 500 250, 610 230" className="animate-route stroke-success/60" strokeWidth="3" fill="none" />
          <path d="M150 -10 C 170 80, 230 160, 210 310" className="stroke-ink-muted/20" strokeWidth="10" fill="none" />
          <path d="M430 -10 C 410 100, 470 200, 450 310" className="stroke-ink-muted/20" strokeWidth="10" fill="none" />
        </svg>
        <div className="absolute inset-x-3 bottom-3 rounded-xl border border-sidebar-border bg-ink/80 px-3 py-2.5 backdrop-blur-sm">
          <p className="text-xs text-ink-muted">{t("dash.mapNote")}</p>
        </div>
      </div>

      <div className="border-t px-4 py-4 sm:px-5">
        <p className="eyebrow flex items-center gap-1.5 text-muted-foreground">
          <Radio className="size-3.5" />
          {t("dash.positions")}
        </p>
        {isLoading ? (
          <Skeleton className="mt-3 h-6 w-2/3" />
        ) : isError ? (
          <p className="mt-3 text-sm text-muted-foreground">{t("dash.loadError")}</p>
        ) : positions.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">{t("dash.noPositions")}</p>
        ) : (
          <>
            <div className="mt-3 flex flex-wrap gap-2">
              {counts.map((c) => (
                <StatusPill key={c.key} tone={c.tone}>
                  {c.key} · {c.count}
                </StatusPill>
              ))}
            </div>
            <ul className="mt-3 divide-y">
              {positions.slice(0, 5).map((p) => (
                <li key={p.vehicle_id} className="flex items-center justify-between gap-3 py-2 text-sm">
                  <span className="min-w-0 truncate font-medium">
                    {p.vehicles?.vehicle_code ?? "—"}
                    <span className="ml-2 font-mono text-xs text-muted-foreground">{p.vehicles?.registration_number}</span>
                  </span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(p.recorded_at), { addSuffix: true })}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
