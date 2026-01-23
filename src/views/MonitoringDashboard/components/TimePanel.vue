<template>
  <header
    class="absolute top-4 left-1/2 transform -translate-x-1/2 z-30"
    :style="{
      '--panel-width': panelWidth + 'px',
      '--panel-height': panelHeight + 'px',
    }"
  >
    <div class="resource-overview-panel time-panel">
      <div class="panel-header" style="margin-bottom: 5px">
        <div class="header-icon">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <h3 class="panel-title" style="font-size: 24px">云计算资源监控平台</h3>
        <div class="header-decoration"></div>
      </div>
      <div class="time-content">
        <div class="current-time">{{ currentTime }}</div>
      </div>
      <div class="panel-overlay"></div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  panelWidth?: number
  panelHeight?: number
}

const props = withDefaults(defineProps<Props>(), {
  panelWidth: 330,
  panelHeight: 100,
})

const currentTime = ref('')

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

let timeInterval: number

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
})
</script>

<style scoped>
@import '@/styles/panels.css';

.resource-overview-panel.time-panel {
  width: var(--panel-width);
  height: var(--panel-height);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
}

.time-content {
  position: relative;
  z-index: 1;
}

.current-time {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  text-align: center;
}
</style>
