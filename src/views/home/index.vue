<script setup lang="ts">
defineOptions({
  name: 'Home',
})
import { useUserStore } from '@/store/modules/user'
import { getTime } from '@/utils/time'
const userStore = useUserStore()
</script>

<template>
  <div>
    <el-card>
      <div class="box">
        <img :src="userStore.avatar" class="avatar" />
        <div class="bottom">
          <h3 class="title">{{ getTime() }}好呀！ {{ userStore.username }}</h3>
          <p class="subtitle">电商运营平台</p>
        </div>
      </div>
    </el-card>
    <div class="bottoms">
      <svg-icon name="welcome" width="800px" height="400px"></svg-icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
.box {
  display: flex;
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .bottom {
    margin-left: 20px;
    .title {
      font-size: 30px;
      font-weight: 900;
      margin-bottom: 30px;
    }
    .subtitle {
      font-style: italic;
      color: skyblue;
    }
  }
}
.bottoms {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
</style>
