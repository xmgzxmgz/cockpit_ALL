<template>
  <transition name="backdrop-fade">
    <div
      class="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9999900]"
      @click="$emit('close')"
    ></div>
  </transition>

  <transition name="panel-pop" appear>
    <div class="room-detail-panel resource-overview-panel z-[9999990]">
      <div class="panel-header">
        <div class="header-icon">
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
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            ></path>
          </svg>
        </div>
        <h3 class="panel-title">机房详情</h3>
        <button class="close-button" @click="$emit('close')">
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
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <div class="room-info">
        <div class="room-id">
          <span class="label">机房ID</span>
          <span class="value">{{ roomData.id }}</span>
        </div>

        <!-- 机柜信息分区 -->
        <div class="rack-stats">
          <div class="rack-stat-item">
            <span class="stat-label">总机柜数</span>
            <span class="stat-value">{{ totalRacks }}</span>
          </div>
          <div class="rack-stat-item">
            <span class="stat-label">已使用</span>
            <span class="stat-value used">{{ usedRacks || 0 }}</span>
          </div>
          <div class="rack-stat-item">
            <span class="stat-label">空闲</span>
            <span class="stat-value available">{{
              totalRacks - (usedRacks || 0)
            }}</span>
          </div>
          <div class="rack-stat-item">
            <span class="stat-label">使用率</span>
            <span class="stat-value usage">
              {{
                totalRacks > 0
                  ? (((usedRacks || 0) / totalRacks) * 100).toFixed(1)
                  : "0.0"
              }}%
            </span>
          </div>
        </div>

        <!-- 企业图注分区 -->
        <div class="enterprise-legend-section">
          <h4 class="section-title">企业图注</h4>
          <div
            class="enterprise-legend"
            :class="{ scrollable: shouldEnableScroll }"
          >
            <div
              v-for="enterprise in enterpriseStats"
              :key="enterprise.name"
              class="legend-item"
            >
              <div
                class="legend-color"
                :style="{ backgroundColor: enterprise.color }"
              ></div>
              <span class="legend-name">{{ enterprise.name }}</span>
              <span class="legend-count">({{ enterprise.count }})</span>
            </div>
            <div v-if="enterpriseStats.length === 0" class="no-enterprises">
              暂无企业入驻
            </div>
          </div>
        </div>
      </div>

      <div class="panel-overlay"></div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import type { RoomData } from "@/stores/dashboard";
import { computed, onMounted, ref, watch } from "vue";
import { getEnterpriseColor } from "@/config/enterprises";
import { getRoomTotalRacks } from "@/config/roomConfig";

// 本地定义企业统计数据接口
interface EnterpriseRoomStatsData {
  fkhname: string;
  cabinetCount: number;
}

interface Props {
  roomData: RoomData;
}

const props = defineProps<Props>();
defineEmits<{
  close: [];
}>();

// 计算机房的实际机柜总数
const totalRacks = computed(() => {
  return getRoomTotalRacks(props.roomData.id);
});

// 计算企业统计信息（按数量降序排序）
const enterpriseStats = computed(() => {
  if (!roomStats.value || roomStats.value.length === 0) {
    return [];
  }

  // 转换为数组并按数量降序排序
  return roomStats.value
    .map((item: EnterpriseRoomStatsData) => ({
      name: item.fkhname,
      color: getEnterpriseColor(item.fkhname),
      count: item.cabinetCount,
    }))
    .sort((a, b) => b.count - a.count);
});

// 判断是否需要滚动（企业数量超过6个）
const shouldEnableScroll = computed(() => {
  return enterpriseStats.value.length > 6;
});

// 用于存储从API获取的企业统计数据
let roomStats = ref<EnterpriseRoomStatsData[]>([]);
let usedRacks = ref(0);
// 获取企业统计数据
const fetchEnterpriseRoomStats = async () => {
  try {
    // 使用 fetch 调用 API
    const response = await fetch('/api/stats/enterprises');
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data: EnterpriseRoomStatsData[] = await response.json();

    roomStats.value = data;
    usedRacks.value = 0;
    roomStats.value.forEach((item: EnterpriseRoomStatsData) => {
      usedRacks.value += item.cabinetCount;
    });
  } catch (error) {
    console.error("获取企业机房统计数据失败:", error);
  }
};
// 在组件挂载时获取统计数据
onMounted(() => {
  fetchEnterpriseRoomStats();
});
// 监听 roomData.id 的变化，当它改变时重新获取数据
watch(
  () => props.roomData.id,
  (newRoomId, oldRoomId) => {
    if (newRoomId !== oldRoomId) {
      fetchEnterpriseRoomStats();
    }
  },
);
</script>

<style scoped>
@import "@/styles/panels.css";

/* 机柜信息样式 */
.rack-section {
  margin-top: 20px;
}

.rack-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.rack-stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-label {
  font-size: 12px;
  color: #000000;
}

.stat-value {
  font-size: 14px;
  font-weight: 600;
  color: #000000;
}

.stat-value.used {
  color: #ff0000;
}

.stat-value.available {
  color: #00ffaa;
}

.stat-value.usage {
  color: #00d0ff;
}

/* 机房ID样式 */
.room-id {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.014);
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.room-id .label {
  font-size: 12px;
  color: #000000;
}

.room-id .value {
  font-size: 14px;
  font-weight: 600;
  color: #000000;
}

/* 企业图注样式  */
.enterprise-legend-section {
  margin-bottom: 20px;
}

.enterprise-legend {
  display: flex;
  flex-direction: column;
  gap: 8px;
  /* 默认不设置最大高度和滚动 */
  overflow-x: hidden;
  width: 100%;
}

/* 当企业数量超过6个时启用滚动 */
.enterprise-legend.scrollable {
  max-height: 192px; /* 调整高度以显示6个企业项目 (6 * 32px) */
  overflow-y: auto;
}

/* 滚动条样式 */
.enterprise-legend::-webkit-scrollbar {
  width: 6px;
}

.enterprise-legend::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.02);
  border-radius: 3px;
}

.enterprise-legend::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  transition: background 0.2s ease;
}

.enterprise-legend::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.15);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.2s ease;
  /* 确保项目不会超出容器宽度 */
  width: 100%;
  box-sizing: border-box;
}

.legend-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(2px);
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 3px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  flex-shrink: 0;
}

.legend-name {
  font-size: 13px;
  font-weight: 500;
  color: #193459;
  flex: 1;
  /* 防止名称过长导致溢出 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.legend-count {
  font-size: 12px;
  color: #000000;
  font-weight: 600;
  /* 防止计数导致溢出 */
  flex-shrink: 0;
}

.no-enterprises {
  text-align: center;
  color: #64748b;
  font-size: 12px;
  padding: 16px;
  font-style: italic;
}

/* 关闭按钮样式 */
.close-button {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #64748b;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.3);
  color: #374151;
  transform: scale(1.1);
}

.close-button:active {
  transform: scale(0.95);
}
</style>
