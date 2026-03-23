<template>
  <!-- 3D 场景包装器容器，作为整个组件的根元素 -->
  <div class="three-scene-wrapper">
    <!-- 3D 画布层 - 使用绝对定位放置在底层，用于渲染 Three.js 场景 -->
    <div ref="containerRef" class="three-scene-canvas"></div>

    <!-- UI 插槽层 - 使用绝对定位放置在上层，用于显示覆盖在 3D 场景上的 UI 元素 -->
    <div class="ui-overlay">
      <!-- 插槽，允许父组件在 3D 场景上方插入自定义 UI 内容 -->
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
// 导入 Vue 3 的响应式 API 和生命周期钩子
import { ref, onMounted, onUnmounted } from 'vue'
// 导入 Three.js 相关的工具函数，用于初始化场景、更新楼层可见性和清理资源
import { initThreeScene, updateFloorVisibility, dispose } from '@/utils/three-helpers'
// 导入配置 Store 以获取动态配置
import { useConfigStore } from '@/stores/configStore'

// 创建模板引用，用于获取 3D 画布容器的 DOM 元素
const containerRef = ref<HTMLElement>()
// 定义组件可以触发的事件，当机房被点击时触发 'room-click' 事件
const emit = defineEmits(['room-click'])

// 存储 Three.js 实例的变量，用于后续的清理操作
let threeInstance: any = null

// 组件挂载后的生命周期钩子
onMounted(async () => {
  const configStore = useConfigStore()
  // 确保数据中心配置已加载
  await configStore.loadDataCenterConfig()
  
  // 确保容器元素存在后再初始化 Three.js 场景
  if (containerRef.value) {
    try {
      // 异步初始化 Three.js 场景，传入容器元素和配置选项
      threeInstance = await initThreeScene(containerRef.value, {
        // 从数据库获取的楼层数，默认回退为5
        floorCount: configStore.dataCenterConfig.floor_count || 5,
        // 机房点击事件回调函数，当用户点击机房时触发
        onRoomClick: (roomData: any) => {
          // 向父组件发射 'room-click' 事件，传递机房数据
          emit('room-click', roomData)
        },
        // 数据更新事件回调函数，当场景数据更新时触发
        onDataUpdate: (stats: any) => {
          // 在控制台输出数据更新信息，用于调试
          console.log('数据更新:', stats)
        },
      })
      // 初始化成功后输出日志
      console.log('Three.js 场景初始化成功')
    } catch (error) {
      // 捕获并输出初始化过程中的错误
      console.error('Three.js 初始化失败:', error)
    }
  }
})

// 组件卸载前的生命周期钩子
onUnmounted(() => {
  // 如果 Three.js 实例存在，则清理相关资源
  if (threeInstance) {
    // 调用清理函数，释放 Three.js 占用的内存和资源
    dispose()
  }
})

// 使用 defineExpose 向父组件暴露方法
// 这允许父组件通过模板引用调用子组件的方法
defineExpose({
  // 暴露更新楼层可见性的方法，父组件可以调用此方法来控制楼层显示
  updateFloorVisibility,
})
</script>

<style scoped>
/* 3D 场景包装器的样式 */
.three-scene-wrapper {
  /* 相对定位，作为子元素绝对定位的参考点 */
  position: relative;
  /* 占满父容器的宽度和高度 */
  width: 100%;
  height: 100%;
  /* 隐藏溢出内容，确保场景不会超出容器边界 */
  overflow: hidden;
}

/* 3D 场景画布的样式 */
.three-scene-canvas {
  /* 绝对定位，覆盖整个包装器 */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* z-index 设为 0，确保在 UI 层之下 */
  z-index: 0;
}

/* UI 覆盖层的样式 */
.ui-overlay {
  /* 绝对定位，覆盖整个包装器 */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* z-index 设为 10，确保在 3D 场景之上 */
  z-index: 10;
  /* 禁用鼠标事件，让 UI 层不阻挡 3D 场景的交互 */
  pointer-events: none;
}

/* 恢复 UI 元素的鼠标事件 */
/* 这样 UI 层本身不会阻挡 3D 场景交互，但 UI 层内的元素仍然可以响应鼠标事件 */
.ui-overlay > * {
  pointer-events: auto;
}
</style>
