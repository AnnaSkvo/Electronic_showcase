import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import CartPage from '../views/CartPage.vue'
import AuthPage from '../views/AuthPage.vue'

const routes = [
  {
    path: '/auth',
    component: AuthPage,
    name: 'auth'
  },
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
