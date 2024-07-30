<script setup lang="ts" name="LoginView">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import useUserStore from '@/store/modules/user'
import { ElNotification } from 'element-plus'

let loginForm = reactive({
  username: 'admin',
  password: '111111',
})

const $router = useRouter() // 用于在组件中访问路由实例
const userStore = useUserStore()
let loading = ref(false)
// 登录按钮响应事件
const login = async () => {
  loading.value = true
  try {
    // 发请求
    await userStore.userLogin(loginForm)
    // 请求成功跳转
    $router.push('/')
    ElNotification({
      // 弹窗提醒
      type: 'success',
      message: '登录成功',
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
</script>

<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item>
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item>
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
  background: url('@/assets/images/background.jpg') no-repeat center center;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);

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
