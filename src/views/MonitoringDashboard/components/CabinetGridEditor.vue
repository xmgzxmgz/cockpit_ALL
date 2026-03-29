<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h4 class="text-sm font-medium text-gray-700">机柜网格编辑器</h4>
      <div class="flex space-x-2">
        <button 
          @click="clearSelection" 
          class="px-3 py-1 text-xs bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors"
        >
          清空选择
        </button>
        <button 
          @click="saveSelection" 
          class="px-3 py-1 text-xs bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
        >
          保存选择
        </button>
      </div>
    </div>

    <div class="grid-container overflow-auto border border-gray-200 rounded-md p-2">
      <div 
        class="grid" 
        :style="{
          gridTemplateColumns: `repeat(${columns}, minmax(30px, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(30px, 1fr))`,
          gap: '2px'
        }"
      >
        <div
          v-for="(cell, index) in gridCells"
          :key="index"
          :class="[
            'grid-cell flex items-center justify-center text-xs font-medium cursor-pointer transition-colors',
            cell.isOccupied ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            cell.isSelected ? 'ring-2 ring-indigo-500' : ''
          ]"
          @click="toggleCell(index)"
        >
          {{ cell.id }}
        </div>
      </div>
    </div>

    <div class="flex justify-between text-sm text-gray-600">
      <div>已选择: {{ selectedCount }} 个机柜</div>
      <div>总机柜数: {{ totalCount }}</div>
    </div>

    <div class="mt-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">输入机柜编号（用逗号分隔）</label>
      <input 
        v-model="cabinetIds" 
        type="text" 
        placeholder="例如：1,3,5-10"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
      <button 
        @click="selectByIds" 
        class="mt-2 px-3 py-1 text-xs bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors"
      >
        应用选择
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const props = defineProps<{
  roomId: number;
}>();

const emit = defineEmits<{
  (e: 'save'): void;
}>();

const columns = ref(10);
const rows = ref(10);
const gridCells = ref<Array<{ id: string; isOccupied: boolean; isSelected: boolean }>>([]);
const cabinetIds = ref('');

const selectedCount = computed(() => {
  return gridCells.value.filter(cell => cell.isSelected).length;
});

const totalCount = computed(() => {
  return gridCells.value.length;
});

onMounted(() => {
  initGrid();
});

const initGrid = () => {
  const cells = [];
  for (let row = 0; row < rows.value; row++) {
    for (let col = 0; col < columns.value; col++) {
      cells.push({
        id: `${row + 1}-${col + 1}`,
        isOccupied: false,
        isSelected: false
      });
    }
  }
  gridCells.value = cells;
};

const toggleCell = (index: number) => {
  gridCells.value[index].isSelected = !gridCells.value[index].isSelected;
};

const clearSelection = () => {
  gridCells.value.forEach(cell => {
    cell.isSelected = false;
  });
};

const saveSelection = async () => {
  // 模拟保存到数据库
  const selectedCells = gridCells.value.filter(cell => cell.isSelected);
  console.log('保存选中的机柜:', selectedCells);
  
  // 标记选中的机柜为已占用
  gridCells.value.forEach(cell => {
    if (cell.isSelected) {
      cell.isOccupied = true;
    }
  });
  
  emit('save');
};

const selectByIds = () => {
  const ids = cabinetIds.value.split(',').map(id => id.trim());
  clearSelection();
  
  ids.forEach(id => {
    if (id.includes('-')) {
      // 处理范围，如 5-10
      const [start, end] = id.split('-').map(Number);
      if (!isNaN(start) && !isNaN(end)) {
        for (let i = start - 1; i < end; i++) {
          if (i < gridCells.value.length) {
            gridCells.value[i].isSelected = true;
          }
        }
      }
    } else {
      // 处理单个编号
      const index = Number(id) - 1;
      if (!isNaN(index) && index >= 0 && index < gridCells.value.length) {
        gridCells.value[index].isSelected = true;
      }
    }
  });
};
</script>

<style scoped>
.grid-container {
  max-height: 400px;
}

.grid-cell {
  aspect-ratio: 1;
  min-height: 30px;
  min-width: 30px;
}
</style>