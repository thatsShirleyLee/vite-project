import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'

// 对外暴露常量路由
export const constantRoute = [
  {
    // 登录
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录', // 菜单标题
      hidden: true, // 路由的标题在菜单中是否隐藏
      icon: 'Promotion', //菜单文字左侧的图标,支持element-plus全部图标
    },
  },
  {
    // 登录成功后展示数据的路由
    path: '/',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: 'layout',
      hidden: false,
      icon: 'Avatar',
    },
    redirect: '/home', // 默认跳转路由
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
  {
    // 404
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
      hidden: false,
      icon: 'DocumentDelete',
    },
  },
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
// 对外暴露动态(异步)路由
export const asyncRoute = [
  {
    path: '/acl',
    name: 'acl',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '权限管理',
      icon: 'Lock',
    },
    redirect: '/acl/user',
    children: [
      {
        path: '/acl/user',
        name: 'user',
        component: () => import('@/views/acl/user/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'User',
        },
      },
      {
        path: '/acl/role',
        name: 'role',
        component: () => import('@/views/acl/role/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'UserFilled',
        },
      },
      {
        path: '/acl/permission',
        name: 'permission',
        component: () => import('@/views/acl/user/index.vue'),
        meta: {
          title: '菜单管理',
          icon: 'Monitor',
        },
      },
    ],
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '商品管理',
      icon: 'Goods',
    },
    children: [
      {
        path: '/product/trademark',
        name: 'trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        meta: {
          title: '品牌管理',
          icon: 'ShoppingCartFull',
        },
      },
      {
        path: '/product/attr',
        name: 'attr',
        component: () => import('@/views/product/attr/index.vue'),
        meta: {
          title: '属性管理',
          icon: 'ChromeFilled',
        },
      },
      {
        path: '/product/spu',
        name: 'spu', // 商品spu管理
        component: () => import('@/views/product/spu/index.vue'),
        meta: {
          title: 'SPU管理',
          icon: 'Calendar',
        },
      },
      {
        path: '/product/sku',
        name: 'sku', // 商品sku管理
        component: () => import('@/views/product/sku/index.vue'),
        meta: {
          title: 'SKU管理',
          icon: 'Orange',
        },
      },
    ],
  },
]
