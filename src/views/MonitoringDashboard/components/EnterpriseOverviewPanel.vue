<template>
  <!-- 企业信息概览面板 -->
  <transition name="slide-left" appear>
    <div class="enterprise-overview-panel" v-if="!isCollapsed">
      <!-- 面板头部 -->
      <div class="panel-header">
        <div class="header-content">
          <div class="header-icon">
            <svg
              class="w-5 h-5"
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
          <div class="header-text">
            <h3 class="panel-title">企业信息概览</h3>
            <p class="panel-subtitle">Enterprise Overview Dashboard</p>
          </div>
        </div>
        <!-- 关闭按钮 -->
        <div
          class="close-button"
          @click="togglePanel"
          :aria-label="'关闭企业信息概览面板'"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </div>
      </div>

      <!-- 面板内容 -->
      <div class="panel-content" v-show="!isCollapsed">
        <!-- 搜索区域 -->
        <div class="search-section">
          <div class="search-container">
            <div class="search-input-wrapper">
              <svg
                class="search-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <input
                v-model="customerName"
                @keyup.enter="fetchEnterpriseDetails"
                @input="handleSearchInput"
                placeholder="搜索企业名称..."
                class="search-input"
                type="text"
              />
              <button
                v-if="customerName"
                @click="clearSearch"
                class="clear-button"
                aria-label="清除搜索"
              >
                <svg
                  class="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- 企业列表区域 -->
        <div class="enterprise-section">
          <div class="section-header">
            <h4 class="section-title">企业列表</h4>
            <div class="section-actions">
              <button
                @click="refreshData"
                class="refresh-button"
                :disabled="loading"
                aria-label="刷新数据"
              >
                <svg
                  class="w-4 h-4"
                  :class="{ 'animate-spin': loading }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <div class="enterprise-container">
            <!-- 加载状态 -->
            <div v-if="loading" class="loading-state">
              <div class="loading-spinner"></div>
              <p class="loading-text">正在加载企业信息...</p>
            </div>

            <!-- 空状态 -->
            <div v-else-if="enterpriseData.length === 0" class="empty-state">
              <div class="empty-icon">
                <svg
                  class="w-12 h-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  ></path>
                </svg>
              </div>
              <p class="empty-title">暂无企业信息</p>
              <p class="empty-description">
                {{
                  customerName ? "未找到匹配的企业" : "请输入企业名称进行搜索"
                }}
              </p>
            </div>

            <!-- 企业列表 -->
            <div v-else class="enterprise-list">
              <div
                v-for="(enterprise, index) in enterpriseData"
                :key="enterprise.fkhname"
                class="enterprise-item"
                :style="{ animationDelay: `${index * 0.1}s` }"
              >
                <div class="enterprise-card">
                  <div class="enterprise-header">
                    <div class="enterprise-identity">
                      <div
                        class="enterprise-avatar"
                        :style="{ backgroundColor: enterprise.color }"
                      >
                        <span class="enterprise-initial">{{
                          enterprise.fkhname.charAt(0)
                        }}</span>
                      </div>
                      <div class="enterprise-info">
                        <h5 class="enterprise-name">
                          {{ enterprise.fkhname }}
                        </h5>
                        <p class="enterprise-subtitle">Enterprise</p>
                      </div>
                    </div>
                    <div class="enterprise-badge">
                      <span class="badge-text">活跃</span>
                    </div>
                  </div>

                  <div class="enterprise-metrics">
                    <div class="metric-item">
                      <div class="metric-label">机柜总数</div>
                      <div class="metric-value">
                        {{ enterprise.totalSoldCabinets }}
                      </div>
                    </div>
                    <div class="metric-divider"></div>
                    <div class="metric-item">
                      <div class="metric-label">已上电数</div>
                      <div class="metric-value">
                        {{ enterprise.cabinetCount }}
                      </div>
                    </div>
                  </div>

                  <div class="enterprise-distribution">
                    <div class="distribution-header">
                      <span class="distribution-label">机房分布</span>
                    </div>
                    <div class="distribution-content">
                      <div class="room-tags">
                        <span
                          v-for="room in getRoomList(enterprise.roomNames)"
                          :key="room"
                          class="room-tag clickable-room-tag"
                          @click="handleRoomTagClick(room.slice(0, 3))"
                        >
                          {{ room.indexOf("机房") > -1 ? room : room + "机房" }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- 客户经理模块 -->
                  <div class="customer-manager">
                    <div class="manager-content">
                      <div class="manager-avatar">
                        <span class="manager-initial">
                          {{
                            enterprise.khmanage
                              ? enterprise.khmanage.charAt(0)
                              : "待"
                          }}
                        </span>
                      </div>
                      <div class="manager-info">
                        <span class="manager-label">客户经理</span>
                        <span class="manager-name">{{
                          enterprise.khmanage || "待分配"
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <!-- 展开按钮（面板关闭时显示） -->
  <div
    v-if="isCollapsed"
    class="expand-button"
    @click="togglePanel"
    :aria-label="'展开企业信息概览面板'"
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from "vue";
import { getEnterpriseColor } from "@/config/enterprises";

// 模拟企业数据接口类型
interface EnterpriseRoomStatsByNameData {
  fkhname: string;
  totalSoldCabinets: number;
  cabinetCount: number;
  roomNames: string;
  khmanage: string;
  color?: string;
}

// 模拟获取企业数据函数
const getEnterpriseRoomStatsByName = async (name: string) => {
  // 模拟延迟
  await new Promise((resolve) => setTimeout(resolve, 500));

  // 返回示例数据
  const mockData: EnterpriseRoomStatsByNameData[] = [
    {
      fkhname: "示例企业A",
      totalSoldCabinets: 120,
      cabinetCount: 85,
      roomNames: "301机房, 302机房",
      khmanage: "张经理",
    },
    {
      fkhname: "示例企业B",
      totalSoldCabinets: 80,
      cabinetCount: 60,
      roomNames: "401机房",
      khmanage: "李经理",
    },
    {
      fkhname: "示例企业C",
      totalSoldCabinets: 200,
      cabinetCount: 150,
      roomNames: "301机房, 402机房, 501机房",
      khmanage: "王经理",
    },
    {
      fkhname: "示例企业D",
      totalSoldCabinets: 50,
      cabinetCount: 30,
      roomNames: "502机房",
      khmanage: "赵经理",
    },
    {
      fkhname: "示例企业E",
      totalSoldCabinets: 100,
      cabinetCount: 90,
      roomNames: "601机房",
      khmanage: "孙经理",
    },
  ];

  // 如果有搜索名称，进行过滤
  if (name) {
    const filtered = mockData.filter((item) => item.fkhname.includes(name));
    return { success: true, data: filtered, msg: "success" };
  }

  return { success: true, data: mockData, msg: "success" };
};

const emit = defineEmits<{
  close: [];
  "room-click": [roomId: string];
}>();

const loading = ref(true);
let enterpriseData = ref<EnterpriseRoomStatsByNameData[]>([]);
let customerName = ref<string>("");
const isCollapsed = ref(false);
let autoRefreshTimer: number | null = null;
const lastUpdateTime = ref<Date>(new Date());

// 切换面板展开/收起状态
const togglePanel = () => {
  isCollapsed.value = !isCollapsed.value;
};

// 计算总机柜数

// 获取机房列表 - 根据企业的机房分布显示对应机房
const getRoomList = (roomNames: string) => {
  if (!roomNames) return [];
  return roomNames
    .split(",")
    .map((room) => room.trim())
    .filter((room) => room);
};

// 处理搜索输入
const handleSearchInput = () => {
  // 可以在这里添加实时搜索逻辑
};

// 清除搜索
const clearSearch = () => {
  customerName.value = "";
  enterpriseData.value = [];
};

// 刷新数据
const refreshData = () => {
  fetchEnterpriseDetails();
  lastUpdateTime.value = new Date();
};

// 处理机房标签点击事件
const handleRoomTagClick = (roomId: string) => {
  console.log("Room tag clicked:", roomId);
  emit("room-click", roomId);
};

// 获取企业详细信息
const fetchEnterpriseDetails = async () => {
  try {
    loading.value = true;
    const response = await getEnterpriseRoomStatsByName(customerName.value);

    if (response.success) {
      // 为每个企业添加颜色和客户经理信息
      enterpriseData.value = response.data.map((enterprise) => ({
        ...enterprise,
        color: getEnterpriseColor(enterprise.fkhname),
      }));
    } else {
      console.error("获取企业详细信息失败:", response.msg);
    }
  } catch (error) {
    console.error("获取企业详细信息异常:", error);
  } finally {
    loading.value = false;
  }
};

// 设置自动刷新
const setupAutoRefresh = () => {
  // 清除可能存在的旧定时器
  if (autoRefreshTimer !== null) {
    clearInterval(autoRefreshTimer);
  }

  // 设置每30分钟自动刷新一次数据
  const thirtyMinutesInMs = 60 * 60 * 1000;
  autoRefreshTimer = setInterval(() => {
    console.log("自动刷新企业信息数据");
    fetchEnterpriseDetails();
    lastUpdateTime.value = new Date();
  }, thirtyMinutesInMs) as unknown as number;
};

onMounted(() => {
  fetchEnterpriseDetails();
  setupAutoRefresh();
});

onUnmounted(() => {
  if (autoRefreshTimer !== null) {
    clearInterval(autoRefreshTimer);
    autoRefreshTimer = null;
  }
});

// 暴露给父组件的方法和属性
defineExpose({
  isCollapsed,
  togglePanel,
  refreshData,
  lastUpdateTime,
});
</script>

<style scoped>
/* 关闭按钮样式 */
.close-button {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ef4444;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(239, 68, 68, 0.5);
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  color: #dc2626;
}

/* 展开按钮样式 */
.expand-button {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.95),
    rgba(255, 255, 255, 0.85)
  );
  backdrop-filter: blur(20px);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  z-index: 10000;
}

.expand-button:hover {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0.95)
  );
  border-color: rgba(59, 130, 246, 0.5);
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  color: #2563eb;
}

/* 主面板容器 - 统一使用panels.css圆角样式 */
.enterprise-overview-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 420px;
  height: 100vh;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.4)
  );
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 26px 0 0 26px;
  box-shadow:
    -24px 0 64px rgba(0, 0, 0, 0.08),
    -12px 0 36px rgba(59, 130, 246, 0.08);
  z-index: 9998;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 面板头部 - 统一使用panels.css样式 */
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  position: relative;
  z-index: 1;
  padding: 25px 24px 15px;
}

.panel-header::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 24px;
  right: 24px;
  height: 2px;
  background: linear-gradient(90deg, rgba(59, 130, 246, 0.3), transparent);
  border-radius: 1px;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 14px;
}

.header-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.35);
}

.header-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.panel-title {
  font-size: 21px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  letter-spacing: -0.2px;
}

.panel-subtitle {
  font-size: 13px;
  color: #64748b;
  margin: 0;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* 面板内容 */
.panel-content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* 搜索区域 - 统一风格 */
.search-section {
  padding: 16px 24px;
}

.search-container {
  margin-bottom: 0;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 14px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
}

.search-icon {
  position: absolute;
  left: 16px;
  width: 18px;
  height: 18px;
  color: #9ca3af;
  z-index: 1;
}

.search-input {
  flex: 1;
  padding: 16px 16px 16px 48px;
  border: none;
  outline: none;
  font-size: 15px;
  color: #374151;
  background: transparent;
}

.search-input::placeholder {
  color: #9ca3af;
  font-weight: 400;
}

.clear-button {
  position: absolute;
  right: 12px;
  width: 24px;
  height: 24px;
  border: none;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-button:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

/* 统计卡片 - 统一使用panels.css样式 */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 18px;
  padding: 20px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
}

.stat-card:hover {
  background: rgba(255, 255, 255, 0.5);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.stat-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  border-radius: 16px 16px 0 0;
}

.stat-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 32px;
  font-weight: 800;
  color: #1e293b;
  line-height: 1;
  margin-bottom: 6px;
  letter-spacing: -0.5px;
}

.stat-label {
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

/* 企业列表区域 */
.enterprise-section {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px 12px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.section-actions {
  display: flex;
  gap: 8px;
}

.refresh-button {
  width: 36px;
  height: 36px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.4);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.refresh-button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.5);
  border-color: rgba(59, 130, 246, 0.3);
  color: #3b82f6;
  transform: translateY(-1px);
}

.refresh-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* 企业容器 - 统一使用panels.css样式 */
.enterprise-container {
  flex: 1;
  overflow-y: auto;
  padding: 0 24px 24px;
}

/* 加载状态 */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 240px;
  color: #64748b;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e2e8f0;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

.loading-text {
  font-size: 15px;
  font-weight: 500;
  margin: 0;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 240px;
  text-align: center;
}

.empty-icon {
  width: 80px;
  height: 80px;
  background: rgba(148, 163, 184, 0.1);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  margin-bottom: 20px;
}

.empty-title {
  font-size: 16px;
  font-weight: 600;
  color: #64748b;
  margin: 0 0 8px 0;
}

.empty-description {
  font-size: 14px;
  color: #94a3b8;
  margin: 0;
}

/* 企业列表 */
.enterprise-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.enterprise-item {
  animation: slideInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) both;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.enterprise-card {
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 18px;
  padding: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.enterprise-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  border-radius: 16px 16px 0 0;
}

.enterprise-card:hover {
  background: rgba(255, 255, 255, 0.5);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.enterprise-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.enterprise-identity {
  display: flex;
  align-items: center;
  gap: 14px;
}

.enterprise-avatar {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.enterprise-initial {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.enterprise-info {
  flex: 1;
}

.enterprise-name {
  font-size: 18px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 4px 0;
  letter-spacing: -0.025em;
  max-width: 200px;
  /* Add max-width to limit the name length */
}

.enterprise-subtitle {
  font-size: 12px;
  color: #64748b;
  margin: 0;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.enterprise-badge {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
}

.badge-text {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* 企业指标 */
.enterprise-metrics {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.metric-item {
  flex: 1;
  text-align: center;
  gap: 2px;
}

.metric-label {
  font-size: 10px;
  color: #64748b;
  font-weight: 500;
  margin-bottom: 2px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.metric-value {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  line-height: 1;
}

.metric-divider {
  width: 1px;
  height: 32px;
  background: rgba(59, 130, 246, 0.2);
}

/* 企业分布 */
.enterprise-distribution {
  border-top: 1px solid rgba(59, 130, 246, 0.1);
  padding-top: 12px;
}

.distribution-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.distribution-label {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

.distribution-count {
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
}

.distribution-content {
  margin-top: 6px;
}

.room-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.room-tag {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  border: 1px solid rgba(59, 130, 246, 0.2);
  transition: all 0.2s ease;
}

.room-tag:hover {
  background: rgba(59, 130, 246, 0.15);
  border-color: rgba(59, 130, 246, 0.3);
}

.clickable-room-tag {
  cursor: pointer;
  user-select: none;
}

.clickable-room-tag:hover {
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.4);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
}

.clickable-room-tag:active {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(59, 130, 246, 0.2);
}

/* 过渡动画 */
.backdrop-fade-enter-active,
.backdrop-fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.backdrop-fade-enter-from,
.backdrop-fade-leave-to {
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(100%);
}

/* 响应式设计  */
@media (max-width: 768px) {
  .enterprise-overview-panel {
    width: 100vw;
    left: 0;
    right: 0;
  }

  .panel-header,
  .search-stats-section,
  .section-header,
  .enterprise-container {
    padding-left: 20px;
    padding-right: 20px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .enterprise-metrics {
    flex-direction: column;
    gap: 16px;
  }

  .metric-divider {
    width: 100%;
    height: 1px;
  }
}

@media (max-width: 480px) {
  .panel-header {
    padding: 20px 16px 16px;
  }

  .panel-title {
    font-size: 18px;
  }

  .search-stats-section {
    padding: 16px;
  }

  .enterprise-container {
    padding: 0 16px 16px;
  }

  .enterprise-card {
    padding: 20px;
  }
}

/* 滚动条样式 */
.enterprise-container::-webkit-scrollbar {
  width: 6px;
}

.enterprise-container::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.02);
  border-radius: 3px;
}

.enterprise-container::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  transition: background 0.2s ease;
}

.enterprise-container::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.15);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* 客户经理模块样式 */
.customer-manager {
  margin-top: 8px;
  padding: 8px 12px;
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.08) 0%,
    rgba(147, 51, 234, 0.08) 100%
  );
  border-radius: 6px;
  border: 1px solid rgba(59, 130, 246, 0.15);
  backdrop-filter: blur(10px);
}

.manager-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.manager-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.manager-initial {
  font-size: 12px;
  font-weight: 700;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.manager-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex: 1;
  min-width: 0;
}

.manager-label {
  font-size: 12px;
  font-weight: 500;
  color: rgba(59, 130, 246, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: 1;
}

.manager-name {
  font-size: 13px;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.2;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
