import {
  Monitor,
  Users,
  Truck,
  Factory,
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
    path: routes.main.vehicles.root(),
    require_permissions: ["manage_vehicles"],
    subNavigations: [
      {
        key: "entry",
        icon: ListChecks,
        label: "Vehicle Entry",
        path: routes.main.vehicles.entry(),
        require_permissions: ["manage_vehicles"],
      },
    ],
  },
  {
    key: "sts",
    icon: Factory,
    label: "STS",
    path: routes.main.sts(),
    require_permissions: ["manage_sts"],
  },
  {
    key: "role",
    icon: Award,
    label: "Role",
    path: routes.main.role(),
    require_permissions: ["manage_roles"],
  },
];
