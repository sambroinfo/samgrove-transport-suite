import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/brand";

/** Route-mark: two stops joined by a curved path, forming an abstract "S". */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-signal shadow-signal",
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 32 32" className="size-[62%]" fill="none">
        <path
          d="M23 8.5c-2-1.6-4.4-2-6.6-1.6-3 .6-4.9 2.9-4.3 5.3.6 2.3 3.4 3 5.9 3.7 2.6.7 5.2 1.6 5.6 4 .5 2.7-2 5.1-5.4 5.4-2.4.2-4.8-.5-6.6-2.1"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          className="text-signal-foreground"
        />
        <circle cx="23.4" cy="8.6" r="2.4" className="fill-signal-foreground" />
        <circle cx="11.6" cy="23.3" r="2.4" className="fill-signal-foreground" />
      </svg>
    </span>
  );
}

export function Logo({
  className,
  tone = "default",
  compact = false,
}: {
  className?: string;
  tone?: "default" | "inverse";
  compact?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      {!compact && (
        <span className="flex min-w-0 flex-col leading-none">
          <span
            className={cn(
              "font-display text-[0.95rem] font-bold tracking-[0.08em]",
              tone === "inverse" ? "text-ink-foreground" : "text-foreground",
            )}
          >
            {BRAND.name}
          </span>
          <span
            className={cn(
              "eyebrow mt-1 !text-[0.6rem]",
              tone === "inverse" ? "text-ink-muted" : "text-muted-foreground",
            )}
          >
            {BRAND.product}
          </span>
        </span>
      )}
    </span>
  );
}
