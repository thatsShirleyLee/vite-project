<script setup lang="ts">
defineOptions({
  name: 'Setting',
})
import { useLayOutSettingStore } from '@/store/modules/setting'
const layOutSettingStore = useLayOutSettingStore()
const updateFresh = () => {
  layOutSettingStore.refresh = !layOutSettingStore.refresh
}
const fullScreen = () => {
  // DOM对象的一个属性：可以用来判断当前是不是全屏的模式【全屏：true，不是全屏：false】
  let full = document.fullscreenElement
  // 切换成全屏
  if (!full) {
    // 文档根节点的方法requestFullscreen实现全屏
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏
    document.exitFullscreen()
  }
}
</script>

<template>
  <!-- 顶部右侧的面包屑 -->
  <el-button icon="Refresh" circle @click="updateFresh"></el-button>
  <el-button icon="FullScreen" circle @click="fullScreen"></el-button>
  <el-popover placement="bottom" title="主题设置" :width="200" trigger="hover">
    <el-form>
      <el-form-item label="主题颜色">
        <!-- <el-color-picker @change="setColor" v-model="color" show-alpha :predefine="predefineColors"
          :teleported="false" /> -->
      </el-form-item>
      <el-form-item label="暗黑模式">
        <!-- <el-switch v-model="dark" inline-prompt active-icon="MoonNight" inactive-icon="Sunny" @change="changeDark" /> -->
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button icon="Setting" circle></el-button>
    </template>
  </el-popover>
  <img
    src="@/assets/icons/avatar.png"
    style="width: 32px; height: 32px; margin: 0px 12px"
  />
  <!-- 用户下拉菜单 -->
  <el-dropdown style="margin-right: 12px">
    <span class="el-dropdown-link">
      Admin
      <!-- <el-icon>
            <User></User>
          </el-icon> -->
      <el-icon class="el-icon--right"><ArrowDown /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu
        style="width: 120px; display: flex; justify-content: center"
      >
        <el-dropdown-item>退出帐户</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss">
.el-dropdown-link {
  font-weight: bold;
}
</style>
