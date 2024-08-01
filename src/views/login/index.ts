// src/composables/useVantaBackground.ts

import { Ref } from 'vue'
import * as THREE from 'three'
import HALO from 'vanta/src/vanta.halo'
import { VANTA } from 'vanta'

export const useVantaBackground = (vantaRef: Ref<HTMLElement | null>) => {
  let vantaEffect: any = null
  const initVanta = () => {
    if (vantaRef.value) {
      vantaEffect = HALO({
        el: vantaRef.value,
        THREE: THREE,
      })
      VANTA.HALO({
        el: vantaRef.value,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        baseColor: 0xd9, // 基准颜色
        backgroundColor: 0x0, // 背景颜色 需十进制
        amplitudeFactor: 1.1, // 振幅因子
        xOffset: -0.31, // 移动到X轴
        yOffset: -0.17, // 移动到Y轴
        size: 2.0, // 大小
      })
    }
  }
  const destroyVanta = () => {
    if (vantaEffect) {
      vantaEffect.destroy()
    }
  }
  return {
    initVanta,
    destroyVanta,
  }
}
export default useVantaBackground
