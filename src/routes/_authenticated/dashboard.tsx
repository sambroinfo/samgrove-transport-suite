import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Building2, Bus, CalendarClock, IdCard, Siren, Users } from "lucide-react";
import { dashboardSummaryQuery } from "@/lib/queries";
import { useOrg } from "@/lib/org-context";
import { useI18n } from "@/lib/i18n";
import { BRAND } from "@/lib/brand";
import { StatCard } from "@/components/dashboard/stat-card";
import { FleetMapPreview } from "@/components/dashboard/fleet-map-preview";
import { OpenIncidents, TodaysTrips } from "@/components/dashboard/dashboard-lists";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: `Dashboard · ${BRAND.fullName}` },
      { name: "description", content: `Fleet, trips and safety overview in ${BRAND.fullName}.` },
      { property: "og:title", content: `Dashboard · ${BRAND.fullName}` },
      { property: "og:description", content: "Fleet, trips and safety overview." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { t, locale } = useI18n();
  const { current, isLoading } = useOrg();
  const today = new Intl.DateTimeFormat(locale, { weekday: "long", day: "numeric", month: "long" }).format(new Date());

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="animate-rise">
        <p className="eyebrow text-muted-foreground">
          {t("dash.today")} · {today}
        </p>
        <h1 className="mt-1.5 text-2xl font-semibold sm:text-3xl">{t("dash.greeting")}</h1>
        {current && (
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Building2 className="size-3.5" />
            {current.name}
          </p>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
      ) : !current ? (
        <NoOrganization />
      ) : (
        <OrgDashboard orgId={current.organizationId} />
      )}
    </div>
  );
}

function NoOrganization() {
  const { t } = useI18n();
  return (
    <div className="rounded-2xl border border-dashed bg-card p-6 shadow-card sm:p-8">
      <span className="flex size-11 items-center justify-center rounded-xl bg-signal-soft text-signal-foreground">
        <Building2 className="size-5" />
      </span>
      <h2 className="mt-4 text-lg font-semibold">{t("dash.noOrgTitle")}</h2>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{t("dash.noOrgBody")}</p>
    </div>
  );
}

function OrgDashboard({ orgId }: { orgId: string }) {
  const { t } = useI18n();
  const { data, isLoading } = useQuery(dashboardSummaryQuery(orgId));

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-5">
        <StatCard
          featured
          className="col-span-2 sm:col-span-1"
          label={t("dash.activeVehicles")}
          value={data?.vehiclesActive}
          hint={data?.vehiclesTotal != null ? t("dash.ofTotal", { total: data.vehiclesTotal }) : undefined}
          icon={Bus}
          loading={isLoading}
        />
        <StatCard
          label={t("dash.tripsToday")}
          value={data?.tripsToday}
          hint={data?.tripsInProgress != null ? t("dash.inProgress", { count: data.tripsInProgress }) : undefined}
          icon={CalendarClock}
          loading={isLoading}
        />
        <StatCard
          label={t("dash.employees")}
          value={data?.employeesActive}
          hint={t("dash.eligible")}
          icon={Users}
          loading={isLoading}
        />
        <StatCard
          label={t("dash.drivers")}
          value={data?.driversActive}
          hint={t("dash.driversHint")}
          icon={IdCard}
          loading={isLoading}
        />
        <StatCard
          alert
          label={t("dash.emergencies")}
          value={data?.openIncidents}
          hint={t("dash.emergenciesHint")}
          icon={Siren}
          loading={isLoading}
        />
      </div>
      <p className="-mt-2 text-xs text-muted-foreground">{t("dash.scopeNote")}</p>

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <FleetMapPreview orgId={orgId} />
        </div>
        <div className="space-y-4 lg:col-span-2">
          <OpenIncidents orgId={orgId} />
          <TodaysTrips orgId={orgId} />
        </div>
      </div>
    </>
  );
}
