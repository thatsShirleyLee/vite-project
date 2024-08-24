<script setup lang="ts">
defineOptions({
  name: 'Attr',
})
import Category from '@/components/Category/index.vue'
import { useCategoryStore } from '@/store/modules/category'
import { ref, watch, reactive, onBeforeUnmount, nextTick } from 'vue'
import { reqAttr, reqAddOrUpdateAttr, reqDeleteAttr } from '@/api/product/attr'
import { ElMessage } from 'element-plus'
import type { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type'
const categoryStore = useCategoryStore()
let attrList = ref<any>([])
// 定义card组件内容切换变量
let scene = ref<number>(0) // scene=0, 显示table, scene=1, 展示添加与修改属性结构
// 收集添加属性的表单值
let attrParams = reactive<Attr>({
  attrName: '', // 新增属性名
  attrValueList: [], // 新增的属性值数组
  categoryId: '', // 三级分类ID
  categoryLevel: 3, // 分类级别
})
//准备一个数组:将来存储对应的组件实例el-input
let inputArr = ref<any>([])
// 监听仓库三级分类ID变化
watch(
  () => categoryStore.c3Id,
  () => {
    // 清空上一次查询的属性与属性值
    attrList.value = []
    // 保证三级分类得有才能发请求
    if (!categoryStore.c3Id) return
    //获取分类的ID
    getAttrList()
  },
)
// 获取属性列表
const getAttrList = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  const res: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
  if (res.code === 200) {
    attrList.value = res.data
  }
}
// 添加平台属性
const addAttr = () => {
  // 每一次点击的时候,先清空一下数据再收集数据
  Object.assign(attrParams, {
    attrName: '', // 新增的属性的名字
    attrValueList: [], // 新增的属性值数组
    categoryId: categoryStore.c3Id, // 三级分类的ID
    categoryLevel: 3, // 代表的是三级分类
  })
  // 切换场景
  scene.value = 1
}
// 添加属性值
const addAttrValue = () => {
  //点击添加属性值按钮的时候,向数组添加一个属性值对象
  attrParams.attrValueList.push({
    valueName: '',
    flag: true, //控制每一个属性值编辑模式与切换模式的切换
  })
  //获取最后el-input组件聚焦
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}
// 属性值表单元素失焦或回车事件回调
const toLook = (row: AttrValue, $index: number) => {
  // 非法情况判断1
  if (row.valueName.trim() == '') {
    // 删除调用对应属性值为空的元素
    attrParams.attrValueList.splice($index, 1)
    // 提示信息
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    return
  }
  // 非法情况2
  let repeat = attrParams.attrValueList.find((item) => {
    // 切记把当前失焦属性值对象从当前数组扣除判断
    if (item != row) {
      return item.valueName === row.valueName
    }
  })

  if (repeat) {
    // 将重复的属性值从数组当中干掉
    attrParams.attrValueList.splice($index, 1)
    // 提示信息
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    return
  }
  // 相应的属性值对象flag:变为false,展示div
  row.flag = false
}
// 属性值div点击事件
const toEdit = (row: AttrValue, $index: number) => {
  // 相应的属性值对象flag:变为true, 展示input
  row.flag = true
  // nextTick:响应式数据发生变化,获取更新的DOM(组件实例)
  nextTick(() => {
    inputArr.value[$index].focus()
  })
}
const cancel = () => {
  // console.log('取消')
  scene.value = 0
}
const save = async () => {
  console.log('保存')
  let res: any = await reqAddOrUpdateAttr(attrParams)
  if (res.code === 200) {
    // 切换场景
    scene.value = 0
    // 保存成功
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
    // 重新获取属性列表
    getAttrList()
  }
}
// 修改属性
const updateAttr = (row: Attr) => {
  console.log('修改属性')
  scene.value = 1
  // 回显(这里要注意：Object.assign为浅拷贝，可能会造成小bug，需要使用json序列化转化为深拷贝)
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}
// 删除属性
const removeAttr = async (attrId: number) => {
  const res: any = await reqDeleteAttr(attrId)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    // 重新获取属性列表
    getAttrList()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
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
    <!-- 三级分类全局组件-->
    <Category :scene="scene" />
    <el-card style="margin: 10px 0">
      <!-- table -->
      <div v-show="scene === 0">
        <!-- 卡片顶部添加品牌按钮 -->
        <!-- 在我们没选择好三级菜单之前，添加属性按钮应该处于禁用状态 -->
        <el-button
          v-has="`btn.Attr.add`"
          icon="Plus"
          size="default"
          type="primary"
          @click="addAttr"
          :disabled="categoryStore.c3Id ? false : true"
        >
          添加属性
        </el-button>
        <!-- 表格组件，用于展示已有的数据 -->
        <el-table style="margin: 10px 0" border :data="attrList">
          <el-table-column
            label="序号"
            width="80px"
            align="center"
            type="index"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            width="120px"
            prop="attrName"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #default="{ row }">
              <el-tag
                style="margin: 5px"
                v-for="(item, index) in row.attrValueList"
                :key="item.id"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="240px">
            <template #default="{ row, $index }">
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                @click="updateAttr(row)"
              >
                修改
              </el-button>
              <el-popconfirm
                :title="`您确定要删除${row.attrName}?`"
                width="250px"
                @confirm="removeAttr(row.id)"
              >
                <template #reference>
                  <el-button type="danger" size="small" icon="Delete">
                    删除
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性编辑框 -->
      <div v-show="scene === 1">
        <!-- 展示添加属性与修改数据的结构 -->
        <el-form inline>
          <el-form-item label="属性名称">
            <el-input
              placeholder="请输入属性名称"
              v-model="attrParams.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          icon="Plus"
          type="primary"
          :disabled="attrParams.attrName ? false : true"
          @click="addAttrValue"
        >
          添加属性值
        </el-button>
        <el-button type="default" @click="cancel">取消</el-button>
        <el-table
          border
          style="margin: 10px 0"
          :data="attrParams.attrValueList"
        >
          <el-table-column
            label="序号"
            width="80px"
            align="center"
            type="index"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #default="{ row, $index }">
              <el-input
                :ref="(vc: any) => (inputArr[$index] = vc)"
                v-if="row.flag"
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                @blur="toLook(row, $index)"
                @keyup.enter="toLook(row, $index)"
              ></el-input>
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作">
            <template #default="{ row, $index }">
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                @click="attrParams.attrValueList.splice($index, 1)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          :disabled="attrParams.attrValueList.length > 0 ? false : true"
          @click="save"
        >
          保存
        </el-button>
        <el-button type="default" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped></style>
