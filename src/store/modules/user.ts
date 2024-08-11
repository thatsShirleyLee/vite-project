import { ref } from 'vue'
// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user/user'
// 引入数据类型
import type {
  loginForm,
  loginResponseData,
  userInfoResponseData,
} from '@/api/user/type'
import type { UserState } from './types/type'
// 引入操作本地存储的工具方法
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
// 引入路由
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes'

//用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asnycRoute: any, routes: any) {
  return asnycRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        //硅谷333账号:product\trademark\attr\sku
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}

export const useUserStore = defineStore(
  'user',
  () => {
    let token = ref(GET_TOKEN() as string)
    let username = ref('') // 用户名
    let avatar = ref('') // 头像
    let buttons = ref([]) // 按钮
    let menuRoutes = ref(constantRoute) // 常量路由
    const userLogin = async (data: loginForm) => {
      const res: loginResponseData = await reqLogin(data) // 登录请求
      if (res.code === 200) {
        token.value = res.data.token as string // 将token存储到仓库中
        SET_TOKEN(token.value as string) //本地存储持久化存储一份
        // 保证当前async函数返回一个成功的promise对象
        return 'ok'
      } else {
        return Promise.reject(new Error(res.data.message))
      }
    }

    const userInfo = async () => {
      // 获取用户信息
      const res: userInfoResponseData = await reqUserInfo() // reqUserInfo请求的URL,要求request携带token,所以可以在请求拦截器中进行设置
      // 存储用户信息
      if (res.code === 200) {
        username.value = res.data.checkUser.username
        avatar.value = res.data.checkUser.avatar
        buttons.value = res.data.checkUser.buttons
        // 计算当前用户需要展示的异步路由
        // const userAsyncRoute = filterAsyncRoute(
        //   cloneDeep(asnycRoute),
        //   res.data.routes,
        // )
        // //菜单需要的数据整理完毕
        // menuRoutes = [...constantRoute, ...userAsyncRoute, ...anyRoute]
        // //目前路由器管理的只有常量路由:用户计算完毕异步路由、任意路由动态追加
        // ;[...userAsyncRoute, ...anyRoute].forEach((route: any) => {
        //   router.addRoute(route)
        // })
      } else {
        return Promise.reject(new Error(res.data.message))
      }
    }
    const userLogout = async () => {
      //退出登录请求
      token.value = ''
      username.value = ''
      avatar.value = ''
      REMOVE_TOKEN()
      /* const res: any = await reqLogout()
      if (res.code === 200) {
        //目前没有mock接口:退出登录接口(通知服务器本地用户唯一标识失效)
        token.value = ''
        username.value = ''
        avatar.value = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(res.message))
      } */
    }
    return {
      token,
      username,
      avatar,
      buttons,
      menuRoutes,
      userLogin,
      userInfo,
      userLogout,
    }
  }, // 持久化
  {
    persist: true,
  },
)
/* // 创建用户小仓库
export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(), // 用户的唯一标识
      menuRoutes: constantRoute, // 常量路由
    }
  },
  actions: {
    async userLogin(data: loginForm) {
      const res: loginResponseData = await reqLogin(data) // 登录请求
      if (res.code === 200) {
        this.token = res.data.token as string // 将token存储到仓库中
        SET_TOKEN(this.token as string) //本地存储持久化存储一份
        // 保证当前async函数返回一个成功的promise对象
        return 'ok'
      } else {
        return Promise.reject(new Error(res.data.message))
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
}) */
