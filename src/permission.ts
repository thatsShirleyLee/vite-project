import router from '@/router'
//@ts-ignore
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })
//获取用户相关的小仓库内部token数据,去判断用户是否登录成功
import { useUserStore } from '@/store/modules/user'
import setting from '@/setting'
import { ref } from 'vue'
// 定义标识，记录是否需要添加路由
const hasRoles = ref(true)

// 全局守卫:项目当中任意路由切换都会触发的钩子
// 全局前置守卫
router.beforeEach(async (to: any, _from: any, next: any) => {
  document.title = `${setting.title} - ${to.meta.title}` // 浏览器标签页标题
  /*
   * to: 你将要访问那个路由
   * from: 你从哪个路由而来
   * next: 路由的放行函数
   */
  const userStore = useUserStore()
  // 获取token
  const token = userStore.token
  // 获取用户名字
  let username = userStore.username
  // 用户登录判断
  if (token) {
    // 登录成功,访问login,不能访问,指向首页
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 这里每次切换路由都把username设为空，保证每次都要发请求获取用户信息，可防止token失效
      username = ''
      // 登录成功访问其余六个路由(登录排除)
      // 有用户信息
      if (username) {
        // 放行
        next()
      } else {
        // 如果没有用户信息,在守卫这里发请求获取到了用户信息再放行
        try {
          /* 万一:刷新的时候是异步路由,有可能获取到用户信息、异步路由还没有加载完毕,出现空白的效果
           * 这里如果切换账号登录，动态路由加载会出现问题，所以在登录的login中又强制页面刷新了一次，* 解决动态路由加载出错的问题
           * 具体参考src\views\login\index.vue(63-65行)
           */
          console.log('添加前router', router.getRoutes())
          if (hasRoles.value) {
            console.log('@@@@@@@@修改前hasRoles', hasRoles.value)
            // 获取用户信息，动态加载路由
            await userStore.userInfo()
            console.log('添加后router', router.getRoutes())
            hasRoles.value = false
            // 确保路由已经加载完毕，再放行
            next(to.path) // 会重新执行一次路由导航，进入else语句
          } else {
            console.log('@@@@@@@@修改后hasRoles', hasRoles.value)
            next()
          }
        } catch (error) {
          // token过期:获取不到用户信息了
          // 用户手动修改本地存储token
          // 退出登录->用户相关的数据清空
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    // 用户未登录判断
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } }) // 访问默认路由/home，未登录时直接执行该行代码，跳转到登录页，登录成功后跳转到/home
    }
  }
  nprogress.start()
})
//全局后置守卫
router.afterEach((_to: any, _from: any) => {
  nprogress.done()
})
// 第一个问题：任意路由切换实现进度条业务 -- nprogress
// 第二个问题：路由鉴权（路由组件访问权限的设置）
// 全部7个路由组件：登录｜404｜任意路由｜首页｜数据大屏｜权限管理（三个子路由）｜商品管理（四个子路由）

/*
 * 用户未登录：可以访问login，其余6个路由不可以访问（指向login）
 * 用户登录成功：不可以访问login(指向home)，其余6个路由可以访问
 */
