<script setup lang="ts">
defineOptions({
  name: 'NotFound',
})
</script>

<template>
  <div class="box">
    <img src="../../assets/images/error_images/404.png" />
    <el-button
      type="primary"
      size="large"
      style="margin-top: 20px"
      @click="$router.push('/home')"
    >
      点我去首页
    </el-button>
  </div>
</template>

<style scoped lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;

  img {
    width: 800px;
    height: 400px;
  }
}
</style>
