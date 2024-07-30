// 登录接口需要携带的参数的类型
export interface loginForm {
  username: string
  password: string
}
// 登录接口返回数据的类型
interface dataType {
  token?: string // 登录成功data的字段
  message?: string // 登录失败data的字段
}
export interface loginResponseData {
  code: number
  data: dataType
}
// 定义服务器返回用户信息相关的数据类型
interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}
interface user {
  checkUser: userInfo
}
export interface userInfoResponseData {
  code: number
  data: user
}
