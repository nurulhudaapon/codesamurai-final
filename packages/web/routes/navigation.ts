import { Monitor, Users, Truck, Factory, Award } from 'lucide-react'
import { routes } from '.'

export const navigations = [
    {
        key: 'monitor',
        icon: Monitor,
        label: 'Monitor',
        path: routes.main.monitor()
    },
    {
        key: 'users',
        icon: Users,
        label: 'Users',
        path: routes.main.users()
    },
    {
        key: 'vehicles',
        icon: Truck,
        label: 'Vehicles',
        path: routes.main.vehicles()
    },
    {
        key: 'sts',
        icon: Factory,
        label: 'STS',
        path: routes.main.sts()
    },
    {
        key: 'rolw',
        icon: Award,
        label: 'Role',
        path: routes.main.role()
    },
]