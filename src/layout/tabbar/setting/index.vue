<script setup lang="ts">
defineOptions({
  name: 'Setting',
})
import { useLayOutSettingStore } from '@/store/modules/setting'
import { useUserStore } from '@/store/modules/user'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()
const route = useRoute()

const userStore = useUserStore()
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
// 退出登录点击的回调
const logout = async () => {
  // 1. 向服务器的退出登录接口发送请求（mock目前没有这个接口）
  // 2. 清除登录状态，user仓库的数据
  await userStore.userLogout()
  // 3. 跳转到登录页（保存当前的路由地址，如果登录就跳转到这个页面来）
  router.push({
    path: '/login',
    query: {
      redirect: route.path, // login页面发送登录请求后，判断route是否有redirect属性，如果有就跳转到这个地址，如果没有就跳转到首页
    },
  })
}

// 暗黑模式
let dark = ref<boolean>(false)
const changeDark = () => {
  // 获取HTML根节点
  let html = document.documentElement
  // 判断HTML标签是否有类名dark
  dark.value ? (html.className = 'dark') : (html.className = '')
}

// 主题设置
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
const color = ref<string>('#409EFF')
const setColor = () => {
  // 获取HTML根节点
  let html = document.documentElement
  // 设置根节点的data-vite-color属性
  html.style.setProperty('--el-color-primary', color.value)
}
</script>

<template>
  <!-- 顶部右侧的面包屑 -->
  <el-button icon="Refresh" circle @click="updateFresh"></el-button>
  <el-button icon="FullScreen" circle @click="fullScreen"></el-button>
  <el-popover placement="bottom" title="主题设置" :width="200" trigger="click">
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker
          @change="setColor"
          v-model="color"
          show-alpha
          :predefine="predefineColors"
          :teleported="false"
        />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch
          v-model="dark"
          inline-prompt
          active-icon="MoonNight"
          inactive-icon="Sunny"
          @change="changeDark"
        />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button icon="Setting" circle></el-button>
    </template>
  </el-popover>
  <!-- 静态头像 -->
  <!-- <img
    src="@/assets/icons/avatar.png"
    style="width: 32px; height: 32px; margin: 0px 12px"
  /> -->
  <!-- 真实头像 -->
  <img :src="userStore.avatar" />
  <!-- 用户下拉菜单 -->
  <el-dropdown style="margin-right: 12px">
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right"><arrow-down /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu
        style="width: 120px; display: flex; justify-content: center"
      >
        <el-dropdown-item @click="logout">退出帐户</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss">
.el-dropdown-link {
  font-weight: bold;
}
img {
  width: 32px;
  height: 32px;
  margin: 0px 12px;
  border-radius: 50%;
}
</style>
