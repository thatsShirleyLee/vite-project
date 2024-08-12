// 登录接口需要携带的参数的类型
export interface loginFormData {
  username: string
  password: string
}
// 全部接口返回数据都有的数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
// 登录接口返回的数据类型
export interface loginResponseData extends ResponseData {
  data: string
}
// 用户信息接口返回的数据类型
export interface userInfoResponseData extends ResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    avatar: string
    name: string
  }
}
