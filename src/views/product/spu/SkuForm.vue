<script setup lang="ts">
defineOptions({
  name: 'SkuForm',
})
import type { AttrList, AttrResponseData } from '@/api/product/attr/type'
import { reqAttr } from '@/api/product/attr'

import type {
  SpuSaleAttrList,
  SpuSaleAttr,
  Spu,
  SpuImageList,
  SpuImage,
  Sku,
} from '@/api/product/spu/type'
import {
  reqSpuSaleAttrList,
  reqSpuImageList,
  reqAddSku,
} from '@/api/product/spu'
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
const emit = defineEmits(['changeScene'])
// 平台属性
let attrList = ref<AttrList>([])
// 销售属性
let saleList = ref<SpuSaleAttr[]>([])
// 照片的数据
let imgList = ref<SpuImage[]>([])
// 收集sku的参数
let skuParams = reactive<Sku>({
  // 父组件传递过来的数据
  category3Id: '', // 三级分类的ID
  spuId: '', // 已有的SPU的ID
  tmId: '', // SPU品牌的ID
  // v-model收集
  skuName: '', // sku名字
  price: '', // sku价格
  weight: '', // sku重量
  skuDesc: '', // sku的描述

  skuAttrValueList: [
    // 平台属性的收集
  ],
  skuSaleAttrValueList: [
    // 销售属性
  ],
  skuDefaultImg: '', // sku图片地址
})
const table = ref<any>()
const initAddSku = async (
  c1Id: number | string,
  c2Id: number | string,
  spu: Spu,
) => {
  // 收集父组件传递过来的数据
  skuParams.category3Id = spu.category3Id
  skuParams.spuId = spu.id
  skuParams.tmId = spu.tmId
  // 获取平台属性
  const res1: AttrResponseData = await reqAttr(
    c1Id,
    c2Id,
    skuParams.category3Id,
  )
  attrList.value = res1.data
  // 获取销售属性
  const res2: SpuSaleAttrList = await reqSpuSaleAttrList(skuParams.spuId)
  saleList.value = res2.data
  // 获取照片墙数据
  const res3: SpuImageList = await reqSpuImageList(spu.id)
  imgList.value = res3.data
}
// 设置默认
const handle = (row: any) => {
  // 勾选
  imgList.value.forEach((item: any) => {
    table.value.toggleRowSelection(item, false)
  })
  table.value.toggleRowSelection(row, true)
  // 收集图片地址
  skuParams.skuDefaultImg = row.imgUrl
}
const save = async () => {
  // 平台属性
  skuParams.skuAttrValueList = attrList.value.reduce((prev: any, next: any) => {
    if (next.attrIdAndValueId) {
      const [attrId, valueId] = next.attrIdAndValueId.split(':')
      prev.push({
        attrId,
        valueId,
      })
    }
    return prev
  }, [])
  // 销售属性
  skuParams.skuSaleAttrValueList = saleList.value.reduce(
    (prev: any, next: any) => {
      if (next.saleIdAndValueId) {
        const [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
        prev.push({
          saleAttrId,
          saleAttrValueId,
        })
      }
      return prev
    },
    [],
  )
  // 添加SKU的请求
  let res: any = await reqAddSku(skuParams)
  if (res.code == 200) {
    ElMessage.success('添加SKU成功')
    // 通知父组件切换场景为零
    emit('changeScene', { flag: 0, params: '' })
  } else {
    ElMessage.error('添加SKU失败')
  }
}
const cancel = () => {
  emit('changeScene', { flag: 0, params: '' })
}
defineExpose({ initAddSku })
</script>

<template>
  <el-form label-width="100px">
    <el-form-item label="SKU名称">
      <el-input placeholder="SKU名称" v-model="skuParams.skuName"></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input
        placeholder="价格(元)"
        type="number"
        v-model="skuParams.price"
      ></el-input>
    </el-form-item>
    <el-form-item label="重量(g)">
      <el-input
        placeholder="重量(g)"
        type="number"
        v-model="skuParams.weight"
      ></el-input>
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input
        placeholder="SKU描述"
        type="textarea"
        v-model="skuParams.skuDesc"
      ></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form :inline="true">
        <el-form-item
          v-for="item in attrList"
          :key="item.id"
          :label="item.attrName"
        >
          <el-select v-model="item.attrIdAndValueId">
            <el-option
              v-for="attrValue in item.attrValueList"
              :value="`${item.id}:${attrValue.id}`"
              :key="attrValue.id"
              :label="attrValue.valueName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form :inline="true">
        <el-form-item
          v-for="item in saleList"
          :key="item.id"
          :label="item.saleAttrName"
        >
          <el-select v-model="item.saleIdAndValueId">
            <el-option
              v-for="saleAttrValue in item.spuSaleAttrValueList"
              :key="saleAttrValue.id"
              :label="saleAttrValue.saleAttrValueName"
              :value="`${item.id}:${saleAttrValue.id}`"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border :data="imgList" ref="table">
        <el-table-column
          type="selection"
          width="80px"
          align="center"
        ></el-table-column>
        <el-table-column label="图片">
          <template #="{ row }">
            <img :src="row.imgUrl" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" @click="handle(row)">
              设置默认
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">
.el-select {
  width: 180px;
}
</style>
