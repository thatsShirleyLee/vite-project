<script setup lang="ts">
defineOptions({
  name: 'Category',
})
defineProps(['scene'])
import { onMounted } from 'vue'
import { useCategoryStore } from '@/store/modules/category'
const categoryStore = useCategoryStore()
onMounted(() => {
  categoryStore.getC1()
})
const handler = () => {
  // 需要将二级、三级分类的数据清空
  categoryStore.c2Id = ''
  categoryStore.c3Attr = []
  categoryStore.c3Id = ''
  categoryStore.getC2()
}
const handler1 = () => {
  categoryStore.c3Id = ''
  categoryStore.getC3()
}
</script>

<template>
  <el-card>
    <el-form inline>
      <el-form-item label="一级分类">
        <el-select
          v-model="categoryStore.c1Id"
          @change="handler"
          :disabled="scene === 0 ? false : true"
        >
          <!-- label:即为展示数据 value:即为select下拉菜单收集的数据 -->
          <!-- el-option中的:value属性，它将绑定的值传递给el-select中的v-model绑定的值 -->
          <el-option
            v-for="c1 in categoryStore.c1Attr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="categoryStore.c2Id"
          @change="handler1"
          :disabled="scene == 0 ? false : true"
        >
          <el-option
            v-for="c2 in categoryStore.c2Attr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="categoryStore.c3Id"
          :disabled="scene == 0 ? false : true"
        >
          <el-option
            v-for="c3 in categoryStore.c3Attr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped lang="scss">
.el-select {
  width: 200px;
}
</style>
