import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 创建 pinia 实例
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate) // 使用持久化插件
// 对外暴露：入口文件需要安装pinia
export default pinia
