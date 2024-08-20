import request from '@/utils/request'
import { Role, RoleListResponseData, MenuListResponseData } from './type'
enum API {
  ROLE_LIST_URL = '/admin/acl/role/', // get | {page}/{limit}
  ADD_ROLE_URL = '/admin/acl/role/save', // post | data:role
  UPDATE_ROLE_URL = '/admin/acl/role/update', // pus | data: role
  DELETE_ROLE_URL = '/admin/acl/role/remove/', // delete | {id}
  MENU_LIST_URL = '/admin/acl/permission/toAssign/', // get
  SET_PERMISSON_URL = '/admin/acl/permission/doAssign/', // post
}
export const reqRoleList = (page: number, limit: number, roleName: string) =>
  request.get<any, RoleListResponseData>(
    `${API.ROLE_LIST_URL}${page}/${limit}`,
    { params: { roleName } },
  )
export const reqAddOrUpdateRole = (role: Role) => {
  if (role.id) {
    return request.put<any, any>(API.UPDATE_ROLE_URL, role)
  } else {
    return request.post<any, any>(API.ADD_ROLE_URL, role)
  }
}
export const reqMenuList = (roleId: numbe) =>
  request.get<any, MenuListResponseData>(`${API.MENU_LIST_URL}/${roleId}`)
export const reqSetPermisstion = (roleId: number, permissionId: number[]) =>
  request.post<any, any>(
    `${API.SET_PERMISSON_URL}?roleId=${roleId}&permissionId=${permissionId}`,
  )
export const reqRemoveRole = (id: number) =>
  request.delete<any, any>(`${API.DELETE_ROLE_URL}${id}`)
