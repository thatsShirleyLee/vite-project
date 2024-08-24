export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface Role {
  id?: number
  createTime?: string
  updateTime?: string
  roleName?: string
  remark?: null
}
export type RoleList = Role[]
export interface RoleListResponseData extends ResponseData {
  data: {
    records: RoleList
    countId: null
    current: number
    hitCount: boolean
    maxLimit: null
    optimizeCountSql: boolean
    orders: []
    pages: number
    searchCount: boolean
    size: number
    total: number
  }
}
export interface Menu {
  children?: MenuList
  code: string
  createTime: string
  id: number
  level: number
  name: string
  pid: number
  select: boolean
  status: null
  toCode: string
  type: number
  updateTime: string
}
export type MenuList = Menu[]
export interface MenuListResponseData extends ResponseData {
  data: MenuList
}
