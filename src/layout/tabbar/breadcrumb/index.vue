<script setup lang="ts">
defineOptions({
  name: 'Breadcrumb',
})
import { useLayOutSettingStore } from '@/store/modules/setting'
import { useRoute } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'

const layOutSettingStore = useLayOutSettingStore()
// 获取路由对象
const route = useRoute()
// 点击图标的切换
const changeIcon = () => {
  layOutSettingStore.isCollapse = !layOutSettingStore.isCollapse
}
</script>

<template>
  <!-- 顶部左侧的图标 -->
  <el-icon @click="changeIcon">
    <component
      :is="layOutSettingStore.isCollapse ? 'Fold' : 'Expand'"
    ></component>
  </el-icon>
  <!-- 顶部左侧的面包屑 -->
  <el-breadcrumb :separator-icon="ArrowRight">
    <!-- 面包屑动态展示路由名字与标题 -->
    <el-breadcrumb-item
      v-for="(item, index) in route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <div class="breadcrumb-item-content">
        <!-- 图标 -->
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <!-- 面包屑展示匹配路由的标题 -->
        <span>{{ item.meta.title }}</span>
      </div>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped lang="scss">
.el-breadcrumb {
  margin-left: 15px;
}
.breadcrumb-item-content {
  display: flex;
  align-items: center;
}
.breadcrumb-item-content .el-icon {
  margin-right: 5px; /* 可根据需要调整间距 */
}
.breadcrumb-item-content span {
  display: inline-block;
}
</style>
