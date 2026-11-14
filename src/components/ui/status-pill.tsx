import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pillVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[0.7rem] font-semibold whitespace-nowrap",
  {
    variants: {
      tone: {
        neutral: "bg-muted text-muted-foreground",
        live: "bg-success-soft text-success",
        signal: "bg-signal-soft text-signal-foreground",
        warning: "bg-warning-soft text-warning",
        danger: "bg-danger-soft text-destructive",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export type PillTone = NonNullable<VariantProps<typeof pillVariants>["tone"]>;

export function StatusPill({
  tone,
  children,
  dot = true,
  className,
}: VariantProps<typeof pillVariants> & { children: React.ReactNode; dot?: boolean; className?: string }) {
  return (
    <span className={cn(pillVariants({ tone }), className)}>
      {dot && <span className="size-1.5 rounded-full bg-current" aria-hidden />}
      {children}
    </span>
  );
}
