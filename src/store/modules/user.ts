// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin } from '@/api/user/user'
// 引入数据类型
import type { loginForm, loginResponseData } from '@/api/user/type'
import type { UserState } from './types/type'
// 引入操作本地存储的工具方法
import { GET_TOKEN, SET_TOKEN } from '@/utils/token'
// 引入路由
import { constantRoute } from '@/router/routes'

// 创建用户小仓库
const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(), // 用户的唯一标识
      menuRoutes: constantRoute, // 常量路由
    }
  },
  actions: {
    async userLogin(data: loginForm) {
      const result: loginResponseData = await reqLogin(data) // 登录请求
      if (result.code === 200) {
        this.token = result.data.token as string // 将token存储到仓库中
        SET_TOKEN(this.token as string) //本地存储持久化存储一份
        // 保证当前async函数返回一个成功的promise对象
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
})

export default useUserStore
