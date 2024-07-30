// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin } from '@/api/user/user'
// 引入数据类型
import type { loginForm } from '@/api/user/type'

// 创建用户小仓库
const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: localStorage.getItem('TOKEN'), // 用户的唯一标识
    }
  },
  actions: {
    async userLogin(data: loginForm) {
      const result: any = await reqLogin(data) // 登录请求
      if (result.code === 200) {
        this.token = result.data.token // 将token存储到仓库中
        localStorage.setItem('TOKEN', result.data.token) //本地存储持久化存储一份
        // 保证当前async函数返回一个成功的promise对象
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
})

export default useUserStore
