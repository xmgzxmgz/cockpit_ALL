<template>
  <div
    class="absolute top-4 left-4 z-30 animate-fade-in-up"
    style="--delay: 0.2s"
  >
    <div class="resource-overview-panel logo-panel">
      <div class="panel-header">
        <div class="header-icon"></div>
      </div>
      <div class="panel-overlay"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.logo-panel {
  width: 360px;
  height: 160px;
  padding: 12px 16px !important;
}

.panel-header {
  display: flex;
  align-items: center;
  margin-bottom: 0;
  position: relative;
  z-index: 1;
}
</style>
