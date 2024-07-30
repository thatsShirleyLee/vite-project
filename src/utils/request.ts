// 进行axios的二次封装：使用请求和响应拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus'
// 创建一个axios实例（方便其他的配置，比如基础路径、超时时间等）
let request = axios.create({
  // 基础路径
  baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径上会携带api
  timeout: 5000, // 超时时间的设置
})
//请求拦截器
request.interceptors.request.use((config) => {
  // config.headers.token = '123' // 公共参数：每一次请求都会携带这个参数，所以是公共的
  // console.log(config);
  return config // 含有headers属性，携带公共参数发给服务器端
})
//响应拦截器
request.interceptors.response.use(
  // 成功的回调
  (response) => {
    // console.log(response);
    return response.data // 简化数据
  },
  // 失败的回调
  (error) => {
    //处理网络错误
    let msg = '' // 存储网络错误信息
    const status = error.response.status
    switch (status) {
      case 401:
        msg = 'token过期'
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器出现问题'
        break
      default:
        msg = '无网络'
    }
    // 提示错误信息
    ElMessage({
      type: 'error',
      message: msg,
    })
    return Promise.reject(error)
  },
)
export default request
