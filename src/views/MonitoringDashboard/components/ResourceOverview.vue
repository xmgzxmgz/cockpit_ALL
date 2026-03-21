<template>
  <!-- 整个资源概览面板的容器，定位在页面左侧中间，并设置z-index -->
  <div class="absolute top-1/2 left-10 transform -translate-y-1/2 z-30">
    <!-- 资源概览面板，点击时触发 handlePanelClick 方法 -->
    <div
      class="resource-overview-panel vertical-layout"
      @click="handlePanelClick"
    >
      <!-- 面板头部区域 -->
      <div class="panel-header">
        <!-- 头部图标区域 -->
        <div class="header-icon">
          <!-- SVG图标，表示资源概览 -->
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            ></path>
          </svg>
        </div>
        <!-- 面板标题 -->
        <h3 class="panel-title">资源概览</h3>
      </div>

      <!-- 垂直布局的概览内容区域 -->
      <div class="overview-vertical">
        <!-- 第一个概览卡片：机柜总数 -->
        <div class="overview-card primary">
          <!-- 卡片图标区域 -->
          <div class="card-icon">
            <!-- SVG图标，表示机柜 -->
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2 4h.01M17 16h.01"
              ></path>
            </svg>
          </div>
          <!-- 卡片内容区域 -->
          <div class="card-content">
            <!-- 标签和数值在同一行 -->
            <div class="metric-row">
              <span class="metric-label">已建总机柜</span>
              <span class="metric-value">{{
                enterpriseRoomData.totalServers
              }}</span>
            </div>
          </div>
        </div>

        <!-- 第二个概览卡片：应计收机柜 -->
        <!-- <div class="overview-card billing">
          <div class="card-icon">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z">
              </path>
            </svg>
          </div>
          <div class="card-content">
            <div class="metric-row">
              <span class="metric-label">应计收机柜</span>
              <span class="metric-value">{{ enterpriseRoomData.shouldBillCabinets || 0 }}</span>
            </div>
          </div>
        </div> -->

        <!-- 第三个概览卡片：已计收机柜 -->
        <!-- <div class="overview-card billed">
          <div class="card-icon">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="card-content">
            <div class="metric-row">
              <span class="metric-label">已计收机柜</span>
              <span class="metric-value">{{ enterpriseRoomData.billedCabinets || 0 }}</span>
            </div>
          </div>
        </div> -->

        <!-- 第四个概览卡片：预占机柜 -->
        <!-- <div class="overview-card reserved">
          <div class="card-icon">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z">
              </path>
            </svg>
          </div>
          <div class="card-content">
            <div class="metric-row">
              <span class="metric-label">预占机柜</span>
              <span class="metric-value">{{ enterpriseRoomData.reservedCabinets || 0 }}</span>
            </div>
          </div>
        </div> -->

        <!-- 第五个概览卡片：可销售机柜 -->
        <!-- <div class="overview-card available">
          <div class="card-icon">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
          </div>
          <div class="card-content">
            <div class="metric-row">
              <span class="metric-label">可销售机柜</span>
              <span class="metric-value">{{ enterpriseRoomData.availableCabinets || 0 }}</span>
            </div>
          </div>
        </div> -->

        <!-- 第六个概览卡片：总上电机柜数 -->
        <div class="overview-card powered">
          <!-- 卡片图标区域 -->
          <div class="card-icon">
            <!-- SVG图标，表示上电 -->
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <!-- 卡片内容区域 -->
          <div class="card-content">
            <!-- 标签和数值在同一行 -->
            <div class="metric-row">
              <span class="metric-label">总上电机柜数</span>
              <span class="metric-value">{{
                enterpriseRoomData.totalITCabinetCount
              }}</span>
            </div>
          </div>
        </div>

        <!-- 第七个概览卡片：客户使用机柜 -->
        <div class="overview-card customer">
          <!-- 卡片图标区域 -->
          <div class="card-icon">
            <!-- SVG图标，表示客户使用 -->
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          </div>
          <!-- 卡片内容区域 -->
          <div class="card-content">
            <!-- 标签和数值在同一行 -->
            <div class="metric-row">
              <span class="metric-label">客户使用机柜</span>
              <span class="metric-value">{{
                enterpriseRoomData.customerCabinets || 0
              }}</span>
            </div>
          </div>
        </div>

        <!-- 第八个概览卡片：自用机柜 -->
        <div class="overview-card selfuse">
          <!-- 卡片图标区域 -->
          <div class="card-icon">
            <!-- SVG图标，表示自用 -->
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              ></path>
            </svg>
          </div>
          <!-- 卡片内容区域 -->
          <div class="card-content">
            <!-- 标签和数值在同一行 -->
            <div class="metric-row">
              <span class="metric-label">自用机柜</span>
              <span class="metric-value">{{
                enterpriseRoomData.selfUseCabinets || 0
              }}</span>
            </div>
          </div>
        </div>

        <!-- 第九个概览卡片：企业数 - 已注释 -->

        <div class="overview-card info">
          <div class="card-icon">
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              ></path>
            </svg>
          </div>
          <div class="card-content">
            <div class="metric-row">
              <span class="metric-label">企业数</span>
              <span class="metric-value">{{
                enterpriseRoomData.totalEnterpriseCount
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 面板叠加层 -->
      <div class="panel-overlay"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 导入 Vue 3 的响应式API和生命周期钩子
import { onMounted, ref, onUnmounted } from "vue";

// 移除了 resourceData 属性依赖，组件现在自行管理数据

// 定义组件可以触发的事件
const emit = defineEmits<{
  openEnterprisePanel: []; // 定义一个名为 openEnterprisePanel 的事件，不带参数
}>();

// 处理面板点击事件的方法，触发 openEnterprisePanel 事件
const handlePanelClick = () => {
  emit("openEnterprisePanel");
};

// 使用 ref 创建响应式对象，存储企业机房相关数据
const enterpriseRoomData = ref({
  totalServers: 4425, // 机柜总数，初始值
  totalITCabinetCount: 0, // 已上电机柜数，初始值
  totalEnterpriseCount: 0, // 企业数，初始值
  shouldBillCabinets: 0, // 应计收机柜数，初始值
  billedCabinets: 0, // 已计收机柜数，初始值
  reservedCabinets: 0, // 预占机柜数，初始值
  availableCabinets: 0, // 可销售机柜数，初始值
  customerCabinets: 0, // 客户使用机柜数，初始值
  selfUseCabinets: 0, // 自用机柜数，初始值
});
// 使用 ref 创建响应式变量，存储已售出机柜总数
let totalSoldCabinets = ref<number>(0);

// 存储定时器ID，用于清理
let autoUpdateTimer: number | null = null;
// 存储上次更新时间
const lastUpdateTime = ref<Date>(new Date());
// 存储更新状态
const isUpdating = ref<boolean>(false);
// 重试次数和最大重试次数
const maxRetries = 3;
const retryDelay = 5000; // 5秒后重试

// 获取企业机房总数数据
const getPriseRoomTotal = async (retries = 0): Promise<boolean> => {
  try {
    const response = await fetch('/api/stats/overview');
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    
    enterpriseRoomData.value.totalITCabinetCount = data.totalITCabinetCount;
    enterpriseRoomData.value.totalEnterpriseCount = data.totalEnterpriseCount;
    return true;
  } catch (error) {
    console.error("获取企业机房总数失败:", error);
    return false;
  }
};

// 获取已售出机柜总数数据
const getSoldCabinetTotal = async (retries = 0): Promise<boolean> => {
  // 暂时保留模拟或从新API获取
  totalSoldCabinets.value = 3200; 
  return true;
};

// 获取自用机柜数和客户机柜数
const getCabinetCounts = async (retries = 0): Promise<boolean> => {
  // 暂时保留模拟
  enterpriseRoomData.value.customerCabinets = 2800;
  enterpriseRoomData.value.selfUseCabinets = 400;
  return true;
};

// 更新所有数据
const updateAllData = async () => {
  if (isUpdating.value) return; // 防止重复更新

  isUpdating.value = true;
  console.log("开始更新资源概览数据...");

  try {
    // 并行请求所有数据，提高效率
    const results = await Promise.all([
      getPriseRoomTotal(),
      getSoldCabinetTotal(),
      getCabinetCounts(),
    ]);

    // 检查是否所有请求都成功
    const allSuccess = results.every((result) => result === true);

    if (allSuccess) {
      console.log("资源概览数据更新成功");
      lastUpdateTime.value = new Date();
    } else {
      console.warn("部分资源概览数据更新失败");
    }
  } catch (error) {
    console.error("更新资源概览数据时发生错误:", error);
  } finally {
    isUpdating.value = false;
  }
};

// 设置自动更新定时器
const setupAutoUpdate = () => {
  // 清除可能存在的旧定时器
  if (autoUpdateTimer !== null) {
    clearInterval(autoUpdateTimer);
  }

  // 设置每小时更新一次数据
  const oneHourInMs = 60 * 60 * 1000;
  autoUpdateTimer = setInterval(() => {
    updateAllData();
  }, oneHourInMs) as unknown as number;

  console.log("已设置资源概览数据每小时自动更新");
};

// 组件挂载后执行的生命周期钩子
onMounted(() => {
  // 初始加载数据
  updateAllData();
  // 设置自动更新
  setupAutoUpdate();
});

// 组件卸载前清理定时器
onUnmounted(() => {
  if (autoUpdateTimer !== null) {
    clearInterval(autoUpdateTimer);
    autoUpdateTimer = null;
  }
});
</script>

<style scoped>
/* 导入外部样式文件 */
@import "@/styles/panels.css";
</style>
