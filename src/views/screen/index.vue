<script setup lang="ts">
defineOptions({
  name: 'Screen',
})
import { ref, onMounted } from 'vue'
import Top from '@/views/screen/components/top/index.vue'
import Tourist from '@/views/screen/components/tourist/index.vue'
import Sex from '@/views/screen/components/sex/index.vue'
import Age from '@/views/screen/components/age/index.vue'
import Map from '@/views/screen/components/map/index.vue'
import Line from '@/views/screen/components/line/index.vue'
import Rank from '@/views/screen/components/rank/index.vue'
import Year from '@/views/screen/components/year/index.vue'
import Counter from '@/views/screen/components/counter/index.vue'
let screen = ref()

onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})
// 定义大屏缩放比例
function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}
// 监听视口变化
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}
</script>

<template>
  <div class="container">
    <!-- 数据大屏展示内容区域 -->
    <div class="screen" ref="screen">
      <div class="top">
        <Top />
      </div>
      <div class="bottom">
        <div class="left">
          <Tourist />
          <Sex />
          <Age />
        </div>
        <div class="center">
          <Map class="map" />
          <Line class="line" />
        </div>
        <div class="right">
          <Rank class="rank" />
          <Year class="year" />
          <Counter class="count" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat;
  background-size: cover;
  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    left: 50%;
    top: 50%;
    transform-origin: left top;
    .top {
      width: 100%;
      height: 40px;
    }
    .bottom {
      display: flex;
      .left {
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;
        .tourist {
          flex: 1.2;
        }
        .sex {
          flex: 1;
        }
        .age {
          flex: 1;
        }
      }
      .center {
        flex: 1.5;
        display: flex;
        flex-direction: column;
        .map {
          flex: 4;
        }
        .line {
          flex: 1;
        }
      }
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 40px;
        .rank {
          flex: 1.5;
        }
        .year {
          flex: 1;
        }
        .count {
          flex: 1;
        }
      }
    }
  }
}
</style>
