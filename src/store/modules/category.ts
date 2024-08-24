// 创建属性管理相关的小仓库
import { defineStore } from 'pinia'
// 引入接口
import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
import { ref } from 'vue'
import type { CategoryResponseData, CategoryObj } from '@/api/product/attr/type'

export const useCategoryStore = defineStore('category', () => {
  let c1Attr = ref<CategoryObj[]>([]) // 存储一级分类的数据
  let c1Id = ref<string | number>('') // 存储一级分类的Id

  let c2Attr = ref<CategoryObj[]>([]) // 存储二级分类的数据
  let c2Id = ref<string | number>('') // 存储二级分类的Id

  let c3Attr = ref<CategoryObj[]>([]) // 存储三级分类的数据
  let c3Id = ref<string | number>('') // 存储三级分类的Id

  // 获取一级分类的方法
  const getC1 = async () => {
    const res: CategoryResponseData = await reqC1()
    if (res.code === 200) {
      c1Attr.value = res.data
    }
  }
  // 获取二级分类的方法
  const getC2 = async () => {
    const res: CategoryResponseData = await reqC2(c1Id.value)
    if (res.code === 200) {
      c2Attr.value = res.data
    }
  }
  // 获取三级分类的方法
  const getC3 = async () => {
    const res: CategoryResponseData = await reqC3(c2Id.value)
    if (res.code === 200) {
      c3Attr.value = res.data
    }
  }
  return {
    c1Attr,
    c1Id,
    c2Attr,
    c2Id,
    c3Attr,
    c3Id,
    getC1,
    getC2,
    getC3,
  }
})
