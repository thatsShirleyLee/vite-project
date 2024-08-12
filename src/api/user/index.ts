// 统一管理项目用户相关的接口
import request from '@/utils/request'
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from './type'
// 统一管理接口
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFOR_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}
// 暴露请求函数

// 登录接口方法
export const reqLogin = (data: loginFormData) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)
// 获取用户信息接口方法
export const reqUserInfo = () =>
  request.get<any, userInfoResponseData>(API.USERINFOR_URL)
// 退出接口方法
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
