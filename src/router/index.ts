import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'

// Routes
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: LoginView,
    meta: { layout: 'login' }, // use LoginLayout
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
    meta: { layout: 'app' }, // use AppLayout
  },
    {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { layout: 'app' }, // use AppLayout
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Simple auth guard
router.beforeEach((to, from, next) => {
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

export default router