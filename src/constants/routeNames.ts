/**
 * Centralized route name constants.
 * Use these instead of raw strings to avoid typos.
 */
export const ROUTE_NAMES = {
    PRESENTATION: 'Presentation',
    LOGIN: 'Login',
    REGISTER: 'Register',
    REGISTER_CONFIRM: 'RegisterConfirm',
    FORGOTTEN_PASSWORD: 'ForgottenPassword',
    DASHBOARD: 'Dashboard',
    STOCKS: 'Stocks',
    CRYPTO: 'Crypto',
    TRANSFERS: 'Transfers',
    PLAYGROUND: 'Playground',
    ACCOUNT: 'Account',
    NOT_FOUND: 'NotFound',
} as const

/**
 * Union type of all route names.
 */
export type RouteName = (typeof ROUTE_NAMES)[keyof typeof ROUTE_NAMES]
