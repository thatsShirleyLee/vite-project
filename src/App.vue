<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
router.push('/login')
defineOptions({
  name: 'App',
})
// test git connect
</script>
<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss"></style>
