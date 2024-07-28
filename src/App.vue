<script setup lang="ts">
import { reqLogin, reqUserInfo } from '@/api/user/user'
reqLogin({ username: 'admin', password: '111111' })
</script>

<template>
  <div>
    <h1>标题</h1>
  </div>
</template>

<style scoped lang="scss">
div {
  h1 {
    color: $base-color;
  }
}
</style>
