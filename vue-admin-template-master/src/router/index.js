import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
 
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  }, 
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: { title: 'home', icon: 'home' }
    }]
  },
  {
    path: '/user',
    component: Layout,
    name: 'user',
    meta: { title: '用户管理', icon: 'user' },
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/userCategory/user/UserLists'),
        meta: { title: '用户列表', icon: 'user' }
      }, 
      {
        path: '/add/user',
        name: '/add/user',
        component: () => import('@/views/userCategory/user/AddUser'), 
        meta: { title: '添加用户', icon: 'user' },
        hidden: true
      },
      {
        path: '/edit/user',
        name: '/edit/user',
        component: () => import('@/views/userCategory/user/EditUser'), 
        meta: { title: '用户修改', icon: 'user' },
        hidden: true
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/userCategory/role/RoleLists'),
        meta: { title: '角色列表', icon: 'user' }
      }, 
      {
        path: 'add/role', 
        name: 'add/role',
        component: () => import('@/views/userCategory/role/AddRole'),
        meta: { title: '添加角色' },
        hidden: true
      }, 
      {
        path: 'edit/role', 
        name: 'edit/role',
        component: () => import('@/views/userCategory/role/EditRole'),
        meta: { title: '编辑角色权限' },
        hidden: true
      }, 
      {
        path: 'auth',
        name: 'auth',
        component: () => import('@/views/userCategory/auth/AuthLists'), 
        meta: { title: '权限管理', icon: 'user' },
      },
      {
        path: '/add/auth',
        name: '/add/auth',
        component: () => import('@/views/userCategory/auth/AddAuth'), 
        meta: { title: '添加权限' },
        hidden: true
      },
      {
        path: '/edit/auth',
        name: '/edit/auth',
        component: () => import('@/views/userCategory/auth/EditAuth'), 
        meta: { title: '编辑权限' },
        hidden: true
      }
    ]
  }, 
  
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
