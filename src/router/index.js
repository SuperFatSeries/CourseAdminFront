import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/courseinfo',
    component: Layout,
    redirect: '/courseinfo/notification',
    meta: {
      title: 'Courseinfo',
      icon: 'guide'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/courseinfo/notification'),
        name: 'Notification',
        meta: { title: 'notification', noCache: true }
      },
      {
        path: 'courseware',
        component: () => import('@/views/courseinfo/courseware'),
        name: 'Courseware',
        meta: { title: 'courseware', noCache: true }
      },
      {
        path: 'homework',
        component: () => import('@/views/courseinfo/homework'),
        name: 'Homeworl',
        meta: { title: 'homework', noCache: true }
      },
      {
        path: 'test',
        component: () => import('@/views/courseinfo/manage_ta'),
        name: 'Manage TA',
        meta: { title: 'ta', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/index',
    meta: {
      title: 'Admin',
      icon: 'user',
      roles: ['admin', 'teacher', 'ta']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/admin/manage_admin'),
        name: 'Manage Admin',
        meta: { title: 'admin', roles: ['admin'], noCache: true }
      },
      {
        path: 'institute',
        component: () => import('@/views/admin/institute'),
        name: 'Manage Institute',
        meta: { title: 'institute', roles: ['admin'], noCache: true }
      },
      {
        path: 'student',
        component: () => import('@/views/admin/student'),
        name: 'Manage Student',
        meta: { title: 'student', noCache: true }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
