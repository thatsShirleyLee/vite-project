<script setup lang="ts" name="Tabbar">
import { ArrowRight } from '@element-plus/icons-vue'
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>

<template>
  <div class="tabbar">
    <!-- 左侧 -->
    <div class="tabbar_left">
      <Breadcrumb></Breadcrumb>
    </div>
    <!-- 右侧 -->
    <div class="tabbar_right">
      <Setting></Setting>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tabbar {
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background: white;
  .tabbar_left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  .tabbar_right {
    display: flex;
    align-items: center;
    width: 220px;
    justify-content: space-evenly;
  }
}
</style>
