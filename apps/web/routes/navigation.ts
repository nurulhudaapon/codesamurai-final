import {
  Award,
  BadgeHelp,
  BaggageClaim,
  CalendarClock,
  Caravan,
  Factory,
  LandPlot,
  Monitor,
  TruckIcon,
  Users
} from "lucide-react";
import { routes } from ".";

export const navigations = [
  {
    key: "monitor",
    icon: Monitor,
    label: "Monitor",
    path: routes.main.monitor(),
    require_permissions: ["view_monitor"],
  },
  {
    key: "sts_transportation",
    icon: TruckIcon,
    label: "Transportation",
    path: routes.main.transportation.sts(),
    require_permissions: ["sts_transportation"],
  },
  {
    key: "landfill_transportation",
    icon: BaggageClaim,
    label: "Billing",
    path: routes.main.transportation.landfill(),
    require_permissions: ["landfill_transportation"],
  },
  {
    key: "vehicles",
    icon: Caravan,
    label: "Vehicles",
    path: routes.main.vehicles(),
    require_permissions: ["manage_vehicles"],
  },
  {
    key: "sts",
    icon: Factory,
    label: "STS",
    path: routes.main.sts(),
    require_permissions: ["manage_sts"],
  },
  {
    key: "landfill",
    icon: LandPlot,
    label: "Landfill",
    path: routes.main.landfill(),
    require_permissions: ["manage_landfill"],
  },
  {
    key: "issue",
    icon: BadgeHelp,
    label: "Issues",
    path: routes.main.issues(),
    require_permissions: [],
  },
  {
    key: "collection",
    icon: CalendarClock,
    label: "Collection Plan",
    path: routes.main.collection(),
    require_permissions: ['manage_collection_plan'],
  },
  {
    key: "users",
    icon: Users,
    label: "Users",
    path: routes.main.users(),
    require_permissions: ["manage_users"],
  },
  {
    key: "role",
    icon: Award,
    label: "Role",
    path: routes.main.role(),
    require_permissions: ["manage_roles"],
  },
];
