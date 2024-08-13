// 属性管理模块接口
import request from '@/utils/request'
import type { CategoryResponseData, AttrResponseData, Attr } from './type'
enum API {
  // 获取一级分类接口地址
  C1_URL = '/admin/product/getCategory1', // {page}第几页 {limit} 每页几条数据
  // 获取二级分类接口地址
  C2_URL = '/admin/product/getCategory2/', // {category1Id} 一级分类的id
  // 获取三级分类接口地址
  C3_URL = '/admin/product/getCategory3/', // {category2Id} 二级分类的id

  // 获取对应分类下已有属性接口地址
  ATTR_URL = '/admin/product/attrInfoList/', // {category1Id}/{category2Id}/{category3Id}
  // 添加或修改属性接口地址
  ADD_OR_UPDATE_ATTR_URL = '/admin/product/saveAttrInfo',
  // 删除属性接口地址
  DELETE_ATTR_URL = '/admin/product/deleteAttr/', // {attrId}
}
// 获取属性分类的接口方法
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL)
export const reqC2 = (category1Id: number | string) =>
  request.get<any, CategoryResponseData>(`${API.C2_URL}${category1Id}`)
export const reqC3 = (category2Id: number | string) =>
  request.get<any, CategoryResponseData>(`${API.C3_URL}${category2Id}`)

// 获取三级分类下已有属性接口方法
export const reqAttr = (
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string,
) =>
  request.get<any, AttrResponseData>(
    `${API.ATTR_URL}${category1Id}/${category2Id}/${category3Id}`,
  )
// 添加或修改属性的接口方法
export const reqAddOrUpdateAttr = (data: Attr) =>
  request.post<any, any>(API.ADD_OR_UPDATE_ATTR_URL, data)
// 删除属性的接口方法
export const reqDeleteAttr = (attrId: number) =>
  request.delete<any, any>(`${API.DELETE_ATTR_URL}${attrId}`)
