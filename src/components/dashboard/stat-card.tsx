import type { LucideIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  loading,
  featured,
  alert,
  className,
}: {
  label: string;
  value: number | null | undefined;
  hint?: string;
  icon: LucideIcon;
  loading?: boolean;
  featured?: boolean;
  alert?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border p-4 shadow-card sm:p-5",
        featured ? "surface-ink border-transparent" : "bg-card",
        className,
      )}
    >
      {featured && <div className="absolute inset-0 map-grid opacity-50" aria-hidden />}
      <div className="relative flex items-start justify-between gap-3">
        <p className={cn("text-xs font-semibold sm:text-sm", featured ? "text-ink-muted" : "text-muted-foreground")}>
          {label}
        </p>
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-lg",
            featured
              ? "bg-gradient-signal text-signal-foreground"
              : alert && value
                ? "bg-danger-soft text-destructive"
                : "bg-secondary text-secondary-foreground",
          )}
        >
          <Icon className="size-4" />
        </span>
      </div>
      <div className="relative mt-3">
        {loading ? (
          <Skeleton className="h-9 w-16" />
        ) : (
          <p
            className={cn(
              "font-display text-3xl font-semibold tabular-nums tracking-tight sm:text-4xl",
              featured ? "text-ink-foreground" : alert && value ? "text-destructive" : "text-foreground",
            )}
            title={value === null ? "Not available for your role" : undefined}
          >
            {value === null || value === undefined ? "—" : value.toLocaleString()}
          </p>
        )}
        {hint && (
          <p className={cn("mt-1 truncate text-xs", featured ? "text-ink-muted" : "text-muted-foreground")}>{hint}</p>
        )}
      </div>
    </div>
  );
}
