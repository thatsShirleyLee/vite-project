<script setup lang="ts">
defineOptions({
  name: 'Main',
})
import { watch, ref, nextTick } from 'vue'
// 使用layout的小仓库
import { useLayOutSettingStore } from '@/store/modules/setting'
let layOutSettingStore = useLayOutSettingStore()
// 控制当前组件是否销毁重建
let flag = ref(true)
// 监听仓库内部的数据是否发生变化，如果发生变化，说明用户点击过刷新按钮
watch(
  () => layOutSettingStore.refresh,
  () => {
    // 点击刷新按钮：路由组件销毁
    flag.value = false
    // nextTick：保证DOM更新完毕后，重新渲染路由组件； nextTick可以获取更新完毕后的DOM
    nextTick(() => {
      flag.value = true // 重新创建 main 组件 （v-if可以销毁/创建组件）
    })
  },
)
</script>

<template>
  <!-- 路由组件出口的位置 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染layout一级路由的子路由 -->
      <component :is="Component" v-if="flag"></component>
    </transition>
  </router-view>
</template>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  transform: scale(0.5);
}
.fade-enter-active {
  transition: all 0.3s;
}
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
