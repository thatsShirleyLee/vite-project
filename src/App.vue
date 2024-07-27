<script setup lang="ts">
  import {Plus} from '@element-plus/icons-vue'
  import SvgIcon from '@/components/SvgIcon/index.vue'
</script>

<template>
  <div>
    <h1>标题</h1>
    <el-button type="primary" size="default" :icon="Plus">主要按钮</el-button>
    <Pagination></Pagination>
    <svg-icon name="home"></svg-icon>
    <!-- <SvgIcon name="logout" width="32px" height="32px"/> -->
  </div>
</template>

<style scoped lang="scss">
div{
  h1{
    color: $color;
  }
}
</style>
