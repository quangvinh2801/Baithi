import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ItemDetail from '../views/ItemDetail.vue'
import MyCart from '../views/MyCart.vue'
import Login from '../views/Login.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/item/:id',
      name: 'item-detail',
      component: ItemDetail,
      meta: { requiresAuth: true }
    },
    {
      path: '/mycart',
      name: 'mycart',
      component: MyCart,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router