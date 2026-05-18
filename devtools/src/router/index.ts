import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('@/pages/Home.vue') },
    { path: '/tool/:slug', name: 'tool', component: () => import('@/pages/ToolDetail.vue') },
    { path: '/about', name: 'about', component: () => import('@/pages/About.vue') },
    { path: '/contact', name: 'contact', component: () => import('@/pages/Contact.vue') },
    { path: '/privacy-policy', name: 'privacy', component: () => import('@/pages/Privacy.vue') },
    { path: '/terms', name: 'terms', component: () => import('@/pages/Terms.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior() { return { top: 0 } },
})

export default router
