<script setup lang="ts">
defineOptions({
  name: 'Sku',
})
import {
  reqAllSkuList,
  reqSkuInfo,
  updateSkuInfo,
  removeSkuInfo,
  onSaleSku,
  cancelSaleSku,
} from '@/api/product/sku'
import {
  Sku,
  SkuList,
  SkuResponseData,
  SkuInfoData,
} from '@/api/product/sku/type'
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
let skuList = ref<SkuList>([])
// 分页器
const page = ref<number>(1)
const limit = ref<number>(10)
const total = ref<number>(0)
// 控制抽屉盒的展示与隐藏
const drawer = ref<boolean>(false)
const skuInfo = ref<Sku>({})
onMounted(() => {
  getSkuList()
})
const getSkuList = async (pager = 1) => {
  page.value = pager
  const res: SkuResponseData = await reqAllSkuList(page.value, limit.value)
  if (res.code === 200) {
    skuList.value = res.data.records
    total.value = res.data.total
  }
}
const sizeChange = (limit: number) => {
  getSkuList()
}
const updateSale = async (row: Sku) => {
  if (row.isSale === 1) {
    await cancelSaleSku(row.id as number)
    ElMessage({
      type: 'success',
      message: '下架成功',
    })
    getSkuList(page.value)
  } else {
    await onSaleSku(row.id as number)
    ElMessage({
      type: 'success',
      message: '上架成功',
    })
    getSkuList(page.value)
  }
}
const updateSku = async () => {
  // await updateSkuInfo()
  ElMessage({ type: 'success', message: '程序员在努力的更新中(SPU已实现)....' })
}
const viewSku = async (row: Sku) => {
  drawer.value = true
  const res: SkuInfoData = await reqSkuInfo(row.id as number)
  if (res.code === 200) {
    skuInfo.value = res.data
  }
}
const removeSku = async (id: number) => {
  const res: any = await removeSkuInfo(id as number)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getSkuList(skuList.value.length > 1 ? page.value : page.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '系统数据不能删除',
    })
  }
}
</script>

<template>
  <el-card>
    <el-table border style="margin: 10px 0" :data="skuList">
      <el-table-column label="序号" type="index" width="80" align="center" />
      <el-table-column label="名称" prop="skuName" width="220px" />
      <el-table-column label="描述" prop="skuDesc" width="220px" />
      <el-table-column label="图片" width="150px">
        <template #default="{ row }">
          <img :src="row.skuDefaultImg" style="width: 100%; height: 100%" />
        </template>
      </el-table-column>
      <el-table-column
        label="重量"
        prop="weight"
        width="80px"
      ></el-table-column>
      <el-table-column label="价格" prop="price" width="80px"></el-table-column>
      <el-table-column label="操作">
        <template #="{ row }">
          <el-button
            :type="`${row.isSale === 1 ? 'info' : 'success'}`"
            :icon="`${row.isSale === 1 ? 'Bottom' : 'Top'}`"
            size="small"
            @click="updateSale(row)"
          >
            {{ row.isSale === 1 ? '下架' : '上架' }}
          </el-button>
          <el-button type="primary" icon="Edit" size="small" @click="updateSku">
            编辑
          </el-button>
          <el-button
            type="info"
            icon="InfoFilled"
            size="small"
            @click="viewSku(row)"
          >
            查看
          </el-button>
          <el-popconfirm
            :title="`你确定要删除${row.skuName}?`"
            width="200px"
            @confirm="removeSku(row.id)"
          >
            <template #reference>
              <el-button type="danger" icon="Delete" size="small">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="getSkuList"
      @size-change="sizeChange"
      v-model:current-page="page"
      v-model:page-size="limit"
      :page-sizes="[10, 20, 30, 40]"
      :total="total"
      background
      layout="prev, pager, next, jumper, ->, sizes, total"
    />
    <!-- 抽屉组件:展示商品详情 -->
    <el-drawer v-model="drawer">
      <template #header>
        <h4>查看商品详情</h4>
      </template>
      <template #default>
        <el-row>
          <el-col :span="6">名称</el-col>
          <el-col :span="18" style="line-height: 1.5">
            {{ skuInfo.skuName }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">描述</el-col>
          <el-col :span="18" style="line-height: 1.5">
            {{ skuInfo.skuDesc }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">价格</el-col>
          <el-col :span="18">
            {{ skuInfo.price }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag
              style="margin: 5px"
              v-for="item in skuInfo.skuAttrValueList"
              :key="item.id"
            >
              {{ item.valueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag
              style="margin: 5px"
              v-for="item in skuInfo.skuSaleAttrValueList"
              :key="item.id"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item
                v-for="item in skuInfo.skuImageList"
                :key="item.id"
              >
                <img :src="item.imgUrl" style="width: 100%; height: 100%" />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>

<style scoped lang="scss">
.el-row {
  margin-top: 10px;
  .el-col {
    font-size: 16px;
  }
}
</style>
