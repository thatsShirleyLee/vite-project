export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
export interface Spu {
  id?: number
  spuName: string
  description: string
  category3Id: string | number
  tmId: number
  spuSaleAttrList: null | SpuSaleAttr[]
  spuImageList: null | SpuImage[]
  spuPosterList: null
}
export type SpuList = Spu[]
export interface SpuListResponseData extends ResponseData {
  data: {
    records: SpuList
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
export interface Trademark {
  id: number
  tmName: string
  logoUrl: string
}
export interface AllTradeMark extends ResponseData {
  data: TradeMark[]
}

export interface SpuImage {
  id?: number
  imgName?: string
  imgUrl?: string
  createTime?: string
  updateTime?: string
  spuId?: number
  name?: string
  url?: string
}
export interface SpuImageList extends ResponseData {
  data: SpuImage[]
}

export interface SaleAttr {
  id: number
  name: string
}
export interface AllSaleAttr extends ResponseData {
  data: SaleAttr[]
}

export interface SpuSaleAttrValue {
  baseSaleAttrId?: string | number
  id?: number
  isChecked?: string
  createTime?: null
  updateTime?: null
  saleAttrName?: string
  saleAttrValueName: string
  spuId?: number
}
export type SpuSaleAttrValueList = SpuSaleAttrValue[]
// 销售属性对象
export interface SpuSaleAttr {
  baseSaleAttrId?: string | number
  id?: number
  createTime?: null
  updateTime?: null
  saleAttrName: string
  spuId?: number
  spuSaleAttrValueList: SpuSaleAttrValueList
  saleAttrValue?: string
  flag?: boolean
}
export interface SpuSaleAttrList extends ResponseData {
  data: SpuSaleAttr[]
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
export interface SkuListResponseData extends ResponseData {
  data: SkuList
}
