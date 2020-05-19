import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
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
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/family/list'
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/password',
    hidden: true,
    children: [
      {
        path: 'password',
        component: () => import('@/views/profile/password'),
        name: 'Profile',
        meta: { title: '修改密码', icon: 'user', noCache: true }
      },
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/family',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '家族管理',
      icon: 'user',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/family/list'),
        name: 'Dashboard',
        meta: { title: '家族列表', affix: false, roles: ['admin'] }
      },
      {
        path: 'create',
        component: () => import('@/views/family/create'),
        name: 'familyCreate',
        meta: { title: '家族创建', noCache: true, roles: ['admin'] },
        hidden: true
      },
      {
        path: 'detail',
        component: () => import('@/views/family/detail'),
        name: 'familyDetail',
        meta: { title: '家族编辑', noCache: true, roles: ['admin'] },
        hidden: true
      },
      {
        path: 'baseInfo',
        component: () => import('@/views/family/baseInfo'),
        name: 'familyBaseInfo',
        meta: { title: '家族基本信息', noCache: true, roles: ['admin'] },
        hidden: true
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '用户管理',
      icon: 'wechat',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/user/list'),
        name: 'userList',
        meta: { title: '用户列表', noCache: true, roles: ['admin'] }
      },
      {
        path: 'committee',
        component: () => import('@/views/user/committee'),
        name: 'userCommittee',
        meta: { title: '家族委员', noCache: true, roles: ['admin'] }
      }
    ]
  },
  {
    path: '/family',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '家族资料',
      icon: 'tree',
      roles: ['sAdmin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'baseInfo',
        component: () => import('@/views/family/baseInfo'),
        name: 'Dashboard',
        meta: { title: '家族基本信息', affix: false, roles: ['sAdmin'] }
      },
      {
        path: 'article',
        component: () => import('@/views/family-article/list'),
        name: 'familyArticleList',
        meta: { title: '家族谱文', noCache: true, roles: ['sAdmin'] }
      },
      {
        path: 'article/detail',
        component: () => import('@/views/family-article/detail'),
        name: 'familyArticleDetail',
        meta: { title: '修改谱文', noCache: true, roles: ['sAdmin'] },
        hidden: true
      },
      {
        path: 'article/create',
        component: () => import('@/views/family-article/create'),
        name: 'familyArticleCreate',
        meta: { title: '添加谱文', noCache: true, roles: ['sAdmin'] },
        hidden: true
      }
    ]
  },
  {
    path: '/advert',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '广告管理',
      icon: 'guide',
      roles: ['sAdmin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/advert/list'),
        name: 'advertList',
        meta: { title: '广告列表', noCache: true, roles: ['sAdmin'] }
      },
      {
        path: 'create',
        component: () => import('@/views/advert/create'),
        name: 'advertCreate',
        meta: { title: '添加广告', noCache: true, roles: ['sAdmin'] },
        hidden: true
      },
      {
        path: 'detail',
        component: () => import('@/views/advert/detail'),
        name: 'advertDetail',
        meta: { title: '编辑广告', noCache: true, roles: ['sAdmin'] },
        hidden: true
      },
      {
        path: 'article/list',
        component: () => import('@/views/article/list'),
        name: 'articleList',
        meta: { title: '广告文章', noCache: true, roles: ['sAdmin'] }
      },
      {
        path: 'article/create',
        component: () => import('@/views/article/create'),
        name: 'articleCreate',
        meta: { title: '添加文章', noCache: true, roles: ['sAdmin'] },
        hidden: true
      },
      {
        path: 'article/detail',
        component: () => import('@/views/article/detail'),
        name: 'articleDetail',
        meta: { title: '编辑文章', noCache: true, roles: ['sAdmin'] },
        hidden: true
      }
    ]
  },
  {
    path: '/family-tree',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '家谱管理',
      icon: 'education',
      roles: ['sAdmin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/family-tree/list'),
        name: 'familyTreeList',
        meta: { title: '家谱列表', noCache: true, roles: ['sAdmin'] }
      },
      {
        path: 'create',
        component: () => import('@/views/family-tree/create'),
        name: 'familyTreeCreate',
        meta: { title: '添加家谱', noCache: true, roles: ['sAdmin'] },
        hidden: true
      },
      {
        path: 'detail',
        component: () => import('@/views/family-tree/detail'),
        name: 'familyTreeDetail',
        meta: { title: '编辑家谱', noCache: true, roles: ['sAdmin'] },
        hidden: true
      },
      {
        path: 'book',
        component: () => import('@/views/family-tree-book/list'),
        name: 'familyTreeBook',
        meta: { title: '家谱分册', noCache: true, roles: ['sAdmin'] },
        hidden: true
      },
      {
        path: 'book/img',
        component: () => import('@/views/family-tree-book-img/list'),
        name: 'familyTreeBookImg',
        meta: { title: '家谱分册图片', noCache: true, roles: ['sAdmin'] },
        hidden: true
      }
    ]
  },
  {
    path: '/member',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '家谱成员',
      icon: 'peoples',
      roles: ['sAdmin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/member/list'),
        name: 'memberList',
        meta: { title: '成员列表', noCache: true, roles: ['sAdmin'] }
      },
      {
        path: 'committee',
        component: () => import('@/views/member/committee'),
        name: 'memberCommittee',
        meta: { title: '家族委员', noCache: true, roles: ['sAdmin'] }
      },
      {
        path: 'audit',
        component: () => import('@/views/member/audit'),
        name: 'memberAudit',
        meta: { title: '审核绑定', noCache: true, roles: ['sAdmin'] }
      },
      {
        path: 'info',
        component: () => import('@/views/member/info'),
        name: 'info',
        meta: { title: '家族成员', noCache: true, roles: ['sAdmin'] },
        hidden: true
      }
    ]
  },
  {
    path: '/feedback',
    component: Layout,
    alwaysShow: true,
    meta: {
      title: '问题反馈',
      icon: 'message',
      roles: ['sAdmin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/feedback/list'),
        name: 'feedbackList',
        meta: { title: '问题列表', noCache: true, roles: ['sAdmin'] }
      },
      {
        path: 'detail',
        component: () => import('@/views/feedback/detail'),
        name: 'feedbackDetail',
        meta: { title: '问题详细', noCache: true, roles: ['sAdmin'] },
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

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router