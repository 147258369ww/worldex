import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/Home.vue') },
  { path: '/overseas', name: 'Overseas', component: () => import('@/views/Overseas.vue') },
  { path: '/domestic', name: 'Domestic', component: () => import('@/views/Domestic.vue') },
  { path: '/exhibition/:id', name: 'ExhibitionDetail', component: () => import('@/views/ExhibitionDetail.vue') },

  { path: '/news', name: 'News', component: () => import('@/views/News.vue') },
  { path: '/news/:id', name: 'NewsDetail', component: () => import('@/views/NewsDetail.vue') },
  { path: '/contact', name: 'Contact', component: () => import('@/views/Contact.vue') },
  { path: '/admin/login', name: 'AdminLogin', component: () => import('@/admin/Login.vue') },
  { path: '/admin', name: 'AdminDashboard', component: () => import('@/admin/Dashboard.vue'), meta: { requiresAuth: true } },
  { path: '/admin/banners', name: 'AdminBanners', component: () => import('@/admin/Banners.vue'), meta: { requiresAuth: true } },
  { path: '/admin/exhibitions', name: 'AdminExhibitions', component: () => import('@/admin/Exhibitions.vue'), meta: { requiresAuth: true } },

  { path: '/admin/news', name: 'AdminNews', component: () => import('@/admin/NewsManage.vue'), meta: { requiresAuth: true } },
  { path: '/admin/contacts', name: 'AdminContacts', component: () => import('@/admin/Contacts.vue'), meta: { requiresAuth: true } },
  { path: '/admin/users', name: 'AdminUsers', component: () => import('@/admin/Users.vue'), meta: { requiresAuth: true } },
  { path: '/admin/settings', name: 'AdminSettings', component: () => import('@/admin/Settings.vue'), meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token')
    if (!token) return next('/admin/login')
  }
  next()
})

export default router
