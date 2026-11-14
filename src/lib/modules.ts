import type { NavPath } from "@/lib/navigation";
import type { LanguageCode } from "@/lib/i18n";

/** Module roadmap copy plus the existing database tables each module will read and write. */
export const MODULES: Record<
  Exclude<NavPath, "/dashboard">,
  { description: Record<LanguageCode, string>; tables: string[] }
> = {
  "/employees": {
    description: {
      en: "Employee directory, departments, shifts and pickup allocations for transport-eligible staff.",
      bn: "পরিবহন সুবিধাপ্রাপ্ত কর্মীদের তালিকা, বিভাগ, শিফট ও পিকআপ বরাদ্দ।",
    },
    tables: ["employees", "departments", "shifts", "employee_transport_allocations"],
  },
  "/drivers": {
    description: {
      en: "Driver roster, licence validity and vehicle assignments.",
      bn: "চালকের তালিকা, লাইসেন্সের মেয়াদ ও যানবাহন বরাদ্দ।",
    },
    tables: ["drivers", "vehicle_driver_assignments"],
  },
  "/vehicles": {
    description: {
      en: "Fleet register with seat layouts, maintenance history and installed GPS devices.",
      bn: "আসন বিন্যাস, রক্ষণাবেক্ষণ ইতিহাস ও জিপিএস ডিভাইসসহ যানবাহন নিবন্ধন।",
    },
    tables: ["vehicles", "vehicle_seats", "vehicle_maintenance", "gps_devices"],
  },
  "/routes": {
    description: {
      en: "Versioned routes, ordered stops and geofenced pickup points.",
      bn: "সংস্করণভিত্তিক রুট, ক্রমানুসারে স্টপ ও জিওফেন্সড পিকআপ পয়েন্ট।",
    },
    tables: ["routes", "route_versions", "route_stops", "pickup_points"],
  },
  "/trips": {
    description: {
      en: "Trip scheduling, passenger manifests, seat assignments and boarding attendance.",
      bn: "ট্রিপ সময়সূচি, যাত্রী তালিকা, আসন বরাদ্দ ও উপস্থিতি।",
    },
    tables: ["trips", "trip_passengers", "seat_assignments", "attendance_records", "trip_events"],
  },
  "/gps-tracking": {
    description: {
      en: "Live vehicle positions, signal health, location history and geofence arrivals.",
      bn: "যানবাহনের লাইভ অবস্থান, সিগন্যালের অবস্থা, অবস্থানের ইতিহাস ও জিওফেন্স আগমন।",
    },
    tables: ["vehicle_current_locations", "gps_location_history", "geofence_events", "gps_devices"],
  },
  "/notifications": {
    description: {
      en: "Your full notification inbox and per-event delivery preferences.",
      bn: "আপনার সম্পূর্ণ বিজ্ঞপ্তি ও ইভেন্টভিত্তিক পছন্দসমূহ।",
    },
    tables: ["notifications", "notification_preferences"],
  },
  "/chat": {
    description: {
      en: "Vehicle and trip group chats between riders, drivers and coordinators.",
      bn: "যাত্রী, চালক ও সমন্বয়কারীদের মধ্যে যানবাহন ও ট্রিপভিত্তিক গ্রুপ চ্যাট।",
    },
    tables: ["chat_groups", "chat_members", "chat_messages"],
  },
  "/emergencies": {
    description: {
      en: "Incident reporting, acknowledgement and resolution timeline.",
      bn: "ঘটনা রিপোর্ট, স্বীকৃতি ও সমাধানের সময়রেখা।",
    },
    tables: ["emergency_incidents", "emergency_updates"],
  },
  "/reports": {
    description: {
      en: "Punctuality, attendance and utilisation reporting with an audit trail.",
      bn: "সময়ানুবর্তিতা, উপস্থিতি ও ব্যবহারের রিপোর্ট এবং অডিট লগ।",
    },
    tables: ["trips", "attendance_records", "trip_passengers", "audit_logs"],
  },
  "/settings": {
    description: {
      en: "Organization profile, members, roles and permissions.",
      bn: "প্রতিষ্ঠানের প্রোফাইল, সদস্য, ভূমিকা ও অনুমতি।",
    },
    tables: ["organizations", "organization_members", "roles", "member_roles", "permissions"],
  },
};
