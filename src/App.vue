<!--
  应用程序根组件模板
-->
<template>
  <div id="app">
    <video class="video-background" autoplay muted loop>
      <source src="/background.mp4" type="video/mp4" />
    </video>
    <router-view />
  </div>
</template>

<!--
  组件脚本部分
-->
<script setup lang="ts"></script>

<!--
  全局样式定义
-->
<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

body,
html {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100%;
}

.video-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  object-fit: cover;
}

#app {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  position: relative;
}
</style>
