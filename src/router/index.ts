import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { i18n } from '@/plugins/i18n'
import { ROUTE_NAMES } from '@/constants/routeNames'

/**
 * Application routes.
 *
 * Each route defines:
 * - **path**: URL path
 * - **name**: Unique name for programmatic navigation
 * - **component**: Lazy-loaded view
 * - **meta**: Extra metadata for layouts, auth, menu visibility, etc.
 */
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: ROUTE_NAMES.PRESENTATION,
        component: () => import('@/views/PresentationView.vue'),
        meta: { layout: 'default', requiresAuth: false, showInMenu: false },
    },
    {
        path: '/login',
        name: ROUTE_NAMES.LOGIN,
        component: () => import('@/views/auth/LoginView.vue'),
        meta: { layout: 'default', title: 'login', requiresAuth: false, showInMenu: false },
    },
    {
        path: '/register',
        name: ROUTE_NAMES.REGISTER,
        component: () => import('@/views/auth/RegisterView.vue'),
        meta: { layout: 'default', title: 'register', requiresAuth: false, showInMenu: false },
    },
    {
        path: '/register-confirm',
        name: ROUTE_NAMES.REGISTER_CONFIRM,
        component: () => import('@/views/auth/RegisterConfirmView.vue'),
        meta: { layout: 'default', title: 'registerConfirm', requiresAuth: false, showInMenu: false },
    },
    {
        path: '/forgotten-password',
        name: ROUTE_NAMES.FORGOTTEN_PASSWORD,
        component: () => import('@/views/auth/ForgottenPasswordView.vue'),
        meta: { layout: 'default', title: 'forgottenPassword', requiresAuth: false, showInMenu: false },
    },
    {
        path: '/dashboard',
        name: ROUTE_NAMES.DASHBOARD,
        component: () => import('@/views/dashboard/DashboardView.vue'),
        meta: { layout: 'app', icon: 'home', title: 'dashboard', requiresAuth: true, showInMenu: true },
    },
    {
        path: '/stocks/:tab?',
        name: ROUTE_NAMES.STOCKS,
        component: () => import('@/views/stocks/MainView.vue'),
        meta: { layout: 'app', icon: 'money-check-dollar', title: 'stocks', requiresAuth: true, showInMenu: true },
    },
    {
        path: '/crypto/:tab?',
        name: ROUTE_NAMES.CRYPTO,
        component: () => import('@/views/crypto/MainView.vue'),
        meta: { layout: 'app', icon: 'bitcoin-sign', title: 'crypto', requiresAuth: true, showInMenu: true },
    },
    {
        path: '/transfers/:tab?',
        name: ROUTE_NAMES.TRANSFERS,
        component: () => import('@/views/transfers/MainView.vue'),
        meta: { layout: 'app', icon: 'money-bill-transfer', title: 'transfers', requiresAuth: true, showInMenu: true },
    },
    {
        path: '/playground',
        name: ROUTE_NAMES.PLAYGROUND,
        component: () => import('@/views/PlaygroundView.vue'),
        meta: { layout: 'app', icon: 'chart-simple', title: 'playground', requiresAuth: true, showInMenu: true },
    },
    {
        path: '/account/:tab?',
        name: ROUTE_NAMES.ACCOUNT,
        component: () => import('@/views/account/MainView.vue'),
        meta: { layout: 'app', title: 'account', requiresAuth: true, showInMenu: false },
    },
    {
        path: '/:pathMatch(.*)*',
        name: ROUTE_NAMES.NOT_FOUND,
        component: () => import('@/views/NotFoundView.vue'),
        meta: { layout: 'default', showInMenu: false },
    },
]

/**
 * Application router instance.
 *
 * - Uses HTML5 history mode.
 * - Registers routes defined above.
 */
const router = createRouter({
    history: createWebHistory(),
    routes,
})

/**
 * Global navigation guard for authentication.
 *
 * - If the route requires auth and the user is not logged in → redirect to Login
 * - If user is logged in and tries to access Login → redirect to Dashboard
 * - Otherwise → allow navigation
 */
router.beforeEach((to, from, next) => {
    // Replace with a store-based auth state (e.g., Pinia) so it reacts when a user logs in/out.
    const loggedIn = !!localStorage.getItem('authToken')

    if (to.meta.requiresAuth && !loggedIn) {
        next({ name: ROUTE_NAMES.LOGIN })
    } else if (to.name === ROUTE_NAMES.LOGIN && loggedIn) {
        next({ name: ROUTE_NAMES.DASHBOARD })
    } else {
        next()
    }
})

/**
 * After each navigation, set the document title based on the route meta.
 * Uses i18n for translated titles.
 */
router.afterEach((to) => {
    const { t } = i18n.global
    if (to.meta?.title) {
        document.title = `Stonker | ${t(`routes.${to.meta?.title}`)}`
    } else {
        document.title = 'Stonker'
    }
})

export { routes }
export default router
