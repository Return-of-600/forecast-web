import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/dashboard/DashboardView.vue'
          ),
      },
      // {
      //   path: '/base',
      //   name: 'Base',
      //   component: {
      //     render() {
      //       return h(resolveComponent('router-view'))
      //     },
      //   },
      //   redirect: '/base/breadcrumbs',
      //   children: [
      //   ]
      // },
      // {
      //   path: '/buttons',
      //   name: 'Buttons',
      //   component: {
      //     render() {
      //       return h(resolveComponent('router-view'))
      //     },
      //   },
      //   redirect: '/buttons/standard-buttons',
      //   children: [
      //   ],
      // },
      // {
      //   path: '/forms',
      //   name: 'Forms',
      //   component: {
      //     render() {
      //       return h(resolveComponent('router-view'))
      //     },
      //   },
      //   redirect: '/forms/form-control',
      //   children: [
      //   ],
      // },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/LoginView'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/login/RegisterView'),
  },
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/pages/default/Page404'),
      },
      {
        path: '500',
        name: 'Page500',
        component: () => import('@/views/pages/default/Page500'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
