export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
export interface Attr {
  attrId: number | string //平台属性的ID
  valueId: number | string //属性值的ID
}
export interface saleArr {
  saleAttrId: number | string //属性ID
  saleAttrValueId: number | string //属性值的ID
}
export interface Sku {
  id?: string | number
  spuId: string | number // 已有的SPU的ID
  price: string | number // sku价格
  skuName: string // sku名字
  skuDesc: string // sku的描述
  weight: string | number // sku重量
  tmId: string | number // SPU品牌的ID
  category3Id: string | number // 三级分类的ID
  skuDefaultImg: string // sku图片地址
  isSale?: number
  // skuImageList?:
  skuAttrValueList?: Attr[]
  skuSaleAttrValueList?: saleArr[]
}
export type SkuList = Sku[]
export interface SkuResponseData extends ResponseData {
  data: {
    records: SkuList
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
export interface SkuInfoData extends ResponseData {
  data: Sku
}
