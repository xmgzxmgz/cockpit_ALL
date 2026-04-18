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
            <span class="stat-value">{{ roomStatsData.totalCabinets }}</span>
          </div>
          <div class="rack-stat-item">
            <span class="stat-label">已使用</span>
            <span class="stat-value used">{{ roomStatsData.usedCabinets }}</span>
          </div>
          <div class="rack-stat-item">
            <span class="stat-label">空闲</span>
            <span class="stat-value available">{{ roomStatsData.freeCabinets }}</span>
          </div>
          <div class="rack-stat-item">
            <span class="stat-label">使用率</span>
            <span class="stat-value usage">{{ roomStatsData.usageRate }}%</span>
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

        <div class="feature-section">
          <h4 class="section-title">功能模块 ({{ features.length }})</h4>

          <!-- 分类标签页 -->
          <div class="category-tabs">
            <button
              class="tab-item"
              :class="{ active: activeCategory === 'ALL' }"
              @click="activeCategory = 'ALL'"
            >
              全部
            </button>
            <button
              v-for="cat in categories"
              :key="cat.code"
              class="tab-item"
              :class="{ active: activeCategory === cat.code }"
              @click="activeCategory = cat.code"
            >
              {{ cat.name }}
            </button>
          </div>

          <div class="feature-grid">
            <div
              v-for="feature in filteredFeatures"
              :key="feature.code"
              class="feature-item"
              :class="feature.severity"
            >
              <div class="feature-header">
                <span class="feature-code">{{ feature.code }}</span>
                <span class="feature-status" :class="feature.status">
                  {{ getStatusLabel(feature.status) }}
                </span>
              </div>
              <div class="feature-name">{{ feature.name }}</div>
              <div class="feature-desc-preview" :title="feature.description">
                {{ feature.description }}
              </div>
              <div class="feature-meta">
                {{ feature.latest_value || "-" }} {{ feature.unit || "" }}
              </div>
              <div class="feature-action-bar">
                <button
                  class="action-button secondary"
                  @click.stop="toggleFeature(feature.code)"
                >
                  {{ activeFeatureCode === feature.code ? "收起" : "操作" }}
                </button>
                <span class="feature-action-status">{{
                  featureActionStatus[feature.code] || ""
                }}</span>
              </div>
              <div
                v-if="activeFeatureCode === feature.code"
                class="feature-actions"
              >
                <div class="action-row">
                  <input
                    v-model="getFeatureForm(feature).metricValue"
                    class="action-input"
                    placeholder="指标值"
                  />
                  <button
                    class="action-button"
                    @click.stop="submitMetric(feature)"
                  >
                    写入指标
                  </button>
                </div>
                <div class="action-row">
                  <select
                    v-model="getFeatureForm(feature).status"
                    class="action-select"
                  >
                    <option value="normal">正常</option>
                    <option value="warning">注意</option>
                    <option value="critical">告警</option>
                    <option value="active">活跃</option>
                    <option value="resolved">已恢复</option>
                  </select>
                  <select
                    v-model="getFeatureForm(feature).severity"
                    class="action-select"
                  >
                    <option value="info">信息</option>
                    <option value="warning">警告</option>
                    <option value="critical">严重</option>
                  </select>
                  <button
                    class="action-button"
                    @click.stop="submitFeatureUpdate(feature)"
                  >
                    更新状态
                  </button>
                </div>
                <div class="action-row">
                  <input
                    v-model="getFeatureForm(feature).message"
                    class="action-input"
                    placeholder="告警内容"
                  />
                  <input
                    v-if="feature.code === '7.02'"
                    v-model="getFeatureForm(feature).channels"
                    class="action-input"
                    placeholder="通道: 短信,钉钉,企业微信"
                  />
                  <button
                    v-if="feature.code === '7.02'"
                    class="action-button"
                    @click.stop="sendMultiChannelAlert(feature)"
                  >
                    多渠道通知
                  </button>
                  <button
                    v-else
                    class="action-button"
                    @click.stop="submitAlert(feature)"
                  >
                    触发告警
                  </button>
                </div>
                <div class="feature-history">
                  <div class="history-block">
                    <div class="history-title">最近指标</div>
                    <div
                      v-for="metric in activeMetrics"
                      :key="metric.id"
                      class="history-item"
                    >
                      <span class="history-value">
                        {{ metric.metric_value }} {{ metric.unit || "" }}
                      </span>
                      <span class="history-time">{{
                        formatTime(metric.collected_at)
                      }}</span>
                    </div>
                    <div
                      v-if="activeMetrics.length === 0"
                      class="history-empty"
                    >
                      暂无指标记录
                    </div>
                  </div>
                  <div class="history-block">
                    <div class="history-title">最近告警</div>
                    <div
                      v-for="alert in activeFeatureAlerts"
                      :key="alert.id"
                      class="history-item"
                    >
                      <span class="history-value">{{ alert.message }}</span>
                      <span class="history-time">{{
                        formatTime(alert.triggered_at)
                      }}</span>
                    </div>
                    <div
                      v-if="activeFeatureAlerts.length === 0"
                      class="history-empty"
                    >
                      暂无告警记录
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="features.length === 0" class="feature-empty">
              {{ featureError || "暂无功能数据" }}
            </div>
          </div>
        </div>

        <div class="alert-section">
          <h4 class="section-title">告警列表</h4>
          <div class="alert-list">
            <div
              v-for="alert in alerts"
              :key="alert.id"
              class="alert-item"
              :class="alert.severity"
            >
              <div class="alert-title">{{ alert.title }}</div>
              <div class="alert-message">{{ alert.message }}</div>
              <div class="alert-meta">
                <span class="alert-severity">{{ alert.severity }}</span>
                <span class="alert-status">{{ alert.status }}</span>
                <span class="alert-time">{{
                  formatTime(alert.triggered_at)
                }}</span>
              </div>
            </div>
            <div v-if="alerts.length === 0" class="alert-empty">
              {{ alertError || "暂无告警数据" }}
            </div>
          </div>
          <div class="alert-actions">
            <button
              class="action-button"
              :disabled="isSendingAlert"
              @click="sendMultiChannelAlert"
            >
              {{ isSendingAlert ? "发送中..." : "发送多渠道通知" }}
            </button>
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
import {
  getMonitoringFeatures,
  getFeatureMetrics,
  getAlerts,
  updateFeatureStatus,
  submitFeatureMetric,
  triggerAlert,
  sendMultiChannelNotification,
  getFeatureCategories,
  type FeatureCategory,
} from "@/api/monitoring";

import { roomLayoutApi } from "@/api/roomLayout";

// 本地定义企业统计数据接口
interface EnterpriseRoomStatsData {
  fkhname: string;
  cabinetCount: number;
}

interface FeatureItem {
  code: string;
  name: string;
  description?: string;
  category_code?: string;
  enabled: boolean;
  status: string;
  severity: string;
  unit?: string | null;
  latest_value?: string | null;
}

interface AlertItem {
  id: number;
  feature_code: string;
  rule_id?: number | null;
  title: string;
  message: string;
  severity: string;
  status: string;
  triggered_at: string;
  resolved_at?: string | null;
}

interface Props {
  roomData: RoomData;
}

const props = defineProps<Props>();
defineEmits<{
  close: [];
}>();

// 计算机房的实际机柜总数
const totalRacks = ref(0);

// 计算机房的统计数据
const roomStatsData = ref({
  totalCabinets: 0,
  usedCabinets: 0,
  freeCabinets: 0,
  usageRate: 0
});

// 在组件挂载时调用函数
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

// 在组件挂载时获取数据
onMounted(async () => {
  await fetchEnterpriseRoomStats();
  await fetchRoomStatistics();
  await fetchCategories();
  await fetchFeatures();
  await fetchAlerts();
});

// 监听 roomData 变化，重新获取数据
watch(() => props.roomData, async () => {
  await fetchEnterpriseRoomStats();
  await fetchRoomStatistics();
}, { deep: true });

// 判断是否需要滚动（企业数量超过12个）
const shouldEnableScroll = computed(() => {
  return enterpriseStats.value.length > 12;
});

// 用于存储从API获取的企业统计数据
const roomStats = ref<EnterpriseRoomStatsData[]>([]);
const usedRacks = ref(0);
const features = ref<FeatureItem[]>([]);
const alerts = ref<AlertItem[]>([]);
const featureError = ref("");
const alertError = ref("");
const isSendingAlert = ref(false);

// 新增的状态变量
const activeCategory = ref("ALL");
const categories = ref<FeatureCategory[]>([]);
const activeFeatureCode = ref<string | null>(null);
const activeMetrics = ref<any[]>([]);
const activeFeatureAlerts = ref<any[]>([]);
const featureForms = ref<Record<string, any>>({});
const featureActionStatus = ref<Record<string, string>>({});

// 计算过滤后的功能列表
const filteredFeatures = computed(() => {
  if (activeCategory.value === "ALL") {
    return features.value;
  }
  return features.value.filter((f) => f.category_code === activeCategory.value);
});

// 获取功能分类
const fetchCategories = async () => {
  try {
    const response = await getFeatureCategories();
    categories.value = response.data || response;
  } catch (error) {
    console.error("获取功能分类失败:", error);
  }
};

// 获取表单数据
const getFeatureForm = (feature: any) => {
  if (!featureForms.value[feature.code]) {
    featureForms.value[feature.code] = {
      metricValue: "",
      status: feature.status,
      severity: feature.severity,
      message: "",
      channels: "",
    };
  }
  return featureForms.value[feature.code];
};

// 切换功能展开/收起
const toggleFeature = async (code: string) => {
  if (activeFeatureCode.value === code) {
    activeFeatureCode.value = null;
    return;
  }

  activeFeatureCode.value = code;
  try {
    const [metricsRes, alertsRes] = await Promise.all([
      getFeatureMetrics(code),
      getAlerts(),
    ]);
    activeMetrics.value = metricsRes.data || metricsRes;
    activeFeatureAlerts.value = (alertsRes.data || alertsRes).filter(
      (a: any) => a.feature_code === code,
    );
  } catch (e) {
    console.error(e);
  }
};

// 提交指标
const submitMetric = async (feature: any) => {
  const form = getFeatureForm(feature);
  if (!form.metricValue) return;

  featureActionStatus.value[feature.code] = "提交中...";
  try {
    await submitFeatureMetric(feature.code, {
      metric_key: "manual_input",
      metric_value: form.metricValue,
      unit: feature.unit,
    });
    featureActionStatus.value[feature.code] = "成功";
    // 刷新指标
    const metricsRes = await getFeatureMetrics(feature.code);
    activeMetrics.value = metricsRes.data || metricsRes;
    // 刷新列表以更新最新值
    await fetchFeatures();
  } catch (e) {
    featureActionStatus.value[feature.code] = "失败";
  } finally {
    setTimeout(() => {
      featureActionStatus.value[feature.code] = "";
    }, 2000);
  }
};

// 更新功能状态
const submitFeatureUpdate = async (feature: any) => {
  const form = getFeatureForm(feature);
  featureActionStatus.value[feature.code] = "更新中...";
  try {
    await updateFeatureStatus(feature.code, {
      status: form.status,
      severity: form.severity,
    });
    featureActionStatus.value[feature.code] = "成功";
    // 刷新列表
    await fetchFeatures();
  } catch (e) {
    featureActionStatus.value[feature.code] = "失败";
  } finally {
    setTimeout(() => {
      featureActionStatus.value[feature.code] = "";
    }, 2000);
  }
};

// 触发告警
const submitAlert = async (feature: any) => {
  const form = getFeatureForm(feature);
  if (!form.message) return;

  featureActionStatus.value[feature.code] = "告警中...";
  try {
    await triggerAlert({
      feature_code: feature.code,
      title: "手动触发告警",
      message: form.message,
      severity: form.severity,
    });
    featureActionStatus.value[feature.code] = "成功";
    // 刷新告警
    await fetchAlerts();
    const allAlerts = await getAlerts();
    activeFeatureAlerts.value = allAlerts.filter(
      (a: any) => a.feature_code === feature.code,
    );
  } catch (e) {
    featureActionStatus.value[feature.code] = "失败";
  } finally {
    setTimeout(() => {
      featureActionStatus.value[feature.code] = "";
    }, 2000);
  }
};

// 获取企业统计数据
const fetchEnterpriseRoomStats = async () => {
  try {
    const cabinets = await roomLayoutApi.getRoomCabinets(props.roomData.id, false);
    
    // 计算企业统计数据
    const enterpriseCounts: Record<string, number> = {};
    cabinets.forEach((cabinet: any) => {
      if (cabinet.enterprise && cabinet.enterprise !== "未启用") {
        if (enterpriseCounts[cabinet.enterprise]) {
          enterpriseCounts[cabinet.enterprise]++;
        } else {
          enterpriseCounts[cabinet.enterprise] = 1;
        }
      }
    });
    
    // 转换为数组格式
    const data: EnterpriseRoomStatsData[] = Object.entries(enterpriseCounts).map(([name, count]) => ({
      fkhname: name,
      cabinetCount: count
    }));

    roomStats.value = data;
    usedRacks.value = 0;
    roomStats.value.forEach((item: EnterpriseRoomStatsData) => {
      usedRacks.value += item.cabinetCount;
    });
  } catch (error) {
    console.error("获取企业机房统计数据失败:", error);
  }
};

// 获取机房统计数据
const fetchRoomStatistics = async () => {
  try {
    const data = await roomLayoutApi.getRoomCabinetStatistics(props.roomData.id);
    roomStatsData.value = data;
    totalRacks.value = data.totalCabinets;
  } catch (error) {
    console.error("获取机房统计数据失败:", error);
  }
};

const fetchFeatures = async () => {
  try {
    featureError.value = "";
    const response = await getMonitoringFeatures();
    features.value = response.data || response;
  } catch (error) {
    console.error("获取功能模块失败:", error);
    featureError.value = "功能模块加载失败";
    features.value = [];
  }
};

const fetchAlerts = async () => {
  try {
    alertError.value = "";
    const response = await getAlerts();
    alerts.value = response.data || response;
  } catch (error) {
    console.error("获取告警列表失败:", error);
    alertError.value = "告警列表加载失败";
    alerts.value = [];
  }
};

const sendMultiChannelAlert = async (feature?: any) => {
  try {
    isSendingAlert.value = true;
    // 如果是按钮直接调用（非功能内），feature 可能是 Event 对象，需要判断
    const isFeature = feature && feature.code;
    const form = isFeature
      ? getFeatureForm(feature)
      : { channels: "短信,钉钉" };
    const channels = form.channels
      ? form.channels.split(/[,，]/).map((s: string) => s.trim())
      : ["短信", "钉钉"];

    await sendMultiChannelNotification({
      feature_code: isFeature ? feature.code : "7.02",
      message: isFeature
        ? `功能 ${feature.name} 触发多渠道通知`
        : `机房${props.roomData.id}触发多渠道通知`,
      severity: "info",
      channels: channels,
    });

    if (isFeature) {
      featureActionStatus.value[feature.code] = "发送成功";
      setTimeout(() => {
        featureActionStatus.value[feature.code] = "";
      }, 2000);
    }
    await fetchAlerts();
  } catch (error) {
    console.error("发送多渠道通知失败:", error);
    if (feature && feature.code) {
      featureActionStatus.value[feature.code] = "发送失败";
    }
  } finally {
    isSendingAlert.value = false;
  }
};

const formatTime = (time: string) => {
  const date = new Date(time);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }
  return date.toLocaleString();
};

const getStatusLabel = (status: string) => {
  const mapping: Record<string, string> = {
    normal: "正常",
    warning: "注意",
    critical: "告警",
    active: "活跃",
    resolved: "已恢复",
  };
  return mapping[status] || status;
};
// 在组件挂载时获取统计数据
onMounted(() => {
  fetchEnterpriseRoomStats();
  fetchRoomStatistics();
  fetchCategories();
  fetchFeatures();
  fetchAlerts();
});
// 监听 roomData.id 的变化，当它改变时重新获取数据
watch(
  () => props.roomData.id,
  (newRoomId, oldRoomId) => {
    if (newRoomId !== oldRoomId) {
      fetchEnterpriseRoomStats();
      fetchRoomStatistics();
      fetchFeatures();
      fetchAlerts();
    }
  },
);
</script>

<style scoped>
@import "@/styles/panels.css";

/* 调整面板内部容器宽度 */
.room-detail-panel {
  position: fixed;
  top: 50%;
  right: 0px;
  transform: translateY(-50%);
  width: 550px;
  max-height: 90vh;
  overflow-y: auto;
  z-index: 9999990;
  background: linear-gradient(135deg, #e0f2fe, #dbeafe);
  border-radius: 26px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.15);
}

/* 确保面板内容宽度匹配 */
.room-info {
  position: relative;
  z-index: 1;
  padding: 0 15px;
  width: 100%;
  box-sizing: border-box;
  overflow: visible;
}

/* 移除原来的遮罩，因为我们已经有了统一的背景 */
.panel-overlay {
  display: none;
}

/* 面板头部样式 */
.panel-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 15px;
  border-bottom: 1px solid rgba(59, 130, 246, 0.2);
  background: rgba(255, 255, 255, 0.7);
  border-radius: 26px 26px 0 0;
  margin-bottom: 15px;
}

.panel-title {
  font-size: 16px;
  font-weight: 600;
  color: #1e40af;
  margin: 0;
}

.header-icon {
  color: #3b82f6;
}

/* 机柜信息样式 */
.rack-section {
  margin-top: 20px;
}

.rack-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-bottom: 15px;
  width: 100%;
  box-sizing: border-box;
}

.rack-stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 6px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);
}

.stat-label {
  font-size: 12px;
  color: #1e40af;
}

.stat-value {
  font-size: 14px;
  font-weight: 600;
  color: #1e40af;
}

.stat-value.used {
  color: #dc2626;
}

.stat-value.available {
  color: #059669;
}

.stat-value.usage {
  color: #2563eb;
}

/* 机房ID样式 */
.room-id {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 10px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 14px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  margin-bottom: 10px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
}

.room-id .label {
  font-size: 12px;
  color: #1e40af;
}

.room-id .value {
  font-size: 14px;
  font-weight: 600;
  color: #1e40af;
}

/* 企业图注样式  */
.enterprise-legend-section {
  margin-bottom: 18px;
}

.enterprise-legend {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  /* 默认不设置最大高度和滚动 */
  overflow-x: hidden;
  width: 100%;
}

/* 当企业数量超过12个时启用滚动 */
.enterprise-legend.scrollable {
  max-height: 300px; /* 调整高度以显示12个企业项目 (12 * 25px) */
  overflow-y: auto;
}

/* 图例项样式 */
.legend-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 6px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  transition: all 0.2s ease;
  /* 确保项目不会超出容器宽度 */
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);
}

/* 滚动条样式 */
.enterprise-legend::-webkit-scrollbar {
  width: 4px;
}

.enterprise-legend::-webkit-scrollbar-track {
  background: rgba(59, 130, 246, 0.1);
  border-radius: 2px;
}

.enterprise-legend::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.3);
  border-radius: 2px;
  transition: background 0.2s ease;
}

.enterprise-legend::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.5);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  transition: all 0.2s ease;
  /* 确保项目不会超出容器宽度 */
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);
}

.legend-item:hover {
  background: rgba(255, 255, 255, 0.95);
  transform: translateX(2px);
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.15);
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 3px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  flex-shrink: 0;
}

.legend-name {
  font-size: 13px;
  font-weight: 500;
  color: #1e40af;
  flex: 1;
  /* 防止名称过长导致溢出 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.legend-count {
  font-size: 12px;
  color: #1e40af;
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
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

/* 关闭按钮样式 */
.close-button {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #1e40af;
}

.close-button:hover {
  background: rgba(59, 130, 246, 0.2);
  color: #1e40af;
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.2);
}

.close-button:active {
  transform: scale(0.95);
}

.feature-section,
.alert-section {
  margin-bottom: 15px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.section-title::before {
  content: '';
  width: 4px;
  height: 14px;
  background: #3b82f6;
  border-radius: 2px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
  width: 100%;
  box-sizing: border-box;
}

.feature-item {
  padding: 6px;
  border-radius: 8px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  gap: 3px;
  transition: all 0.3s ease;
  width: 100%;
  box-sizing: border-box;
  min-height: 100px;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);
}

.feature-item:hover {
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.15);
}

.feature-item.warning {
  border-color: rgba(245, 158, 11, 0.4);
  background: rgba(255, 248, 225, 0.8);
}

.feature-item.critical {
  border-color: rgba(239, 68, 68, 0.4);
  background: rgba(254, 226, 226, 0.8);
}

.feature-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.feature-code {
  font-size: 12px;
  font-weight: 600;
  color: #1e40af;
}

.feature-status {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 10px;
  background: rgba(59, 130, 246, 0.1);
  color: #1e40af;
}

.feature-name {
  font-size: 13px;
  font-weight: 600;
  color: #1e40af;
}

.feature-meta {
  font-size: 12px;
  color: #475569;
}

.feature-empty,
.alert-empty {
  grid-column: 1 / -1;
  text-align: center;
  color: #64748b;
  font-size: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);
}

.alert-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 250px;
  overflow-y: auto;
  padding-right: 6px;
}

.alert-item {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);
}

.alert-item:hover {
  background: rgba(255, 255, 255, 0.95);
  transform: translateX(4px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.15);
}

/* 告警列表滚动条样式 */
.alert-list::-webkit-scrollbar {
  width: 4px;
}

.alert-list::-webkit-scrollbar-track {
  background: rgba(59, 130, 246, 0.1);
  border-radius: 2px;
}

.alert-list::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.3);
  border-radius: 2px;
  transition: background 0.2s ease;
}

.alert-list::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.5);
}

/* 面板滚动条样式 */
.room-detail-panel::-webkit-scrollbar {
  width: 4px;
}

.room-detail-panel::-webkit-scrollbar-track {
  background: rgba(59, 130, 246, 0.1);
  border-radius: 2px;
}

.room-detail-panel::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.3);
  border-radius: 2px;
  transition: background 0.2s ease;
}

.room-detail-panel::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.5);
}

.alert-item.warning {
  border-color: rgba(245, 158, 11, 0.4);
  background: rgba(255, 248, 225, 0.8);
}

.alert-item.critical {
  border-color: rgba(239, 68, 68, 0.4);
  background: rgba(254, 226, 226, 0.8);
}

.alert-title {
  font-size: 13px;
  font-weight: 600;
  color: #1e40af;
}

.alert-message {
  font-size: 12px;
  color: #475569;
  line-height: 1.4;
}

.alert-meta {
  display: flex;
  gap: 10px;
  font-size: 11px;
  color: #64748b;
}

.alert-actions {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}

.action-button {
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: #ffffff;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
}

.action-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
}

.action-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* 分类标签页样式 */
.category-tabs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 8px;
  margin-bottom: 12px;
  -webkit-overflow-scrolling: touch;
}

.category-tabs::-webkit-scrollbar {
  height: 4px;
}

.category-tabs::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.3);
  border-radius: 2px;
}

.tab-item {
  flex-shrink: 0;
  padding: 4px 10px;
  border-radius: 14px;
  font-size: 12px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(59, 130, 246, 0.2);
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);
}

.tab-item:hover {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.15);
}

.tab-item.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
}

.feature-desc-preview {
  font-size: 11px;
  color: #64748b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 4px;
}
</style>
