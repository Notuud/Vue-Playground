import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import PresentationView from '@/views/PresentationView.vue'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import PlaygroundView from '@/views/PlaygroundView.vue'

// Routes
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Presentation',
        component: PresentationView,
        meta: { layout: 'login', showInMenu: false },
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView,
        meta: { layout: 'login', showInMenu: false },
    },
    {
        path: '/home',
        name: 'Home',
        component: HomeView,
        meta: { layout: 'app', icon: 'home', showInMenu: true },
    },
    {
        path: '/playground',
        name: 'Playground',
        component: PlaygroundView,
        meta: { layout: 'app', icon: 'chart-simple', showInMenu: true },
    },
    {
        path: '/about',
        name: 'About',
        component: AboutView,
        meta: { layout: 'app', icon: 'info', showInMenu: true },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// Simple auth guard
router.beforeEach((to, from, next) => {
    if (to.name === 'Presentation') {
        next()
        return
    }

    const loggedIn = !!localStorage.getItem('authToken')
    if (to.name !== 'Login' && !loggedIn) {
        next({ name: 'Login' })
    } else if (to.name === 'Login' && loggedIn) {
        // redirect logged-in users away from login
        next({ name: 'Home' })
    } else {
        next()
    }
})

export { routes }
export default router
