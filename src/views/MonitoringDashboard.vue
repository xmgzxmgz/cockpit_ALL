<template>
  <div class="monitoring-dashboard">
    <LoadingScreen v-if="isLoading" />

    <ThreeScene ref="threeSceneRef" @room-click="handleRoomClick">
      <LogoPanel />
      <TimePanel />
      <ResourceOverview />
      <FloorControls
        :floors="floors"
        :current-floor="currentFloor"
        @floor-change="selectFloor"
      />
    </ThreeScene>

    <!-- 点击显示机房详情面板 -->
    <DetailsPanel
      v-if="showDetailsPanel && clickedRoom"
      :room-data="clickedRoom"
      @close="handleDetailsPanelClose"
      @open-layout="handleOpenLayout"
    />

    <!-- 机房布局示意图保持不变，只通过点击触发 -->
    <RoomLayoutDiagram
      v-if="selectedRoom"
      :room-data="selectedRoom"
      @close="handleRoomLayoutClose"
    />

    <!-- 企业信息概览面板 -->
    <EnterpriseOverviewPanel
      ref="enterpriseOverviewRef"
      @close="handleEnterpriseePanelClose"
      @room-click="handleRoomTagClick"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from "vue";
import { useDashboardStore } from "@/stores/dashboard";
import type { RoomData } from "@/stores/dashboard";
import { roomConfigs } from "@/config/roomConfig";
import ThreeScene from "./MonitoringDashboard/components/ThreeScene.vue";
import LogoPanel from "./MonitoringDashboard/components/LogoPanel.vue";
import TimePanel from "./MonitoringDashboard/components/TimePanel.vue";
import ResourceOverview from "./MonitoringDashboard/components/ResourceOverview.vue";
import FloorControls from "./MonitoringDashboard/components/FloorControls.vue";
import DetailsPanel from "./MonitoringDashboard/components/DetailsPanel.vue";
import RoomLayoutDiagram from "./MonitoringDashboard/components/RoomLayoutDiagram.vue";
import EnterpriseOverviewPanel from "./MonitoringDashboard/components/EnterpriseOverviewPanel.vue";
// RoomData 类型已在 dashboard store 中定义

// 使用 stores 和 composables
const dashboardStore = useDashboardStore();

// 响应式数据
const threeSceneRef = ref();
const enterpriseOverviewRef = ref();
const showDetailsPanel = ref(false);
const clickedRoom = ref<RoomData | null>(null);

// 计算属性
const isLoading = computed(() => dashboardStore.isLoading);
const currentFloor = computed(() => dashboardStore.currentFloor);
const selectedRoom = computed(() => dashboardStore.selectedRoom);
const floors = computed(() => [1, 2, 3, 4, 5]);

// 方法
const selectFloor = (floor: number | "all") => {
  dashboardStore.selectFloor(floor);
  if (threeSceneRef.value) {
    threeSceneRef.value.updateFloorVisibility(floor);
  }
};

const handleRoomClick = (roomData: RoomData) => {
  console.log("Room clicked:", roomData);
  // 设置点击的房间数据并显示详情面板
  clickedRoom.value = roomData;
  showDetailsPanel.value = true;
  // 如果企业信息概览面板处于开启状态，自动关闭
  if (enterpriseOverviewRef.value && !enterpriseOverviewRef.value.isCollapsed) {
    enterpriseOverviewRef.value.togglePanel();
  }
  // 暂时不自动打开机房布局图，由详情面板中的按钮触发
  // dashboardStore.setSelectedRoom(roomData);
};

const handleDetailsPanelClose = () => {
  showDetailsPanel.value = false;
  clickedRoom.value = null;
};

const handleOpenLayout = (roomData: RoomData) => {
  // 打开机房布局图
  dashboardStore.setSelectedRoom(roomData);
  // 关闭详情面板，避免遮挡 (或者保持开启，因为z-index已经调整)
  // 这里选择关闭详情面板，让用户专注于布局图
  showDetailsPanel.value = false;
};

const handleRoomLayoutClose = () => {
  dashboardStore.setSelectedRoom(null);
};

const handleEnterpriseePanelClose = () => {
  // 企业面板现在由自身的isCollapsed状态控制，这里可以为空或添加其他逻辑
};

const handleRoomTagClick = (roomId: string) => {
  console.log("Room tag clicked:", roomId);

  // 先清除当前选择，确保重新选择同一个房间时也能触发更新
  dashboardStore.setSelectedRoom(null);

  // 使用nextTick确保DOM更新后再设置新的房间
  nextTick(() => {
    // 从配置文件中查找对应的机房配置
    const roomConfig = roomConfigs.find((config) => config.roomId === roomId);

    // 生成机柜布局数据
    const rackLayout: any[] = [];
    if (roomConfig) {
      roomConfig.assignments.forEach((assignment) => {
        // 解析机柜范围字符串，生成机柜数据
        const ranges = assignment.rackRange.split(",");
        ranges.forEach((range) => {
          const trimmedRange = range.trim();
          if (trimmedRange.includes("-")) {
            const [start, end] = trimmedRange
              .split("-")
              .map((num) => parseInt(num));
            for (let i = start; i <= end; i++) {
              rackLayout.push({
                id: i,
                enterprise: assignment.enterprise,
                enabled: assignment.enabled,
                color: assignment.color || roomConfig.defaultColor,
              });
            }
          } else {
            const rackId = parseInt(trimmedRange);
            if (!isNaN(rackId)) {
              rackLayout.push({
                id: rackId,
                enterprise: assignment.enterprise,
                enabled: assignment.enabled,
                color: assignment.color || roomConfig.defaultColor,
              });
            }
          }
        });
      });

      // 设置选中的机房，触发界面更新
      if (roomConfig) {
        const roomData = {
          id: roomId,
          name: `机房${roomId}`,
          floor: 1,
        };

        // 设置选中的机房（用于布局图）
        dashboardStore.setSelectedRoom(roomData);

        // 同时显示机房详细信息面板（与点击机房模型时的行为一致）
        clickedRoom.value = roomData;
        showDetailsPanel.value = true;

        // 注意：这里不关闭企业概览面板，保持其开启状态
        console.log("显示机房详细信息面板，保持企业概览面板开启");
      }
    }
  });
};

// 生命周期
onMounted(() => {
  // Simulate loading for 2 seconds
  setTimeout(() => {
    dashboardStore.setLoading(false);
  }, 2000);
});
</script>

<style scoped>
.monitoring-dashboard {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
