import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import CartPage from '../views/CartPage.vue'
import AuthPage from '../views/AuthPage.vue'
import notFound from '../views/notFound.vue'

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
  },
  {
    path: '/:pathMatch(.*)',
    component: notFound
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
