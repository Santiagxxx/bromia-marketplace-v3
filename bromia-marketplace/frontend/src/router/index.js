import { createRouter, createWebHistory } from 'vue-router'
import MarketplaceView from '@/views/MarketplaceView.vue'
import AdminDashboardView from '@/views/AdminDashboardView.vue'

const routes = [
  {
    path: '/',
    name: 'marketplace',
    component: MarketplaceView,
    meta: { title: 'Bromia • Tienda Oficial' }
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminDashboardView,
    meta: { title: 'Bromia • Dashboard Admin' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to, _from, next) => {
  document.title = to.meta.title || 'Bromia Marketplace'
  next()
})

export default router
