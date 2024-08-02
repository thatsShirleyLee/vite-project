import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useLayOutSettingStore = defineStore('setting', () => {
  // 定义一个折叠变量来判断现在的状态是否折叠
  // 因为这个变量同时给breadcrumb组件以及父组件layout使用，因此将这个变量定义在pinia中
  let isCollapse = ref(false) // 用户控制菜单折叠还是收起的控制
  let refresh = ref(false) // 控制刷新效果
  return {
    isCollapse,
    refresh,
  }
})
