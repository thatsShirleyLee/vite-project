<script setup lang="ts">
defineOptions({
  name: 'Layout',
})
//  获取路由对象
import { useRoute } from 'vue-router'
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import { useUserStore } from '@/store/modules/user'
import { useLayOutSettingStore } from '@/store/modules/setting'
const userStore = useUserStore()
const layOutSettingStore = useLayOutSettingStore()
const route = useRoute()
// console.log('@', route.path);
</script>

<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">
      <!-- 去掉菜单栏的过渡动画 -->
      <!-- :class="{ collapse: layOutSettingStore.isCollapse ? true : false }" -->
      <Logo></Logo>
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <el-menu
          background-color="#001529"
          text-color="white"
          :default-active="route.path"
          active-text-color="orange"
          :collapse="layOutSettingStore.isCollapse"
          style="transition: all 0.1s"
        >
          <!-- default-active 页面加载时默认激活菜单的index -->
          <!-- 根据路由动态生成菜单 -->
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div
      class="layout_tabbar"
      :class="{ collapse: layOutSettingStore.isCollapse ? true : false }"
    >
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区域 -->
    <div
      class="layout_main"
      :class="{ collapse: layOutSettingStore.isCollapse ? true : false }"
    >
      <Main></Main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    color: white;
    transition: all 0.3s;
    .scrollbar {
      width: 100%;
      height: calc(100% - $base-menu-logo-height);
      .el-menu {
        border-right: none;
      }
    }
    &.collapse {
      width: $base-menu-min-width;
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    left: $base-menu-width;
    top: 0;
    transition: all 0.3s;
    &.collapse {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100% - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    background-color: pink;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
    &.collapse {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
