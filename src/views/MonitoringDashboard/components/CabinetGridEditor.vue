<template>
  <div class="grid-editor">
    <div class="grid-container">
      <div class="grid" @mousedown="startSelection" @mousemove="updateSelection" @mouseup="endSelection" @mouseleave="endSelection">
        <div v-for="(row, y) in gridData" :key="y" class="grid-row">
          <div v-for="(cell, x) in row" :key="x" :class="['grid-cell', { 'occupied': cell.is_occupied, 'selected': cell.selected }]" :data-x="x" :data-y="y"></div>
        </div>
      </div>
    </div>
    <div class="controls">
      <button class="btn-select" @click="toggleSelectMode">{{ selectMode ? '取消框选' : '框选模式' }}</button>
      <button class="btn-clear" @click="clearSelection">清空选择</button>
      <button class="btn-save" @click="saveGrid">保存配置</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps<{ roomId: number }>();
const emit = defineEmits<{ save: [] }>();

const gridData = ref<Array<Array<{ is_occupied: boolean; selected: boolean }>>>([]);
const selectMode = ref(false);
const isSelecting = ref(false);
const startX = ref(0);
const startY = ref(0);

onMounted(async () => {
  // 初始化 10x10 网格
  await initGrid();
  // 加载已有的网格数据
  await loadGrid();
});

const initGrid = async () => {
  try {
    await fetch(`http://127.0.0.1:8002/api/config/rooms/${props.roomId}/grid/init`, { method: 'POST' });
  } catch (error) {
    console.error('初始化网格失败:', error);
  }
};

const loadGrid = async () => {
  try {
    const response = await fetch(`http://127.0.0.1:8002/api/config/rooms/${props.roomId}/grid`);
    const data = await response.json();
    
    // 创建 10x10 网格
    const grid: Array<Array<{ is_occupied: boolean; selected: boolean }>> = [];
    for (let y = 0; y < 10; y++) {
      grid[y] = [];
      for (let x = 0; x < 10; x++) {
        const cell = data.find((c: any) => c.grid_x === x && c.grid_y === y);
        grid[y][x] = { is_occupied: cell?.is_occupied || false, selected: false };
      }
    }
    gridData.value = grid;
  } catch (error) {
    console.error('加载网格失败:', error);
    // 创建空网格
    const grid: Array<Array<{ is_occupied: boolean; selected: boolean }>> = [];
    for (let y = 0; y < 10; y++) {
      grid[y] = [];
      for (let x = 0; x < 10; x++) {
        grid[y][x] = { is_occupied: false, selected: false };
      }
    }
    gridData.value = grid;
  }
};

const toggleSelectMode = () => {
  selectMode.value = !selectMode.value;
};

const startSelection = (e: MouseEvent) => {
  if (!selectMode.value) return;
  const target = e.target as HTMLElement;
  if (!target.classList.contains('grid-cell')) return;
  
  isSelecting.value = true;
  const x = parseInt(target.getAttribute('data-x') || '0');
  const y = parseInt(target.getAttribute('data-y') || '0');
  startX.value = x;
  startY.value = y;
};

const updateSelection = (e: MouseEvent) => {
  if (!isSelecting.value || !selectMode.value) return;
  
  const target = e.target as HTMLElement;
  if (!target.classList.contains('grid-cell')) return;
  
  const endX = parseInt(target.getAttribute('data-x') || '0');
  const endY = parseInt(target.getAttribute('data-y') || '0');
  
  // 清空之前的选择
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      gridData.value[y][x].selected = false;
    }
  }
  
  // 框选范围内的格子
  const minX = Math.min(startX.value, endX);
  const maxX = Math.max(startX.value, endX);
  const minY = Math.min(startY.value, endY);
  const maxY = Math.max(startY.value, endY);
  
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      gridData.value[y][x].selected = true;
    }
  }
};

const endSelection = () => {
  if (!isSelecting.value) return;
  isSelecting.value = false;
  
  // 将选中的格子标记为已占用
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      if (gridData.value[y][x].selected) {
        gridData.value[y][x].is_occupied = true;
        gridData.value[y][x].selected = false;
      }
    }
  }
};

const clearSelection = () => {
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      gridData.value[y][x].is_occupied = false;
      gridData.value[y][x].selected = false;
    }
  }
};

const saveGrid = async () => {
  try {
    // 批量保存网格数据
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const cell = gridData.value[y][x];
        await fetch('http://127.0.0.1:8002/api/config/cabinet-grid', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            room_id: props.roomId,
            grid_x: x,
            grid_y: y,
            is_occupied: cell.is_occupied,
          }),
        });
      }
    }
    emit('save');
  } catch (error) {
    console.error('保存网格失败:', error);
  }
};
</script>

<style scoped>
.grid-editor { display: flex; flex-direction: column; gap: 20px; }
.grid-container { display: flex; justify-content: center; }
.grid { display: grid; grid-template-columns: repeat(10, 40px); gap: 2px; padding: 20px; background: #f3f4f6; border-radius: 8px; }
.grid-row { display: contents; }
.grid-cell { width: 40px; height: 40px; background: white; border: 1px solid #d1d5db; border-radius: 4px; cursor: pointer; transition: all 0.2s ease; }
.grid-cell:hover { background: #f0f9ff; border-color: #667eea; }
.grid-cell.occupied { background: #667eea; border-color: #667eea; }
.grid-cell.selected { background: #fbbf24; border-color: #f59e0b; }
.controls { display: flex; gap: 10px; justify-content: center; }
.btn-select, .btn-clear, .btn-save { padding: 10px 16px; border: none; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.3s ease; }
.btn-select { background: #f3f4f6; color: #1f2937; }
.btn-select:hover { background: #e5e7eb; }
.btn-clear { background: #fee2e2; color: #991b1b; }
.btn-clear:hover { background: #fecaca; }
.btn-save { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
.btn-save:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4); }
</style>
