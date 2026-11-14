import { Database, Hammer } from "lucide-react";
import { MODULES } from "@/lib/modules";
import { NAV_ITEMS, type NavPath } from "@/lib/navigation";
import { useI18n } from "@/lib/i18n";
import { StatusPill } from "@/components/ui/status-pill";

export function ModulePlaceholder({ path }: { path: Exclude<NavPath, "/dashboard"> }) {
  const { t, lang } = useI18n();
  const item = NAV_ITEMS.find((i) => i.to === path)!;
  const mod = MODULES[path];
  const Icon = item.icon;

  return (
    <div className="mx-auto max-w-3xl animate-rise">
      <div className="overflow-hidden rounded-2xl border bg-card shadow-card">
        <div className="relative surface-ink px-6 py-8 sm:px-8 sm:py-10">
          <div className="absolute inset-0 map-grid opacity-60" aria-hidden />
          <div className="relative flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-signal text-signal-foreground shadow-signal">
              <Icon className="size-6" />
            </span>
            <div className="min-w-0">
              <h1 className="text-2xl font-semibold text-ink-foreground sm:text-3xl">{t(item.label)}</h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted">{mod.description[lang]}</p>
            </div>
          </div>
        </div>
        <div className="space-y-5 px-6 py-6 sm:px-8">
          <StatusPill tone="signal">
            <Hammer className="size-3" />
            {t("module.planned")}
          </StatusPill>
          <div>
            <p className="eyebrow flex items-center gap-1.5 text-muted-foreground">
              <Database className="size-3.5" />
              {t("module.dataSources")}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {mod.tables.map((table) => (
                <li key={table} className="rounded-md border bg-muted px-2 py-1 font-mono text-xs text-foreground">
                  {table}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
