export const routes = {
    auth: {
        login: () => `/login`,
        resetPassword: {
            root: () => '/reset-password',
            initiate: () => `${routes.auth.resetPassword.root()}/initiate`,
            confirm: () => `${routes.auth.resetPassword.root()}/confirm`,
        }
    },
    main: {
        monitor: () => `/monitor`,
        users: () => `/users`,
        vehicles: () => `/vehicles`,
        sts: () => `/sts`,
        role: () => `/role`,
    }
}