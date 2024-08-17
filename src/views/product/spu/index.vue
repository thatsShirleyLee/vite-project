<script setup lang="ts">
defineOptions({
  name: 'Spu',
})
import Category from '@/components/Category/index.vue'
import { ref, watch, onBeforeUnmount } from 'vue'
import { useCategoryStore } from '@/store/modules/category'
import type {
  SpuListResponseData,
  SpuList,
  Spu,
  SkuListResponseData,
} from '@/api/product/spu/type'
import { reqSpuList, reqRemoveSpu, reqSkuList } from '@/api/product/spu'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import SpuForm from './SpuForm.vue'
import SkuForm from './SkuForm.vue'
const categoryStore = useCategoryStore()
const scene = ref<number>(0)
let spuList = ref<SpuList>([])
// 分页器
const page = ref<number>(1)
const limit = ref<number>(3)
const total = ref<number>(0)
// 获取子组件实例SpuForm
const spuForm = ref<any>()
// 获取子组件实例SkuForm
const skuForm = ref<any>()
// 存储Sku列表
let skuList = ref<any>([])
// 控制sku列表对话框展示与隐藏
let show = ref<boolean>(false)

// 监听仓库三级分类ID变化
watch(
  () => categoryStore.c3Id,
  () => {
    // 清空上一次查询的属性与属性值
    spuList.value = []
    // 保证三级分类得有才能发请求
    if (!categoryStore.c3Id) return
    //获取分类的ID
    getSpuList()
  },
)
// 获取SPU列表
const getSpuList = async (pager = 1) => {
  page.value = pager
  // 有c3Id后，通过接口传递page,limit获取，赋值给spuList和total, 展示table和分页器
  const res: SpuListResponseData = await reqSpuList(
    page.value,
    limit.value,
    categoryStore.c3Id,
  )
  if (res.code === 200) {
    spuList.value = res.data.records
    total.value = res.data.total
  }
}
const sizeChange = () => {
  getSpuList()
}
// 添加SPU
const addSpu = () => {
  // 调出子组件添加SPU的场景
  scene.value = 1
  // 点击添加SPU按钮,调用子组件的方法初始化数据
  spuForm.value.initAddSpu(categoryStore.c3Id)
}
// 修改SPU
const updateSpu = (row: Spu) => {
  // 调出子组件修改SPU的场景
  scene.value = 1
  // 调用子组件实例方法获取完整已有的SPU的数据
  spuForm.value.initSpuParams(row)
}
// 子组件取消事件的回调函数
const changeScene = (obj: any) => {
  scene.value = obj.flag
  if (obj.params === 'update') {
    // 更新留在当前页
    getSpuList(page.value)
  } else {
    // 添加回到第一页
    getSpuList() // 默认参数page=1
  }
}
// 删除SPU
const removeSpu = async (row: Spu) => {
  const res: any = await reqRemoveSpu(row.id)
  if (res.code === 200) {
    ElMessage.success('删除成功')
    // 获取剩余的SPU列表展示
    getSpuList(spuList.length > 1 ? page.value : page.value - 1)
  } else {
    ElMessage.error('删除失败')
  }
}
// 添加SKU
const addSku = (row: Spu) => {
  // 调出子组件添加SKU的场景
  scene.value = 2
  // 点击添加SKU按钮,调用子组件的方法初始化数据
  skuForm.value.initAddSku(categoryStore.c1Id, categoryStore.c2Id, row)
}
// 查看SKU列表
const viewSku = async (row: Spu) => {
  const res: SkuListResponseData = await reqSkuList(row.id as number)
  if (res.code === 200) {
    skuList.value = res.data
    // 对话框显示出来
    show.value = true
  }
}
// 路由组件销毁的时候，把仓库分类相关的数据清空
onBeforeUnmount(() => {
  //清空分类仓库的数据(因为这里使用的组合式API的写法，所以不能直接使用$reset()方法)
  categoryStore.c1Attr = []
  categoryStore.c1Id = ''
  categoryStore.c2Attr = []
  categoryStore.c2Id = ''
  categoryStore.c3Attr = []
  categoryStore.c3Id = ''
})
</script>

<template>
  <div>
    <Category :scene="scene" />
    <el-card style="margin: 10px 0">
      <!-- table -->
      <div v-show="scene === 0">
        <el-button
          icon="Plus"
          type="primary"
          :disabled="categoryStore.c3Id ? false : true"
          @click="addSpu"
        >
          添加SPU
        </el-button>
        <el-table border style="margin: 10px 0" :data="spuList">
          <el-table-column
            label="序号"
            width="80px"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" prop="description"></el-table-column>
          <el-table-column label="操作">
            <template #="{ row }">
              <el-button
                icon="Plus"
                type="success"
                size="small"
                title="添加SKU"
                @click="addSku(row)"
              >
                添加
              </el-button>
              <el-button
                icon="Edit"
                type="primary"
                size="small"
                title="修改SPU"
                @click="updateSpu(row)"
              >
                修改
              </el-button>
              <el-button
                icon="View"
                type="info"
                size="small"
                title="查看SKU列表"
                @click="viewSku(row)"
              >
                查看
              </el-button>
              <el-popconfirm
                :title="`您确定要删除${row.spuName}?`"
                width="250px"
                @confirm="removeSpu(row)"
              >
                <template #reference>
                  <el-button
                    icon="Delete"
                    type="danger"
                    size="small"
                    title="删除SPU"
                  >
                    删除
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="getSpuList"
          @size-change="sizeChange"
          v-model:current-page="page"
          v-model:page-size="limit"
          :page-sizes="[3, 5, 7, 9]"
          :total="total"
          background
          layout="prev, pager, next, jumper, ->, sizes, total"
        />
      </div>
      <!-- 添加|修改SPU编辑框 -->
      <SpuForm
        v-show="scene === 1"
        ref="spuForm"
        @changeScene="changeScene"
      ></SpuForm>
      <!-- 添加SKU编辑框 -->
      <SkuForm
        v-show="scene === 2"
        ref="skuForm"
        @changeScene="changeScene"
      ></SkuForm>
      <!-- dialog对话框: 展示已有的SKU数据 -->
      <el-dialog v-model="show" title="SKU列表">
        <el-table border :data="skuList">
          <el-table-column label="SKU名字" prop="skuName"></el-table-column>
          <el-table-column label="SKU价格" prop="price"></el-table-column>
          <el-table-column label="SKU重量" prop="weight"></el-table-column>
          <el-table-column label="SKU图片">
            <template #="{ row, $index }">
              <img
                :src="row.skuDefaultImg"
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<style scoped></style>
