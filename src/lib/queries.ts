import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Enums = Database["public"]["Enums"];

export type Membership = {
  memberId: string;
  organizationId: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  timezone: string;
};

export const membershipsQuery = (userId: string) =>
  queryOptions({
    queryKey: ["memberships", userId],
    queryFn: async (): Promise<Membership[]> => {
      const { data, error } = await supabase
        .from("organization_members")
        .select("id, organization_id, organizations(id, name, slug, logo_url, timezone, is_active)")
        .eq("profile_id", userId)
        .eq("status", "active");
      if (error) throw error;
      return (data ?? []).flatMap((row) => {
        const org = row.organizations;
        if (!org || !org.is_active) return [];
        return [
          {
            memberId: row.id,
            organizationId: row.organization_id,
            name: org.name,
            slug: org.slug,
            logoUrl: org.logo_url,
            timezone: org.timezone,
          },
        ];
      });
    },
  });

export const profileQuery = (userId: string) =>
  queryOptions({
    queryKey: ["profile", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, email, avatar_url")
        .eq("id", userId)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

/** Local-day window for "today" figures. */
export function todayRange(now = new Date()) {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { start: start.toISOString(), end: end.toISOString() };
}

export const OPEN_INCIDENT_STATUSES: Enums["incident_status"][] = ["open", "acknowledged", "in_progress"];

type Count = number | null;

async function count(
  q: PromiseLike<{ count: number | null; error: unknown }>,
): Promise<Count> {
  const { count: c, error } = await q;
  return error ? null : (c ?? 0);
}

export type DashboardSummary = {
  vehiclesTotal: Count;
  vehiclesActive: Count;
  tripsToday: Count;
  tripsInProgress: Count;
  employeesActive: Count;
  driversActive: Count;
  openIncidents: Count;
};

export const dashboardSummaryQuery = (orgId: string) =>
  queryOptions({
    queryKey: ["dashboard", "summary", orgId],
    queryFn: async (): Promise<DashboardSummary> => {
      const { start, end } = todayRange();
      const head = { count: "exact" as const, head: true };
      const [vehiclesTotal, vehiclesActive, tripsToday, tripsInProgress, employeesActive, driversActive, openIncidents] =
        await Promise.all([
          count(supabase.from("vehicles").select("id", head).eq("organization_id", orgId)),
          count(supabase.from("vehicles").select("id", head).eq("organization_id", orgId).eq("status", "active")),
          count(
            supabase
              .from("trips")
              .select("id", head)
              .eq("organization_id", orgId)
              .gte("scheduled_at", start)
              .lt("scheduled_at", end),
          ),
          count(supabase.from("trips").select("id", head).eq("organization_id", orgId).eq("status", "in_progress")),
          count(supabase.from("employees").select("id", head).eq("organization_id", orgId).eq("is_active", true)),
          count(supabase.from("drivers").select("id", head).eq("organization_id", orgId).eq("is_active", true)),
          count(
            supabase
              .from("emergency_incidents")
              .select("id", head)
              .eq("organization_id", orgId)
              .in("status", OPEN_INCIDENT_STATUSES),
          ),
        ]);
      return { vehiclesTotal, vehiclesActive, tripsToday, tripsInProgress, employeesActive, driversActive, openIncidents };
    },
  });

export const vehiclePositionsQuery = (orgId: string) =>
  queryOptions({
    queryKey: ["dashboard", "positions", orgId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vehicle_current_locations")
        .select(
          "vehicle_id, health, source, speed_kph, recorded_at, vehicles!vehicle_current_locations_vehicle_id_organization_id_fkey(vehicle_code, registration_number)",
        )
        .eq("organization_id", orgId)
        .order("recorded_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data ?? [];
    },
  });

export const todaysTripsQuery = (orgId: string) =>
  queryOptions({
    queryKey: ["dashboard", "trips-today", orgId],
    queryFn: async () => {
      const { start, end } = todayRange();
      const { data, error } = await supabase
        .from("trips")
        .select(
          "id, status, direction, scheduled_at, vehicles!trips_vehicle_id_organization_id_fkey(vehicle_code, registration_number)",
        )
        .eq("organization_id", orgId)
        .gte("scheduled_at", start)
        .lt("scheduled_at", end)
        .order("scheduled_at", { ascending: true })
        .limit(8);
      if (error) throw error;
      return data ?? [];
    },
  });

export const openIncidentsQuery = (orgId: string) =>
  queryOptions({
    queryKey: ["dashboard", "incidents", orgId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("emergency_incidents")
        .select("id, incident_type, severity, status, created_at")
        .eq("organization_id", orgId)
        .in("status", OPEN_INCIDENT_STATUSES)
        .order("created_at", { ascending: false })
        .limit(5);
      if (error) throw error;
      return data ?? [];
    },
  });

export const notificationsQuery = (userId: string, orgId: string | null) =>
  queryOptions({
    queryKey: ["notifications", userId, orgId],
    enabled: Boolean(orgId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("id, title, body, event_type, read_at, created_at")
        .eq("profile_id", userId)
        .eq("organization_id", orgId!)
        .order("created_at", { ascending: false })
        .limit(8);
      if (error) throw error;
      return data ?? [];
    },
  });

export async function markAllNotificationsRead(userId: string, orgId: string) {
  const { error } = await supabase
    .from("notifications")
    .update({ read_at: new Date().toISOString() })
    .eq("profile_id", userId)
    .eq("organization_id", orgId)
    .is("read_at", null);
  if (error) throw error;
}
