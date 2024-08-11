// 定义user仓库数据state的类型
import type { RouteRecordRaw } from 'vue-router'

export interface UserState {
  token: string | null
  username: string
  avatar: string
  menuRoutes: RouteRecordRaw[]
}
