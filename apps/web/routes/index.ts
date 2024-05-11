export const routes = {
  auth: {
    root: () => `/auth` as const,
    login: () => `${routes.auth.root()}/login` as const,
    createPassword: () => `${routes.auth.root()}/create-password` as const,
    resetPassword: {
      root: () => `${routes.auth.root()}/reset-password` as const,
      initiate: () => `${routes.auth.resetPassword.root()}/initiate` as const,
      confirm: () => `${routes.auth.resetPassword.root()}/confirm` as const,
    },
  },
  main: {
    monitor: () => `/monitor` as const,
    users: () => `/users` as const,
    vehicles: () => `/vehicles` as const,
    issues: () => `/issue` as const,
    contractor: () => `/contractor` as const,
    collection: () => `/collection` as const,
    transportation: {
      root: () => `/transportation` as const,
      sts: () => `${routes.main.transportation.root()}/sts` as const,
      landfill: () => `${routes.main.transportation.root()}/landfill` as const,
    },
    vehicleEntry: () => `/vehicle-entry` as const,
    sts: () => `/sts` as const,
    landfill: () => `/landfill` as const,
    role: () => `/role` as const,
  },
  status: {
    unauthorized: () => `/401` as const,
  },
};
