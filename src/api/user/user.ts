// 统一管理项目用户相关的接口
import request from '@/utils/request'
import type { loginForm, loginResponseData, userInfoResponseData } from './type'
// 统一管理接口
enum API {
  LOGIN_URL = '/user/login',
  USERINFOR_URL = '/user/info',
}
// 暴露请求函数

// 登录接口方法
export const reqLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data) // loginResponseData example{ code: 200, data: { token } }
// 获取用户信息接口方法
export const reqUserInfo = () =>
  request.get<any, userInfoResponseData>(API.USERINFOR_URL) // userInfoResponseData example { code: 200, data: { checkUser } }
