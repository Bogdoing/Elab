// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/About/About.vue'),
      },
      {
        path: '/history',
        name: 'history',
        component: () => import('@/views/About/TabHistory.vue'),
      },
      {
        path: '/course',
        name: 'course',
        component: () => import('@/views/Course.vue'),
      },
      {
        path: '/account',
        name: 'account',
        component: () => import('@/views/Account/Account.vue'),
      },
      {
        path: '/accountrep',
        name: 'accountrep',
        component: () => import('@/views/Account/AccountRep.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
