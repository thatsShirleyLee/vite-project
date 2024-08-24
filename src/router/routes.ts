import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'

// 静态路由
export const constantRoute = [
  // login | 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录', // 菜单标题
      hidden: true, // 路由的标题在菜单中是否隐藏
      icon: 'Promotion', // 菜单文字左侧的图标,支持element-plus全部图标
    },
  },
  // layout | 登录成功后展示数据的路由
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '',
      hidden: false,
      icon: 'Avatar',
    },
    redirect: '/home', // 默认跳转路由
    // home | 首页
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  // 404 | 404页面
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
      hidden: true,
      icon: 'DocumentDelete',
    },
  },
  // screen | 数据大屏
  {
    path: '/screen',
    name: 'Screen',
    component: () => import('@/views/screen/index.vue'),
    meta: {
      hidden: false,
      title: '数据大屏',
      icon: 'Platform',
    },
  },
]
// 动态路由
export const asyncRoute = [
  // acl ｜ 权限管理
  {
    path: '/acl',
    name: 'Acl',
    component: () => import('@/layout/index.vue'),
    meta: {
      hidden: false,
      title: '权限管理',
      icon: 'Lock',
    },
    redirect: '/acl/user',
    children: [
      // user | 用户管理
      {
        path: '/acl/user',
        name: 'User',
        component: () => import('@/views/acl/user/index.vue'),
        meta: {
          hidden: false,
          title: '用户管理',
          icon: 'User',
        },
      },
      // role | 角色管理
      {
        path: '/acl/role',
        name: 'Role',
        component: () => import('@/views/acl/role/index.vue'),
        meta: {
          hidden: false,
          title: '角色管理',
          icon: 'UserFilled',
        },
      },
      // permission | 菜单管理
      {
        path: '/acl/permission',
        name: 'Permission',
        component: () => import('@/views/acl/permission/index.vue'),
        meta: {
          hidden: false,
          title: '菜单管理',
          icon: 'Monitor',
        },
      },
    ],
  },
  // product | 商品管理
  {
    path: '/product',
    name: 'Product',
    component: () => import('@/layout/index.vue'),
    meta: {
      hidden: false,
      title: '商品管理',
      icon: 'Goods',
    },
    redirect: '/product/trademark',
    children: [
      // trademark | 品牌管理
      {
        path: '/product/trademark',
        name: 'Trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        meta: {
          hidden: false,
          title: '品牌管理',
          icon: 'ShoppingCartFull',
        },
      },
      // attr | 属性管理
      {
        path: '/product/attr',
        name: 'Attr',
        component: () => import('@/views/product/attr/index.vue'),
        meta: {
          hidden: false,
          title: '属性管理',
          icon: 'ChromeFilled',
        },
      },
      // spu | 商品spu管理
      {
        path: '/product/spu',
        name: 'Spu', // 商品spu管理
        component: () => import('@/views/product/spu/index.vue'),
        meta: {
          hidden: false,
          title: 'SPU管理',
          icon: 'Calendar',
        },
      },
      // sku | 商品sku管理
      {
        path: '/product/sku',
        name: 'Sku', // 商品sku管理
        component: () => import('@/views/product/sku/index.vue'),
        meta: {
          hidden: false,
          title: 'SKU管理',
          icon: 'Orange',
        },
      },
    ],
  },
]
// 任意路由
export const anyRoute = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      hidden: true,
      title: '任意路由',
      icon: 'DataLine',
    },
  },
]
/* 路由分析
 * 菜单的权限：
 * - 超级管理员：admin 111111 (拥有全部的菜单、按钮的权限)
 * - 普通用户：normalUser 111111 (可由超级管理员分配用户权限， 不包含权限管理模块，按钮的权限并非全部按钮)
 * 同一个平台，不同人（职位不一样，能访问到的菜单、按钮权限不一样）
 *
 * 1. 整个项目总共有多少个路由？
 * login(登录页面）
 * 404（404页面，一级路由）
 * screen(数据大屏)
 * home（首页）
 * acl（权限管理，三个子路由）
 * product（商品管理，四个子路由）
 *
 * 2. 开发菜单权限
 *    第一步：拆分路由
 *      - 静态路由/常量路由：不需要权限的路由，比如：404、login、screen、home
 *      - 动态路由/异步路由：需要权限的路由，比如：acl、product
 *      - 任意路由：任意路由
 * 3. 菜单权限开发思路
 *    - 菜单权限：菜单的权限，菜单的显示与隐藏
 */
