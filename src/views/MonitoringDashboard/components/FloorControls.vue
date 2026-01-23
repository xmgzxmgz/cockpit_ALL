<template>
  <div class="floor-control-container">
    <div
      class="resource-overview-panel floor-selection-panel compact-height animate-fade-in-up"
      style="--delay: 0.5s"
    >
      <div class="floor-grid compact">
        <button
          @click="$emit('floor-change', 'all')"
          :class="[
            'floor-card compact',
            currentFloor === 'all' ? 'floor-card-active' : 'floor-card-inactive',
          ]"
        >
          <div class="floor-icon compact">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
              ></path>
            </svg>
          </div>
          <div class="floor-content">
            <div class="floor-label">整体</div>
          </div>
        </button>

        <button
          v-for="floor in floors"
          :key="floor"
          @click="$emit('floor-change', floor)"
          :class="[
            'floor-card compact',
            currentFloor === floor ? 'floor-card-active' : 'floor-card-inactive',
          ]"
        >
          <div class="floor-icon compact">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              ></path>
            </svg>
          </div>
          <div class="floor-content">
            <div class="floor-label">{{ floor }}F</div>
          </div>
        </button>
      </div>
      <div class="panel-overlay"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  floors: number[]
  currentFloor: number | 'all'
}

defineProps<Props>()
defineEmits<{
  'floor-change': [floor: number | 'all']
}>()
</script>

<style scoped>
@import '@/styles/panels.css';

.floor-control-container {
  position: fixed !important;
  bottom: 20px !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  z-index: 9999 !important;
}
</style>
