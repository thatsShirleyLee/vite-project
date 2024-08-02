import { createApp } from 'vue'
import App from './App.vue'
// 引入element-plus插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// @ts-expect-error
import zhCn from 'element-plus/dist/locale/zh-cn.mjs' // 配置element-plus国际化
// SVG图标
import 'virtual:svg-icons-register'
// 引入自定义插件对象：注册整个项目的全局组件
import gloablComponent from './components/index'
// 集成sass
import '@/styles/index.scss'
// 引入路由
import router from './router'
// 引入pinia
import pinia from './store'
import useUserStore from '@/store/modules/user'

// 获取应用实例对象
const app = createApp(App)

// 安装element-plus插件， 设置国际化配置
app.use(ElementPlus, {
  locale: zhCn,
})
// 安装自定义插件
app.use(gloablComponent)
// 注册模板路由
app.use(router)
// 注册pinia
app.use(pinia)
// 挂载应用实例对象
app.mount('#app')
