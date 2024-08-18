import request from '@/utils/request'
import {
  User,
  UserListResponseData,
  RoleListResponseData,
  SetRoleData,
} from './type'
enum API {
  USER_LIST = '/admin/acl/user/', // {page}/{limit}
  ADD_USER_URL = '/admin/acl/user/save',
  UPDATE_USER_URL = '/admin/acl/user/update',
  DELETE_USER_URL = '/admin/acl/user/remove/', // {id}
  ROLES_LIST = '/admin/acl/user/toAssign/', // {adminId}
  ASSIGN_ROLE_URL = '/admin/acl/user/doAssignRole',
  REMOVE_BATCH_USER_URL = '/admin/acl/user/batchRemove',
}
export const reqUserList = (page: number, limit: number, username: string) =>
  request.get<any, UserListResponseData>(
    `${API.USER_LIST}${page}/${limit}?username=${username}`,
  )
export const reqAddOrUpdateUser = (data: User) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_USER_URL, data)
  } else {
    return request.post<any, any>(API.ADD_USER_URL, data)
  }
}
export const removeUserData = (id: number) =>
  request.delete<any, any>(`${API.DELETE_USER_URL}${id}`)
export const reqRolesList = (adminId: number) =>
  request.get<any, RoleListResponseData>(`${API.ROLES_LIST}${adminId}`)
export const reqSetUserRole = (data: SetRoleData) =>
  request.post<any, any>(API.ASSIGN_ROLE_URL, data)
export const removeBatchUserData = (idList: number[]) =>
  request.delete<any, any>(API.REMOVE_BATCH_USER_URL, { data: idList })
