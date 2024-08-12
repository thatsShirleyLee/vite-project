<script setup lang="ts">
defineOptions({
  name: 'Attr',
})
import Category from '@/components/Category/index.vue'
// 添加平台属性
const addAttr = () => {
  console.log('添加平台属性')
}
</script>

<template>
  <div>
    <!-- 三级分类全局组件-->
    <Category></Category>
    <el-card style="margin: 10px 0">
      <!-- 卡片顶部添加品牌按钮 -->
      <el-button icon="Plus" size="default" type="primary" @click="addAttr">
        添加属性
      </el-button>
      <!-- 表格组件，用于展示已有的数据 -->
      <el-table style="margin: 10px 0" border>
        <el-table-column
          label="序号"
          width="80px"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column label="属性名称" width="120px"></el-table-column>
        <el-table-column label="属性值名称"></el-table-column>
        <el-table-column label="操作" width="120px"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped></style>
