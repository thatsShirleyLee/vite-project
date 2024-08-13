<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time'
// 引入threejs以创建动态背景
import { onMounted, onBeforeUnmount } from 'vue'
import useVantaBackground from '.'
defineOptions({
  name: 'Login',
})
let vantaRef = ref() // login_container 元素
const { initVanta, destroyVanta } = useVantaBackground(vantaRef)
onMounted(() => {
  // console.log('加载背景')
  initVanta()
})
onBeforeUnmount(() => {
  destroyVanta()
  // console.log('销毁背景')
})
// 收集账号和密码的表单数据
let loginForm = reactive({
  username: 'admin', // admin
  password: '111111', // 111111
})
// 用于在组件中访问路由实例
const route = useRoute()
const router = useRouter()
// 用户相关仓库
const userStore = useUserStore()
// 获取el-form组件
let loginForms = ref() // el-form的别名
// 控制按钮加载效果
let loading = ref(false)
// 登录按钮响应事件
const login = async () => {
  loading.value = true
  // 保证所有表单数据校验通过再发请求
  /* const result = loginForms.value.validate()
  console.log(result) */
  await loginForms.value.validate() // validate返回一个Promise对象
  try {
    // 发请求
    await userStore.userLogin(loginForm)
    // 请求成功跳转
    // 跳转(如果路径中有redirect参数，则跳转到redirect参数，否则跳转到首页)
    // debugger // 设置断点
    const redirect: any = route.query.redirect
    router.push({ path: redirect || '/' })
    ElNotification({
      // 弹窗提醒
      type: 'success',
      message: '欢迎回来',
      title: `Hi, ${getTime()}好！`,
    })
    loading.value = false
  } catch (error) {
    // 请求失败
    loading.value = false
    ElNotification({
      // 弹窗提醒
      type: 'error',
      message: (error as Error).message,
    })
  }
}
// 自定义校验规则函数
const validateUsername = (rule: any, value: string, callback: any) => {
  //rule：校验规则对象
  //value:表单元素文本内容
  //callback:符合条件，callback放行通过，不符合：注入错误提示信息
  // if (/^d{5,10}$/.test(value)) {
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('用户名长度不能小于5位'))
  }
}
const validatePassword = (rule: any, value: string, callback: any) => {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度不能小于6位'))
  }
}
// 定义表单校验需要的配置对象
const rules = {
  username: [
    { validator: validateUsername, trigger: 'change' }, // 注意拼写：validator
  ],
  password: [{ validator: validatePassword, trigger: 'change' }],
}
</script>

<template>
  <div ref="vantaRef" class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>Hello</h1>
          <h2>欢迎来到电商运营平台</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :prefix-icon="Lock"
              type="password"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
              :loading="loading"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  // background: url('@/assets/images/background.jpg') no-repeat center center;
  // background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    // background: url('@/assets/images/login_form.png') no-repeat;
    // background-size: cover;
    padding: 40px;
    // border-radius: 20px;
    // box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      color: white;
      font-size: 20px;
      margin: 20px 0px;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
