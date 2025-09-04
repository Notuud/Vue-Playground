import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { i18n } from '@/plugins/i18n'

// Routes
// Path for each view
// Name for router-ling and navigation
// Component to load view
// Meta for additional info (layout, icon, title as key for i18n, requiresAuth for auth guard, showInMenu to show/hide in navigation menu)
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Presentation',
        component: () => import('@/views/PresentationView.vue'),
        meta: { layout: 'default', requiresAuth: false, showInMenu: false },
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/auth/LoginView.vue'),
        meta: { layout: 'default', title: 'login', requiresAuth: false, showInMenu: false },
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/auth/RegisterView.vue'),
        meta: { layout: 'default', title: 'register', requiresAuth: false, showInMenu: false },
    },
    {
        path: '/register-confirm',
        name: 'RegisterConfirm',
        component: () => import('@/views/auth/RegisterConfirmView.vue'),
        meta: { layout: 'default', title: 'registerConfirm', requiresAuth: false, showInMenu: false },
    },
    {
        path: '/forgotten-password',
        name: 'ForgottenPassword',
        component: () => import('@/views/auth/ForgottenPasswordView.vue'),
        meta: { layout: 'default', title: 'forgottenPassword', requiresAuth: false, showInMenu: false },
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/HomeView.vue'),
        meta: { layout: 'app', icon: 'home', title: 'home', requiresAuth: true, showInMenu: true },
    },
    {
        path: '/stocks/:tab?',
        name: 'Stocks',
        component: () => import('@/views/stocks/MainView.vue'),
        meta: { layout: 'app', icon: 'money-check-dollar', title: 'stocks', requiresAuth: true, showInMenu: true },
    },
    {
        path: '/crypto/:tab?',
        name: 'Crypto',
        component: () => import('@/views/crypto/MainView.vue'),
        meta: { layout: 'app', icon: 'bitcoin-sign', title: 'crypto', requiresAuth: true, showInMenu: true },
    },
    {
        path: '/transfers/:tab?',
        name: 'Transfers',
        component: () => import('@/views/transfers/MainView.vue'),
        meta: { layout: 'app', icon: 'money-bill-transfer', title: 'transfers', requiresAuth: true, showInMenu: true },
    },
    {
        path: '/playground',
        name: 'Playground',
        component: () => import('@/views/PlaygroundView.vue'),
        meta: { layout: 'app', icon: 'chart-simple', title: 'playground', requiresAuth: true, showInMenu: true },
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/views/AboutView.vue'),
        meta: { layout: 'app', icon: 'info', title: 'about', requiresAuth: true, showInMenu: true },
    },
    {
        path: '/account',
        name: 'Account',
        component: () => import('@/views/account/MainView.vue'),
        meta: { layout: 'app', title: 'account', requiresAuth: true, showInMenu: false },
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFoundView.vue'),
        meta: { layout: 'default', showInMenu: false },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// Simple auth guard
router.beforeEach((to, from, next) => {
    // Replace with a store-based auth state (e.g., Pinia) so it reacts when a user logs in/out.
    const loggedIn = !!localStorage.getItem('authToken')

    if (to.meta.requiresAuth && !loggedIn) {
        next({ name: 'Login' })
    } else if (to.name === 'Login' && loggedIn) {
        next({ name: 'Home' })
    } else {
        next()
    }
})

// Document title handling
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
