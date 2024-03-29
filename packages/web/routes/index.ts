export const routes = {
  auth: {
    root: () => `/auth` as const,
    login: () => `${routes.auth.root()}/login` as const,
    resetPassword: {
      root: () => `${routes.auth.root()}/reset-password` as const,
      initiate: () => `${routes.auth.resetPassword.root()}/initiate` as const,
      confirm: () => `${routes.auth.resetPassword.root()}/confirm` as const,
    },
  },
  main: {
    monitor: () => `/monitor` as const,
    users: () => `/users` as const,
    vehicles: {
      root: () => `/vehicles` as const,
      entry: () => `${routes.main.vehicles.root()}/entry` as const,
    },
    sts: () => `/sts` as const,
    role: () => `/role` as const,
  },
  status: {
    unauthorized: () => `/401` as const,
  },
};
