import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import PricingView from '../views/PricingView.vue'
import EmployeeView from '../views/EmployeeView.vue'
import KassenbuchungView from '@/views/KassenbuchungView'
import Login from '@/views/Login'
import Register from '@/views/Register'
import KassenbuchungDashboard from '@/views/KassenbuchungDashboard'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: KassenbuchungDashboard
  },
  {
    path: '/kassenbuchung',
    name: 'kassenbuchung',
    component: KassenbuchungView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/pricing',
    name: 'Pricing',
    component: PricingView
  },

  {
    path: '/employee',
    name: 'Employee',
    component: EmployeeView
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes
})

export default router
