// 自定义插件，用于注册全部的全局组件
// 引入全部的全局组件
import SvgIcon from './SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'
import type { App, Component } from 'vue'

const components: { [name: string]: Component } = { SvgIcon, Pagination }
// 对外暴露插件对象
export default {
  install(app: App) {
    // 遍历全局组件的对象components
    Object.keys(components).forEach((key: string) => {
      // 注册组件
      app.component(key, components[key])
    })
  },
}