import {
  AlertTriangle,
  BarChart3,
  Bell,
  Bus,
  LayoutDashboard,
  MapPinned,
  MessagesSquare,
  Route as RouteIcon,
  Settings,
  SteeringWheel,
  CalendarClock,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { TranslationKey } from "@/lib/i18n";

export type NavPath =
  | "/dashboard"
  | "/employees"
  | "/drivers"
  | "/vehicles"
  | "/routes"
  | "/trips"
  | "/gps-tracking"
  | "/notifications"
  | "/chat"
  | "/emergencies"
  | "/reports"
  | "/settings";

export type NavItem = { to: NavPath; label: TranslationKey; icon: LucideIcon };
export type NavGroup = { label: TranslationKey; items: NavItem[] };

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "nav.group.overview",
    items: [{ to: "/dashboard", label: "nav.dashboard", icon: LayoutDashboard }],
  },
  {
    label: "nav.group.operations",
    items: [
      { to: "/trips", label: "nav.trips", icon: CalendarClock },
      { to: "/routes", label: "nav.routes", icon: RouteIcon },
      { to: "/gps-tracking", label: "nav.gps", icon: MapPinned },
      { to: "/vehicles", label: "nav.vehicles", icon: Bus },
      { to: "/drivers", label: "nav.drivers", icon: SteeringWheel },
    ],
  },
  {
    label: "nav.group.people",
    items: [{ to: "/employees", label: "nav.employees", icon: Users }],
  },
  {
    label: "nav.group.communication",
    items: [
      { to: "/notifications", label: "nav.notifications", icon: Bell },
      { to: "/chat", label: "nav.chat", icon: MessagesSquare },
      { to: "/emergencies", label: "nav.emergencies", icon: AlertTriangle },
    ],
  },
  {
    label: "nav.group.system",
    items: [
      { to: "/reports", label: "nav.reports", icon: BarChart3 },
      { to: "/settings", label: "nav.settings", icon: Settings },
    ],
  },
];

export const NAV_ITEMS: NavItem[] = NAV_GROUPS.flatMap((g) => g.items);

export function findNavItem(pathname: string): NavItem | undefined {
  return NAV_ITEMS.find((item) => pathname === item.to || pathname.startsWith(`${item.to}/`));
}
