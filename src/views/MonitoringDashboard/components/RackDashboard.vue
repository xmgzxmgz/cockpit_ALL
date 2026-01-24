<template>
  <transition name="fade" appear>
    <div class="rack-dashboard-overlay" @click.self="$emit('close')">
      <div class="rack-dashboard-container">
        <!-- Header -->
        <div class="dashboard-header">
          <div class="header-left">
            <div class="icon-box">
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
                  d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 01-2 2v4a2 2 0 012 2h14a2 2 0 012-2v-4a2 2 0 01-2-2m-2-4h.01M17 16h.01"
                ></path>
              </svg>
            </div>
            <div class="title-group">
              <h2>{{ rackData?.cabinet_label || rack.visibleIndex }}号机柜</h2>
              <span class="sub-title">{{ roomName }}</span>
            </div>
          </div>
          <button class="close-btn" @click="$emit('close')">
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
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="dashboard-content" v-if="!loading && rackData">
          <!-- Left Column: Basic Info & Status -->
          <div class="col-left">
            <!-- Enterprise Info Card -->
            <div class="info-card enterprise-card">
              <h3>所属企业</h3>
              <div class="enterprise-info">
                <div
                  class="ent-icon"
                  :style="{
                    backgroundColor: rackData.enterprise_name
                      ? '#3b82f6'
                      : '#9ca3af',
                  }"
                >
                  {{
                    rackData.enterprise_name
                      ? rackData.enterprise_name.substring(0, 1)
                      : "空"
                  }}
                </div>
                <div class="ent-details">
                  <span class="ent-name">{{
                    rackData.enterprise_name || "当前空闲"
                  }}</span>
                  <span
                    class="status-badge"
                    :class="
                      rackData.status === 'active' ? 'active' : 'inactive'
                    "
                  >
                    {{ rackData.status === "active" ? "运行中" : "未启用" }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Capacity Card -->
            <div class="info-card capacity-card">
              <h3>空间使用率</h3>
              <div class="gauge-container">
                <div class="gauge-circle">
                  <span class="gauge-value"
                    >{{
                      Math.round((rackData.used_u / rackData.total_u) * 100)
                    }}%</span
                  >
                  <span class="gauge-label">已用</span>
                </div>
                <div class="capacity-details">
                  <div class="detail-item">
                    <span>总空间</span>
                    <strong>{{ rackData.total_u }} U</strong>
                  </div>
                  <div class="detail-item">
                    <span>已用</span>
                    <strong>{{ rackData.used_u }} U</strong>
                  </div>
                  <div class="detail-item">
                    <span>剩余</span>
                    <strong>{{ rackData.total_u - rackData.used_u }} U</strong>
                  </div>
                </div>
              </div>
            </div>

            <!-- Environment Card -->
            <div class="info-card env-card">
              <h3>环境监测</h3>
              <div class="metric-row">
                <div class="metric-item">
                  <span class="label">实时功耗</span>
                  <div class="value-group">
                    <span class="value">{{ rackData.power_usage }}</span>
                    <span class="unit">kW</span>
                  </div>
                  <div class="progress-bar">
                    <div
                      class="progress"
                      :style="{ width: `${(rackData.power_usage / 5) * 100}%` }"
                    ></div>
                  </div>
                </div>
                <div class="metric-item">
                  <span class="label">温度</span>
                  <div class="value-group">
                    <span class="value">{{ rackData.temperature }}</span>
                    <span class="unit">°C</span>
                  </div>
                  <div class="progress-bar">
                    <div
                      class="progress temp"
                      :style="{
                        width: `${((rackData.temperature - 15) / 20) * 100}%`,
                      }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Device List -->
          <div class="col-right">
            <div class="info-card device-list-card">
              <div class="card-header">
                <h3>设备列表</h3>
                <span class="device-count"
                  >{{ rackData.device_count }} 台设备</span
                >
              </div>
              <div class="device-list-container">
                <table class="device-table">
                  <thead>
                    <tr>
                      <th>位置</th>
                      <th>设备名称</th>
                      <th>状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="i in rackData.device_count" :key="i">
                      <td>{{ rackData.total_u - i + 1 }}U</td>
                      <td>Server-{{ String(i).padStart(2, "0") }}</td>
                      <td><span class="status-dot online"></span> 正常</td>
                    </tr>
                    <tr v-if="rackData.device_count === 0">
                      <td colspan="3" class="no-data">暂无设备</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="loading-state" v-else-if="loading">
          <div class="spinner"></div>
          <p>加载机柜数据中...</p>
        </div>

        <div class="error-state" v-else>
          <p>无法加载机柜数据</p>
          <button @click="fetchData">重试</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

const props = defineProps<{
  rack: any; // Passed from RoomLayoutDiagram
  roomName: string;
}>();

const emit = defineEmits(["close"]);

interface CabinetDetail {
  id: number;
  cabinet_label: string;
  room_id: string;
  enterprise_name: string | null;
  status: string;
  total_u: number;
  used_u: number;
  power_usage: number;
  temperature: number;
  device_count: number;
  updated_at: string;
}

const loading = ref(true);
const rackData = ref<CabinetDetail | null>(null);

const fetchData = async () => {
  loading.value = true;
  try {
    // Determine room_id and cabinet_label
    // rack.roomName might be "101机房", we need "101"
    const roomId = props.roomName.replace("机房", "");
    const cabinetLabel = String(props.rack.visibleIndex); // Using visibleIndex as label for now

    const response = await axios.get(
      `/api/cockpit/rooms/${roomId}/cabinets/${cabinetLabel}`,
    );
    rackData.value = response.data;
  } catch (error) {
    console.error("Failed to fetch cabinet details:", error);
    // Fallback to basic data if API fails (for demo stability)
    rackData.value = {
      id: props.rack.id,
      cabinet_label: String(props.rack.visibleIndex),
      room_id: props.roomName.replace("机房", ""),
      enterprise_name:
        props.rack.enterprise === "未启用" ? null : props.rack.enterprise,
      status: props.rack.enterprise ? "active" : "inactive",
      total_u: 42,
      used_u: props.rack.enterprise ? 20 : 0,
      power_usage: props.rack.enterprise ? 1.5 : 0,
      temperature: 24.5,
      device_count: props.rack.enterprise ? 5 : 0,
      updated_at: new Date().toISOString(),
    };
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.rack-dashboard-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  z-index: 9999999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rack-dashboard-container {
  width: 900px;
  height: 600px;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border: 1px solid rgba(59, 130, 246, 0.3);
  box-shadow: 0 0 30px rgba(59, 130, 246, 0.2);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: #e2e8f0;
}

.dashboard-header {
  height: 70px;
  padding: 0 24px;
  background: rgba(30, 41, 59, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.icon-box {
  width: 40px;
  height: 40px;
  background: rgba(59, 130, 246, 0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #60a5fa;
}

.title-group h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
}

.sub-title {
  font-size: 0.875rem;
  color: #94a3b8;
}

.close-btn {
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.dashboard-content {
  flex: 1;
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 24px;
  padding: 24px;
  overflow-y: auto;
}

.info-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
}

.info-card h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #94a3b8;
  margin-bottom: 16px;
  display: block;
}

/* Enterprise Card */
.enterprise-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.ent-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: bold;
  color: #fff;
}

.ent-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ent-name {
  font-weight: 600;
  color: #fff;
}

.status-badge {
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 12px;
  width: fit-content;
}

.status-badge.active {
  background: rgba(16, 185, 129, 0.2);
  color: #34d399;
}

.status-badge.inactive {
  background: rgba(148, 163, 184, 0.2);
  color: #94a3b8;
}

/* Capacity Card */
.gauge-container {
  display: flex;
  align-items: center;
  gap: 24px;
}

.gauge-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 6px solid #3b82f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(59, 130, 246, 0.1);
}

.gauge-value {
  font-size: 1.25rem;
  font-weight: bold;
  color: #fff;
}

.gauge-label {
  font-size: 0.75rem;
  color: #94a3b8;
}

.capacity-details {
  flex: 1;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.875rem;
  color: #94a3b8;
}

.detail-item strong {
  color: #e2e8f0;
}

/* Env Card */
.metric-row {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.metric-item .label {
  display: block;
  font-size: 0.875rem;
  color: #94a3b8;
  margin-bottom: 4px;
}

.value-group {
  margin-bottom: 8px;
}

.value-group .value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  margin-right: 4px;
}

.value-group .unit {
  font-size: 0.875rem;
  color: #64748b;
}

.progress-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: #3b82f6;
  border-radius: 3px;
}

.progress.temp {
  background: #f59e0b;
}

/* Device List */
.device-list-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.device-count {
  font-size: 0.875rem;
  color: #94a3b8;
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 8px;
  border-radius: 12px;
}

.device-list-container {
  flex: 1;
  overflow-y: auto;
}

.device-table {
  width: 100%;
  border-collapse: collapse;
}

.device-table th {
  text-align: left;
  padding: 12px;
  font-size: 0.75rem;
  color: #64748b;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.device-table td {
  padding: 12px;
  font-size: 0.875rem;
  color: #cbd5e1;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 6px;
}

.status-dot.online {
  background: #10b981;
}

.loading-state,
.error-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(59, 130, 246, 0.3);
  border-radius: 50%;
  border-top-color: #3b82f6;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
