<script setup lang="ts">
defineOptions({
  name: 'Logo',
})
import setting from '@/setting'
import { useLayOutSettingStore } from '@/store/modules/setting'
const layOutSettingStore = useLayOutSettingStore()
// 点击图标的切换
const changeIcon = () => {
  layOutSettingStore.isCollapse = !layOutSettingStore.isCollapse
}
</script>

<template>
  <div>
    <div class="logo" v-if="setting.logoHidden">
      <div class="logo-img" @click="changeIcon">
        <img :src="setting.logo" alt="" />
      </div>
      <p>{{ layOutSettingStore.isCollapse ? '' : setting.title }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  display: flex;
  align-items: center;
  padding: 10px;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 20px;
  }
}
</style>
