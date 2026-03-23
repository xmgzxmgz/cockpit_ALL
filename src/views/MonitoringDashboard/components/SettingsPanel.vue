<template>
  <div class="settings-container">
    <!-- 消息提示 -->
    <div v-if="message" class="message-toast">{{ message }}</div>

    <!-- 设置按钮 -->
    <button class="settings-button" @click="isDrawerOpen = true" title="打开配置面板" :disabled="loading">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
      </svg>
    </button>

    <!-- 配置抽屉 -->
    <div v-if="isDrawerOpen" class="drawer-overlay" @click="isDrawerOpen = false"></div>
    <div :class="['drawer', { 'drawer-open': isDrawerOpen }]">
      <div class="drawer-header">
        <h2>数据中心配置</h2>
        <button class="close-button" @click="isDrawerOpen = false">✕</button>
      </div>

      <div class="tabs">
        <button v-for="tab in tabs" :key="tab" :class="['tab', { 'tab-active': activeTab === tab }]" @click="activeTab = tab">
          {{ tab }}
        </button>
      </div>

      <div class="drawer-content">
        <!-- 基本配置 -->
        <div v-if="activeTab === '基本配置'" class="tab-content">
          <div class="form-group">
            <label>数据中心名称</label>
            <input v-model="config.name" type="text" placeholder="输入数据中心名称" :disabled="loading" />
          </div>
          <div class="form-group">
            <label>楼层数</label>
            <input v-model.number="config.floorCount" type="number" min="1" max="10" :disabled="loading" />
          </div>
          <button class="btn-primary" @click="saveBasicConfig" :disabled="loading">{{ loading ? '保存中...' : '保存基本配置' }}</button>
        </div>

        <!-- 楼层配置 -->
        <div v-if="activeTab === '楼层配置'" class="tab-content">
          <div class="form-group">
            <label>楼层编号</label>
            <input v-model.number="floorConfig.floorNumber" type="number" min="1" :disabled="loading" />
          </div>
          <div class="form-group">
            <label>楼层名称</label>
            <input v-model="floorConfig.floorName" type="text" placeholder="例如：一楼" :disabled="loading" />
          </div>
          <div class="form-group">
            <label>楼层形状</label>
            <select v-model="floorConfig.shape" :disabled="loading">
              <option value="rectangle">正方形</option>
              <option value="trapezoid">梯形</option>
              <option value="circle">圆形</option>
            </select>
          </div>
          <div class="form-group">
            <label>宽度 (m)</label>
            <input v-model.number="floorConfig.width" type="number" min="10" :disabled="loading" />
          </div>
          <div class="form-group">
            <label>深度 (m)</label>
            <input v-model.number="floorConfig.depth" type="number" min="10" :disabled="loading" />
          </div>
          <button class="btn-primary" @click="saveFloorConfig" :disabled="loading">{{ loading ? '保存中...' : '保存楼层配置' }}</button>
        </div>

        <!-- 机房配置 -->
        <div v-if="activeTab === '机房配置'" class="tab-content">
          <div class="form-group">
            <label>机房编号</label>
            <input v-model.number="roomConfig.roomNumber" type="number" min="1" :disabled="loading" />
          </div>
          <div class="form-group">
            <label>机房名称</label>
            <input v-model="roomConfig.roomName" type="text" placeholder="例如：机房 A" :disabled="loading" />
          </div>
          <div class="form-group">
            <label>机房形状</label>
            <select v-model="roomConfig.shape" :disabled="loading">
              <option value="rectangle">正方形</option>
              <option value="trapezoid">梯形</option>
              <option value="circle">圆形</option>
            </select>
          </div>
          <div class="form-group">
            <label>机柜数</label>
            <input v-model.number="roomConfig.cabinetCount" type="number" min="1" :disabled="loading" />
          </div>
          <div class="form-group">
            <label>位置 X</label>
            <input v-model.number="roomConfig.positionX" type="number" :disabled="loading" />
          </div>
          <div class="form-group">
            <label>位置 Y</label>
            <input v-model.number="roomConfig.positionY" type="number" :disabled="loading" />
          </div>
          <button class="btn-primary" @click="saveRoomConfig" :disabled="loading">{{ loading ? '保存中...' : '保存机房配置' }}</button>
        </div>

        <!-- 机柜排列配置 -->
        <div v-if="activeTab === '机柜排列'" class="tab-content">
          <div class="form-group">
            <label>排列方式</label>
            <select v-model="layoutConfig.layoutType" :disabled="loading">
              <option value="row">行列排列</option>
              <option value="circle">圆形排列</option>
              <option value="custom">自定义</option>
            </select>
          </div>
          <div class="form-group">
            <label>列数</label>
            <input v-model.number="layoutConfig.columns" type="number" min="1" max="20" :disabled="loading" />
          </div>
          <div class="form-group">
            <label>行数</label>
            <input v-model.number="layoutConfig.rows" type="number" min="1" max="20" :disabled="loading" />
          </div>
          <div class="form-group">
            <label>间距 (m)</label>
            <input v-model.number="layoutConfig.spacing" type="number" min="0.1" step="0.1" :disabled="loading" />
          </div>
          <button class="btn-primary" @click="saveLayoutConfig" :disabled="loading">{{ loading ? '保存中...' : '保存排列配置' }}</button>
          <button class="btn-secondary" @click="openGridEditor" :disabled="loading">打开网格编辑器</button>
        </div>
      </div>
    </div>

    <!-- 网格编辑器模态框 -->
    <div v-if="showGridEditor" class="modal-overlay" @click="showGridEditor = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>机房内部排列编辑器</h3>
          <button class="close-button" @click="showGridEditor = false">✕</button>
        </div>
        <div class="modal-body">
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
const roomConfig = ref({ roomNumber: 1, roomName: '机房 A', shape: 'rectangle', cabinetCount: 100, positionX: 0, positionY: 0, positionZ: 0, rotation: 0, width: 50, depth: 50, height: 30 });
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
.settings-container {
  position: fixed;
  bottom: 40px;
  left: 40px;
  z-index: 40;
}

.message-toast {
  position: fixed;
  bottom: 120px;
  left: 40px;
  background: white;
  padding: 12px 16px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-size: 14px;
  z-index: 50;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.settings-button {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.settings-button:hover:not(:disabled) {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.settings-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 39;
}

.drawer {
  position: fixed;
  right: -400px;
  top: 0;
  bottom: 0;
  width: 400px;
  background: white;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  z-index: 41;
  transition: right 0.3s ease;
  display: flex;
  flex-direction: column;
}

.drawer-open {
  right: 0;
}

.drawer-header {
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.drawer-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  padding: 4px;
  font-size: 20px;
}

.close-button:hover {
  color: #1f2937;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  padding: 0 20px;
}

.tab {
  flex: 1;
  padding: 12px 0;
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  font-size: 14px;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

.tab:hover {
  color: #1f2937;
}

.tab-active {
  color: #667eea;
  border-bottom-color: #667eea;
}

.drawer-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.tab-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
}

.form-group input,
.form-group select {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group input:disabled,
.form-group select:disabled {
  background: #f3f4f6;
  cursor: not-allowed;
}

.btn-primary,
.btn-secondary {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: #f3f4f6;
  color: #1f2937;
  margin-top: 8px;
}

.btn-secondary:hover:not(:disabled) {
  background: #e5e7eb;
}

.btn-secondary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}
</style>
