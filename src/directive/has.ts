import { useUserStore } from '@/store/modules/user'
import pinia from '@/store'
// const userStore = useUserStore(pinia)  // pinia持久化失败
export const isHasButton = (app: any) => {
  const userStore = useUserStore(pinia) // pinia持久化成功(这里必须在函数内部调用)
  // 全局自定义指令:实现按钮的权限
  app.directive('has', {
    mounted(el: any, options: any) {
      // el: 指令所绑定的元素，可以用来直接操作 DOM
      // options: 自定义指令等号右侧的值
      if (!userStore.buttons.includes(options.value)) {
        // el.parentNode.removeChild(el)
        el.remove()
      }
    },
  })
}
