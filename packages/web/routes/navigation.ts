import {
  Monitor,
  Users,
  Truck,
  Factory,
  LandPlot,
  Award,
  ListChecks,
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
    key: "users",
    icon: Users,
    label: "Users",
    path: routes.main.users(),
    require_permissions: ["manage_users"],
  },
  {
    key: "vehicles",
    icon: Truck,
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
    key: "role",
    icon: Award,
    label: "Role",
    path: routes.main.role(),
    require_permissions: ["manage_roles"],
  },
];
