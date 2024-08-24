// SPU管理模块接口
import request from '@/utils/request'
import type {
  SpuListResponseData,
  AllTradeMark,
  SpuImageList,
  AllSaleAttr,
  SpuSaleAttrList,
  Spu,
  Sku,
  SkuListResponseData,
} from './type'
enum API {
  SPU_LIST_URL = '/admin/product/', // {page}/{limit}?[可选参数, eg: category3Id]
  // 获取全部品牌的数据
  ALL_TRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  // 获取某个SPU下的全部的售卖商品的图片数据
  IMAGE_URL = '/admin/product/spuImageList/', // {spuId}
  // 获取整个项目全部的销售属性[颜色、版本、尺码]
  ALL_SALE_ATTR_URL = '/admin/product/baseSaleAttrList',
  // 获取某一个SPU下全部的已有的销售属性接口地址
  SPU_SALE_ATTR_URL = '/admin/product/spuSaleAttrList/', // {spuId}
  // 追加一个新的SPU
  ADD_SPU_URL = '/admin/product/saveSpuInfo',
  // 更新已有的SPU
  UPDATE_SPU_URL = '/admin/product/updateSpuInfo',
  // 删除SPU
  DETELE_SPU_URL = '/admin/product/deleteSpu/', // {spuId}
  // 获取某一个SPU下全部的SKU列表
  SKU_LIST_URL = '/admin/product/findBySpuId/', // {spuId}
  // 添加一个SKU
  ADD_SKU_URL = '/admin/product/saveSkuInfo',
}
export const reqSpuList = (
  page: number,
  limit: number,
  category3Id: string | number,
) =>
  request.get<any, SpuListResponseData>(
    `${API.SPU_LIST_URL}${page}/${limit}?category3Id=${category3Id}`,
  )

// 获取全部的SPU的品牌的数据
export const reqAllTradeMark = () =>
  request.get<any, AllTradeMark>(API.ALL_TRADEMARK_URL)
// 获取某一个已有的SPU下全部商品的图片地址
export const reqSpuImageList = (spuId: number) =>
  request.get<any, SpuImageList>(`${API.IMAGE_URL}${spuId}`)
// 获取全部的销售属性
export const reqAllSaleAttr = () =>
  request.get<any, AllSaleAttr>(API.ALL_SALE_ATTR_URL)
// 获取某一个已有的SPU拥有多少个销售属性
export const reqSpuSaleAttrList = (spuId: number) =>
  request.get<any, SpuSaleAttrList>(`${API.SPU_SALE_ATTR_URL}${spuId}`)
// 添加SPU或者修改SPU
export const reqAddOrUpdateSpu = (data: Spu) => {
  //如果SPU对象拥有ID,更新已有的SPU
  if (data.id) {
    return request.post<any, any>(API.UPDATE_SPU_URL, data)
  } else {
    return request.post<any, any>(API.ADD_SPU_URL, data)
  }
}
// 删除SPU
export const reqRemoveSpu = (spuId: string | number) =>
  request.delete<any, any>(`${API.DETELE_SPU_URL}${spuId}`)
// 获取SKU列表
export const reqSkuList = (spuId: string | number) =>
  request.get<any, SkuListResponseData>(`${API.SKU_LIST_URL}${spuId}`)
// 添加SKU
export const reqAddSku = (data: Sku) =>
  request.post<any, any>(API.ADD_SKU_URL, data)
