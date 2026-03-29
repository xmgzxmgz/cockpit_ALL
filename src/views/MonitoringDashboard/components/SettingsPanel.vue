<template>
  <div class="fixed bottom-20 left-20 z-40 flex flex-col items-center">
    <!-- 消息提示 -->
    <div v-if="message" class="fixed bottom-32 left-10 bg-white p-3 rounded-lg shadow-lg text-sm z-50 animate-slide-up">
      {{ message }}
    </div>

    <!-- 设置按钮 -->
    <button 
      class="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed z-50 mb-2"
      @click="isDrawerOpen = true" 
      title="打开配置面板" 
      :disabled="loading"
    >
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
      </svg>
    </button>
    <span class="text-white text-xs font-medium bg-black bg-opacity-70 px-2 py-1 rounded-md">设置</span>

    <!-- 配置抽屉 -->
    <div v-if="isDrawerOpen" class="fixed inset-0 bg-black bg-opacity-50 z-39" @click="isDrawerOpen = false"></div>
    <div :class="['fixed left-0 top-0 bottom-0 w-96 bg-white shadow-lg z-41 transition-all duration-300', isDrawerOpen ? 'translate-x-0' : '-translate-x-full']">
      <div class="flex justify-between items-center p-5 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-800">数据中心配置</h2>
        <button class="text-gray-500 hover:text-gray-800 transition-colors" @click="isDrawerOpen = false">✕</button>
      </div>

      <div class="flex border-b border-gray-200">
        <button 
          v-for="tab in tabs" 
          :key="tab"
          :class="['flex-1 py-3 text-sm transition-colors', activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-gray-800']"
          @click="activeTab = tab"
        >
          {{ tab }}
        </button>
      </div>

      <div class="p-5 overflow-y-auto">
        <!-- 基本配置 -->
        <div v-if="activeTab === '基本配置'" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">数据中心名称</label>
            <input 
              v-model="config.name" 
              type="text" 
              placeholder="输入数据中心名称" 
              :disabled="loading"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">楼层数</label>
            <input 
              v-model.number="config.floorCount" 
              type="number" 
              min="1" 
              max="10" 
              :disabled="loading"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
            />
          </div>
          <button 
            @click="saveBasicConfig" 
            :disabled="loading"
            class="w-full py-2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-md hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {{ loading ? '保存中...' : '保存基本配置' }}
          </button>
        </div>

        <!-- 楼层配置 -->
        <div v-if="activeTab === '楼层配置'" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">楼层编号</label>
            <input 
              v-model.number="floorConfig.floorNumber" 
              type="number" 
              min="1" 
              :disabled="loading"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">楼层名称</label>
            <input 
              v-model="floorConfig.floorName" 
              type="text" 
              placeholder="例如：一楼" 
              :disabled="loading"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">楼层形状</label>
            <select 
              v-model="floorConfig.shape" 
              :disabled="loading"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
            >
              <option value="rectangle">正方形</option>
              <option value="trapezoid">梯形</option>
              <option value="circle">圆形</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">宽度 (m)</label>
            <input 
              v-model.number="floorConfig.width" 
              type="number" 
              min="10" 
              :disabled="loading"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">深度 (m)</label>
            <input 
              v-model.number="floorConfig.depth" 
              type="number" 
              min="10" 
              :disabled="loading"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
            />
          </div>
          <button 
            @click="saveFloorConfig" 
            :disabled="loading"
            class="w-full py-2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-md hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {{ loading ? '保存中...' : '保存楼层配置' }}
          </button>
        </div>

        <!-- 机房配置 -->
        <div v-if="activeTab === '机房配置'" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">机房编号</label>
            <input 
              v-model.number="roomConfig.roomNumber" 
              type="number" 
              min="1" 
              :disabled="loading"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">机房名称</label>
            <input 
              v-model="roomConfig.roomName" 
              type="text" 
              placeholder="例如：机房 A" 
              :disabled="loading"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">机房形状</label>
            <select 
              v-model="roomConfig.shape" 
              :disabled="loading"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
            >
              <option value="rectangle">正方形</option>
              <option value="trapezoid">梯形</option>
              <option value="circle">圆形</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">机柜数</label>
            <input 
              v-model.number="roomConfig.cabinetCount" 
              type="number" 
              min="1" 
              :disabled="loading"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">位置 X</label>
            <input 
              v-model.number="roomConfig.positionX" 
              type="number" 
              :disabled="loading"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">位置 Y</label>
            <input 
              v-model.number="roomConfig.positionY" 
              type="number" 
              :disabled="loading"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">机房颜色</label>
            <input 
              v-model="roomConfig.color" 
              type="color" 
              :disabled="loading"
              class="w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
            />
          </div>
          <button 
            @click="saveRoomConfig" 
            :disabled="loading"
            class="w-full py-2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-md hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {{ loading ? '保存中...' : '保存机房配置' }}
          </button>
        </div>

        <!-- 机柜排列配置 -->
        <div v-if="activeTab === '机柜排列'" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">排列方式</label>
            <select 
              v-model="layoutConfig.layoutType" 
              :disabled="loading"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
            >
              <option value="row">行列排列</option>
              <option value="circle">圆形排列</option>
              <option value="custom">自定义</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">列数</label>
            <input 
              v-model.number="layoutConfig.columns" 
              type="number" 
              min="1" 
              max="20" 
              :disabled="loading"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">行数</label>
            <input 
              v-model.number="layoutConfig.rows" 
              type="number" 
              min="1" 
              max="20" 
              :disabled="loading"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">间距 (m)</label>
            <input 
              v-model.number="layoutConfig.spacing" 
              type="number" 
              min="0.1" 
              step="0.1" 
              :disabled="loading"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
            />
          </div>
          <button 
            @click="saveLayoutConfig" 
            :disabled="loading"
            class="w-full py-2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-md hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {{ loading ? '保存中...' : '保存排列配置' }}
          </button>
          <button 
            @click="openGridEditor" 
            :disabled="loading"
            class="w-full py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            打开网格编辑器
          </button>
        </div>
      </div>
    </div>

    <!-- 网格编辑器模态框 -->
    <div v-if="showGridEditor" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-4xl w-9/10 max-h-[90vh] flex flex-col">
        <div class="flex justify-between items-center p-5 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-800">机房内部排列编辑器</h3>
          <button class="text-gray-500 hover:text-gray-800 transition-colors" @click="showGridEditor = false">✕</button>
        </div>
        <div class="flex-1 overflow-y-auto p-5">
          <CabinetGridEditor :room-id="selectedRoomId" @save="handleGridSave" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useConfigStore } from '@/stores/configStore';
import CabinetGridEditor from './CabinetGridEditor.vue';

const configStore = useConfigStore();
const isDrawerOpen = ref(false);
const activeTab = ref('基本配置');
const showGridEditor = ref(false);
const selectedRoomId = ref(1);
const selectedFloorId = ref(1);
const selectedDataCenterId = ref(1);
const loading = ref(false);
const message = ref('');

const tabs = ['基本配置', '楼层配置', '机房配置', '机柜排列'];

const config = ref({ name: '北京数据中心', floorCount: 3 });
const floorConfig = ref({ floorNumber: 1, floorName: '一楼', shape: 'rectangle', width: 100, depth: 100 });
const roomConfig = ref({ roomNumber: 1, roomName: '机房 A', shape: 'rectangle', cabinetCount: 100, positionX: 0, positionY: 0, positionZ: 0, rotation: 0, width: 50, depth: 50, height: 30, color: '#6b7280' });
const layoutConfig = ref({ layoutType: 'row', columns: 10, rows: 10, spacing: 1.0, startPositionX: 0, startPositionY: 0 });

// 加载已保存的配置
onMounted(async () => {
  await configStore.loadAllConfig();
  await loadSavedConfig();
});

const loadSavedConfig = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8002/api/config/data-center/1');
    if (response.ok) {
      const data = await response.json();
      config.value = { name: data.name, floorCount: data.floor_count };
      selectedDataCenterId.value = data.id;
    }
  } catch (error) {
    console.log('首次使用，无已保存配置');
  }
};

const showMessage = (msg: string, duration = 3000) => {
  message.value = msg;
  setTimeout(() => { message.value = ''; }, duration);
};

const saveBasicConfig = async () => {
  if (!config.value.name.trim()) {
    showMessage('❌ 数据中心名称不能为空');
    return;
  }
  
  loading.value = true;
  try {
    const response = await fetch('http://127.0.0.1:8002/api/config/data-center', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: config.value.name,
        floor_count: config.value.floorCount,
      }),
    });
    
    if (response.ok) {
      const data = await response.json();
      selectedDataCenterId.value = data.id;
      showMessage('✅ 基本配置已保存到数据库');
      console.log('保存的数据中心配置:', data);
      // 重新加载所有配置
      await configStore.loadAllConfig();
    } else {
      showMessage('❌ 保存失败，请重试');
    }
  } catch (error) {
    console.error('保存失败:', error);
    showMessage('❌ 保存失败: ' + (error as Error).message);
  } finally {
    loading.value = false;
  }
};

const saveFloorConfig = async () => {
  if (!floorConfig.value.floorName.trim()) {
    showMessage('❌ 楼层名称不能为空');
    return;
  }
  
  loading.value = true;
  try {
    const response = await fetch('http://127.0.0.1:8002/api/config/floors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        floor_number: floorConfig.value.floorNumber,
        floor_name: floorConfig.value.floorName,
        shape: floorConfig.value.shape,
        width: floorConfig.value.width,
        depth: floorConfig.value.depth,
        data_center_id: selectedDataCenterId.value,
      }),
    });
    
    if (response.ok) {
      const data = await response.json();
      selectedFloorId.value = data.id;
      showMessage('✅ 楼层配置已保存到数据库');
      console.log('保存的楼层配置:', data);
      // 重新加载所有配置
      await configStore.loadAllConfig();
    } else {
      showMessage('❌ 保存失败，请先保存基本配置');
    }
  } catch (error) {
    console.error('保存失败:', error);
    showMessage('❌ 保存失败: ' + (error as Error).message);
  } finally {
    loading.value = false;
  }
};

const saveRoomConfig = async () => {
  if (!roomConfig.value.roomName.trim()) {
    showMessage('❌ 机房名称不能为空');
    return;
  }
  
  loading.value = true;
  try {
    const response = await fetch('http://127.0.0.1:8002/api/config/rooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        room_number: roomConfig.value.roomNumber,
        room_name: roomConfig.value.roomName,
        shape: roomConfig.value.shape,
        color: roomConfig.value.color,
        cabinet_count: roomConfig.value.cabinetCount,
        position_x: roomConfig.value.positionX,
        position_y: roomConfig.value.positionY,
        position_z: roomConfig.value.positionZ,
        rotation: roomConfig.value.rotation,
        width: roomConfig.value.width,
        depth: roomConfig.value.depth,
        height: roomConfig.value.height,
        floor_id: selectedFloorId.value,
      }),
    });
    
    if (response.ok) {
      const data = await response.json();
      selectedRoomId.value = data.id;
      showMessage('✅ 机房配置已保存到数据库');
      console.log('保存的机房配置:', data);
      // 重新加载所有配置
      await configStore.loadAllConfig();
    } else {
      showMessage('❌ 保存失败，请先保存楼层配置');
    }
  } catch (error) {
    console.error('保存失败:', error);
    showMessage('❌ 保存失败: ' + (error as Error).message);
  } finally {
    loading.value = false;
  }
};

const saveLayoutConfig = async () => {
  loading.value = true;
  try {
    const response = await fetch('http://127.0.0.1:8002/api/config/cabinet-layout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        layout_type: layoutConfig.value.layoutType,
        columns: layoutConfig.value.columns,
        rows: layoutConfig.value.rows,
        spacing: layoutConfig.value.spacing,
        start_position_x: layoutConfig.value.startPositionX,
        start_position_y: layoutConfig.value.startPositionY,
        room_id: selectedRoomId.value,
      }),
    });
    
    if (response.ok) {
      const data = await response.json();
      showMessage('✅ 排列配置已保存到数据库');
      console.log('保存的排列配置:', data);
      // 重新加载所有配置
      await configStore.loadAllConfig();
    } else {
      showMessage('❌ 保存失败，请先保存机房配置');
    }
  } catch (error) {
    console.error('保存失败:', error);
    showMessage('❌ 保存失败: ' + (error as Error).message);
  } finally {
    loading.value = false;
  }
};

const openGridEditor = () => {
  if (selectedRoomId.value === 1) {
    showMessage('⚠️ 请先保存机房配置');
    return;
  }
  showGridEditor.value = true;
};

const handleGridSave = async () => {
  showGridEditor.value = false;
  showMessage('✅ 网格配置已保存到数据库');
  // 重新加载所有配置
  await configStore.loadAllConfig();
};
</script>

<style scoped>
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slide-up 0.3s ease;
}
</style>