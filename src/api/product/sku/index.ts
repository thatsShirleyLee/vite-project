// sku管理模块接口
import request from '@/utils/request'
import { SkuResponseData, SkuInfoData, Sku } from '.type'
enum API {
  SKU_LIST = '/admin/product/list/', // {page}/{limit}
  SKU_INFO = '/admin/product/getSkuInfo/', // {skuId}
  UPDATE_SKU = '/admin/product/updateSkuInfo', // post
  REMOVE_SKU = '/admin/product/deleteSku/', // {skuId} delete
  ON_SALE_SKU = '/admin/product/onSale/', // {skuId} get
  CANCEL_SALE_SKU = '/admin/product/cancelSale/', // {skuId} get
}
export const reqAllSkuList = (page: number, limit: number) =>
  request.get<any, SkuResponseData>(`${API.SKU_LIST}${page}/${limit}`)
export const reqSkuInfo = (skuId: number) =>
  request.get<any, SkuInfoData>(`${API.SKU_INFO}${skuId}`)
export const updateSkuInfo = (skuInfo: Sku) =>
  request.post<any, any>(API.UPDATE_SKU, skuInfo)
export const removeSkuInfo = (skuId: number) =>
  request.delete<any, any>(`${API.REMOVE_SKU}${skuId}`)
export const onSaleSku = (skuId: number) =>
  request.get<any, any>(`${API.ON_SALE_SKU}${skuId}`)
export const cancelSaleSku = (skuId: number) =>
  request.get<any, any>(`${API.CANCEL_SALE_SKU}${skuId}`)
