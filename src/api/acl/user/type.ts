export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
export interface User {
  id?: number
  createTime?: string
  updateTime?: string
  username?: string
  password?: string
  name?: string
  phone: null
  roleName: string
}
export type UserList = User[]
export interface UserListResponseData extends ResponseData {
  data: {
    records: UserList
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}
export interface Role {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark: null
}
export type RoleList = Role[]
export interface RoleListResponseData extends ResponseData {
  data: {
    assignRoles: RoleList
    allRolesList: RoleList
  }
}
// 给用户分配职位接口携带参数的ts类型
export interface SetRoleData {
  roleIdList: number[]
  userId: number
}
