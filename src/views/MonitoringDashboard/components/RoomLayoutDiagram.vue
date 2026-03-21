<template>
  <transition name="backdrop-fade">
    <div
      class="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
      @click="$emit('close')"
    ></div>
  </transition>

  <transition name="slide-left" appear>
    <div class="room-layout-diagram">
      <div class="panel-content-wrapper">
        <div class="panel-header-detail">
          <div class="header-icon-detail">
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
                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
              ></path>
            </svg>
          </div>
          <h3 class="panel-title-detail">{{ roomData.id }} 机房布局</h3>
          <button class="close-button" @click="handleClose()">
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

        <div class="layout-section">
          <div class="layout-container">
            <div class="rack-grid-wrapper">
              <div
                class="rack-grid-large"
                :style="{
                  gridTemplateColumns: `repeat(${gridInfo.cols}, 1fr)`,
                  gridTemplateRows: `repeat(${gridInfo.rows}, 1fr)`,
                }"
              >
                <template v-if="rackLayout.length > 0">
                  <div
                    v-for="rack in rackLayout"
                    :key="rack.id"
                    class="rack-cell-large"
                    :class="{
                      'rack-used': rack.enterprise,
                      'rack-empty': !rack.enterprise,
                      'rack-hidden': rack.isHidden,
                    }"
                    :style="{
                      backgroundColor: rack.enabled ? rack.color : '#f8fafc',
                      borderColor: rack.enabled ? rack.color : '#e2e8f0',
                    }"
                    @click="handleRackClick(rack, $event)"
                  >
                    <span class="rack-number">{{ rack.visibleIndex }}</span>
                  </div>
                </template>
                <div v-else class="text-gray-500">机房布局数据加载中...</div>
              </div>

              <!-- Rack Dashboard Modal -->
              <Teleport to="body">
                <RackDashboard
                  v-if="showRackDashboard && selectedRack"
                  :rack="selectedRack"
                  :room-name="roomData.name"
                  @close="handleRackDashboardClose"
                />
              </Teleport>

              <!-- 区域框架覆盖层 -->
              <div
                v-if="areaFrames.length > 0"
                class="area-frames-overlay"
                :style="{
                  gridTemplateColumns: `repeat(${gridInfo.cols}, 1fr)`,
                  gridTemplateRows: `repeat(${gridInfo.rows}, 1fr)`,
                }"
              >
                <div
                  v-for="frame in areaFrames"
                  :key="frame.id"
                  class="area-frame"
                  :style="getFrameStyle(frame)"
                >
                  <div
                    class="area-frame-label"
                    :class="`label-${frame.labelPosition || 'top'}`"
                  >
                    {{ frame.label }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="panel-overlay"></div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import type { RoomData } from "@/types";
import { computed, watchEffect, ref, onMounted, onUnmounted } from "vue";
import { rackController } from "@/utils/rackController";
import { initializeRoom } from "@/utils/roomInitializer";
import { roomConfigs } from "@/config/roomConfig";

interface Props {
  roomData: RoomData;
}

const props = defineProps<Props>();
const emit = defineEmits<{ close: [] }>();

const showRackDashboard = ref(false);
const selectedRack = ref<any>(null);

interface RackDetails {
  rack: any | null;
  x: number;
  y: number;
}

const activeRackDetails = ref<RackDetails>({
  rack: null,
  x: 0,
  y: 0,
});

/**
 * 处理机柜点击事件，显示机柜详情看板。
 * @param rack - 被点击的机柜数据。
 * @param event - 鼠标事件对象。
 */
const handleRackClick = (rack: any, event: MouseEvent) => {
  // 阻止事件冒泡
  event.stopPropagation();

  selectedRack.value = {
    ...rack,
    enterpriseName: rack.enterprise === "未启用" ? null : rack.enterprise,
  };
  showRackDashboard.value = true;
};

const handleRackDashboardClose = () => {
  showRackDashboard.value = false;
  selectedRack.value = null;
};


/**
 * 处理全局点击事件，当点击提示框外部时关闭提示框。
 * @param event - 鼠标事件对象。
 */
const handleClickOutside = (event: MouseEvent) => {
  const tooltipElement = document.querySelector(".rack-tooltip");
  if (tooltipElement && !tooltipElement.contains(event.target as Node)) {
    activeRackDetails.value.rack = null;
  }
};

/**
 * 计算提示框的样式，使其跟随鼠标位置显示，并进行边界检测。
 */
const tooltipStyle = computed(() => {
  if (!activeRackDetails.value.rack) return {};

  const offset = 15; // 偏移量，避免提示框直接覆盖鼠标
  const tooltipWidth = 250; // tooltip的最大宽度
  const tooltipHeight = 120; // tooltip的估计高度

  let left = activeRackDetails.value.x + offset;
  let top = activeRackDetails.value.y - tooltipHeight - offset; // 默认显示在鼠标上方

  // 边界检测和调整
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // 右边界检测
  if (left + tooltipWidth > viewportWidth) {
    left = activeRackDetails.value.x - tooltipWidth - offset;
  }

  // 上边界检测
  if (top < 0) {
    top = activeRackDetails.value.y + offset; // 显示在鼠标下方
  }

  // 下边界检测
  if (top + tooltipHeight > viewportHeight) {
    top = viewportHeight - tooltipHeight - offset;
  }

  // 左边界检测
  if (left < 0) {
    left = offset;
  }

  return {
    left: `${left}px`,
    top: `${top}px`,
  };
});

// 添加一个响应式引用来触发重新渲染
const updateTrigger = ref(0);

// 使用 watchEffect 自动在组件挂载和 props.roomData 变化时更新
watchEffect(() => {
  // 只有在机房未初始化时才进行初始化，避免覆盖现有配置
  if (!rackController.isRoomInitialized(props.roomData.id)) {
    if (import.meta.env.DEV) {
      console.log(`机房 ${props.roomData.id} 未初始化，正在初始化...`);
    }
    initializeRoom(props.roomData.id);
  } else {
    if (import.meta.env.DEV) {
      console.log(`机房 ${props.roomData.id} 已存在，使用现有配置`);
    }
  }

  // 检查是否有传入的布局命令，如果有则执行
  if (
    props.roomData.layoutCommands &&
    props.roomData.layoutCommands.length > 0
  ) {
    rackController.executeLayoutCommands(props.roomData.layoutCommands);
  }
});

// 自动调用数据
onMounted(() => {
  simulateDataReception();
  // 添加全局点击事件监听器
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  // 移除全局点击事件监听器
  document.removeEventListener("click", handleClickOutside);
});

// 获取网格信息
const gridInfo = computed(() => {
  return rackController.getRoomGridInfo(props.roomData.id);
});

// 修改：使用 getRoomLayoutWithPlaceholders 方法来支持隐藏功能
const rackLayout = computed(() => {
  // 使用 updateTrigger 来确保当数据更新时重新计算
  updateTrigger.value;
  const layout = rackController.getRoomLayoutWithPlaceholders(
    props.roomData.id,
    true,
  );
  return layout;
});

// 获取区域框架配置
const areaFrames = computed(() => {
  const roomConfig = roomConfigs.find(
    (config) => config.roomId === props.roomData.id,
  );
  return roomConfig?.areaFrames || [];
});

// 将机柜范围字符串转换为网格坐标
const parseRackRangeToGrid = (rackRange: string, roomId: string) => {
  const gridInfo = rackController.getRoomGridInfo(roomId);
  const rackIds: number[] = [];
  const parts = rackRange.split(",");

  // 解析机柜范围
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.includes("-")) {
      const [start, end] = trimmed
        .split("-")
        .map((num) => parseInt(num.trim()));
      if (!isNaN(start) && !isNaN(end) && start <= end) {
        for (let i = start; i <= end; i++) {
          rackIds.push(i);
        }
      }
    } else {
      const num = parseInt(trimmed);
      if (!isNaN(num)) {
        rackIds.push(num);
      }
    }
  }

  // 计算边界坐标
  let minRow = Infinity,
    maxRow = -Infinity;
  let minCol = Infinity,
    maxCol = -Infinity;

  rackIds.forEach((rackId) => {
    const row = Math.ceil(rackId / gridInfo.cols);
    const col = ((rackId - 1) % gridInfo.cols) + 1;

    minRow = Math.min(minRow, row);
    maxRow = Math.max(maxRow, row);
    minCol = Math.min(minCol, col);
    maxCol = Math.max(maxCol, col);
  });

  return {
    startRow: minRow,
    endRow: maxRow,
    startCol: minCol,
    endCol: maxCol,
  };
};

// 计算框架样式
const getFrameStyle = (frame: any) => {
  const gridCoords = parseRackRangeToGrid(frame.rackRange, props.roomData.id);

  return {
    gridColumn: `${gridCoords.startCol} / ${gridCoords.endCol + 1}`,
    gridRow: `${gridCoords.startRow} / ${gridCoords.endRow + 1}`,
    border: `${frame.borderWidth || 3}px solid ${frame.color}`,
  };
};

// 以下 computed 属性保持不变，因为它们依赖 rackLayout

// 处理后端返回的客户机柜数据
const processCustomerRackData = (
  data: Array<{
    room_id: string;
    FKHNAME: string;
    cabinet_id: string;
    FENAME: string;
    maintainer?: string;
    KHMANAGE?: string;
  }>,
) => {
  if (!data || data.length === 0) {
    console.log("没有接收到数据");
    return;
  }

  console.log(`开始处理数据，总条数: ${data.length}`);
  console.log(`当前机房ID: ${props.roomData.id}`);

  // 过滤出当前机房的数据
  const currentRoomData = data.filter((item) => {
    if (!item.room_id) {
      console.log(`数据项缺少 room_id`);
      return false;
    }

    // 尝试多种匹配方式
    const roomId = item.room_id.toString();
    const targetRoomId = props.roomData.id.toString();

    // 方式1: 完全匹配
    const exactMatch = roomId === targetRoomId;

    // 方式2: 前3位匹配
    const prefixMatch = roomId.slice(0, 3) === targetRoomId;

    // 方式3: 包含匹配
    const containsMatch = roomId.includes(targetRoomId);

    const roomIdMatch = exactMatch || prefixMatch || containsMatch;

    console.log(
      `数据项 room_id: ${roomId}, 目标机房: ${targetRoomId}, 完全匹配: ${exactMatch}, 前3位匹配: ${prefixMatch}, 包含匹配: ${containsMatch}, 最终匹配: ${roomIdMatch}`,
    );
    return roomIdMatch;
  });

  console.log("当前机房数据:", currentRoomData);
  console.log(`过滤后的数据条数: ${currentRoomData.length}`);

  // 更新机柜颜色
  currentRoomData.forEach((item, index) => {
    const rackId = parseInt(item.cabinet_id);
    console.log(
      `处理第 ${index + 1} 条数据: cabinet_id=${item.cabinet_id}, rackId=${rackId}, FENAME=${item.FENAME}`,
    );
    console.log(
      `更新机房 ${item.room_id} 的机柜 ${rackId}，分配给 ${item.FKHNAME}`,
    );
    if (!isNaN(rackId)) {
      rackController.updateSingleRackFromBackend(
        props.roomData.id,
        rackId,
        item.FKHNAME,
        item.FENAME,
        item.maintainer,
        item.KHMANAGE,
        item.room_id,
      );
    } else {
      console.warn(`无效的机柜ID: ${item.cabinet_id}`);
    }
  });

  // 触发重新渲染
  updateTrigger.value++;

  console.log(`处理了 ${currentRoomData.length} 条当前机房的客户机柜数据`);
};

// 接收后端数据的方法
const simulateDataReception = async () => {
  console.log(`正在获取机房 ${props.roomData.id} 的数据...`);

  try {
    const response = await fetch(`/api/room/${props.roomData.id}/cabinets`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    console.log(`机房 ${props.roomData.id} 后端返回的原始数据:`, data);
    console.log(`数据条数: ${data ? data.length : 0}`);

    if (data && data.length > 0) {
      console.log("第一条数据示例:", data[0]);
    }

    // 处理数据
    processCustomerRackData(data);
    console.log("数据处理完成");
  } catch (error) {
    console.error("获取机房数据失败:", error);
    // 失败时不使用模拟数据，直接保持为空或显示错误
  }
};

// 修改关闭方法以触发数据清空
const handleClose = () => {
  emit("close");
};
</script>

<style scoped>
@import "@/styles/panels.css";
@import "@/styles/room-layout.css";

/* ... 样式代码保持不变 ... */

.panel-content-wrapper {
  padding: 20px;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}

.layout-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.layout-container {
  flex: 1;
  padding: 16px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.rack-grid-large {
  display: grid;
  gap: 2px;
  width: 100%;
  height: 100%;
  max-width: none;
  max-height: none;
}

.rack-cell-large {
  aspect-ratio: 1;
  border: 2px solid #e2e8f0; /* 增加边框宽度 */
  border-radius: 4px; /* 增加圆角 */
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2); /* 添加包边效果 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 6px;
  font-weight: 600;
  color: #64748b;
  transition: all 0.2s ease;
  position: relative;
  min-width: 0;
  min-height: 0;
}

.rack-cell-large.rack-used {
  color: white;
  font-weight: 700;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.3); /* 已使用机柜的增强包边效果 */
}

.rack-cell-large.rack-empty {
  background-color: #f8fafc !important;
  border-color: #e2e8f0 !important;
  color: #94a3b8;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1); /* 空闲机柜的轻微包边效果 */
}

/* 新增：隐藏未分配企业的机柜样式 */
.rack-cell-large.rack-hidden {
  visibility: hidden;
}

.rack-number {
  font-size: 10px; /* 从5px放大到10px，即放大两倍 */
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); /* 为字体添加轻微阴影增强可读性 */
}

.slide-left-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.slide-left-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(-100%) scale(0.9);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-100%) scale(0.95);
}

@media (max-width: 1024px) {
  .room-layout-diagram {
    width: 80vw;
  }

  .rack-grid-large {
    grid-template-rows: repeat(20, 1fr);
    grid-template-columns: repeat(15, 1fr);
  }
}

@media (max-width: 768px) {
  .room-layout-diagram {
    width: 90vw;
  }

  .panel-content-wrapper {
    padding: 16px;
  }

  .rack-grid-large {
    grid-template-rows: repeat(25, 1fr);
    grid-template-columns: repeat(12, 1fr);
  }
}
</style>
