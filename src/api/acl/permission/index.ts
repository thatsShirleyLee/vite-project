import request from '@/utils/request'
import type { PermissionResponseData, MenuParams } from './type'
enum API {
  // 获取全部菜单与按钮的标识数据
  ALL_PERMISSION_URL = '/admin/acl/permission',
  ADD_PERMISSION_URL = '/admin/acl/permission/save',
  UPDATE_PERMISSION_URL = '/admin/acl/permission/update',
  DELETE_PERMISION_URL = '/admin/acl/permission/remove/',
}

// 获取菜单数据
export const reqAllPermission = () => {
  return request.get<any, PermissionResponseData>(API.ALL_PERMISSION_URL)
}

// 添加与更新菜单的方法
export const reqAddOrUpdateMenu = (data: MenuParams) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_PERMISSION_URL, data)
  } else {
    return request.post<any, any>(API.ADD_PERMISSION_URL, data)
  }
}

// 删除某一个已有的菜单
export const reqRemoveMenu = (id: number) =>
  request.delete<any, any>(`${API.DELETE_PERMISION_URL}${id}`)
