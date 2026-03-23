import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useConfigStore = defineStore('config', () => {
  // 数据中心配置
  const dataCenterConfig = ref({
    id: 1,
    name: '北京数据中心',
    floor_count: 1,
  });

  // 楼层配置列表
  const floors = ref<any[]>([]);

  // 机房配置列表
  const rooms = ref<any[]>([]);

  // 机柜排列配置
  const layouts = ref<any[]>([]);

  // 网格数据
  const grids = ref<any[]>([]);

  // 加载数据中心配置
  const loadDataCenterConfig = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8002/api/config/data-center/1');
      if (response.ok) {
        const data = await response.json();
        dataCenterConfig.value = data;
        console.log('已加载数据中心配置:', data);
      }
    } catch (error) {
      console.error('加载数据中心配置失败:', error);
    }
  };

  // 加载楼层配置
  const loadFloors = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8002/api/config/data-center/${dataCenterConfig.value.id}/floors`);
      if (response.ok) {
        const data = await response.json();
        floors.value = data;
        console.log('已加载楼层配置:', data);
        // 加载每个楼层的机房
        for (const floor of data) {
          await loadRoomsByFloor(floor.id);
        }
      }
    } catch (error) {
      console.error('加载楼层配置失败:', error);
    }
  };

  // 加载指定楼层的机房
  const loadRoomsByFloor = async (floorId: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8002/api/config/floors/${floorId}/rooms`);
      if (response.ok) {
        const data = await response.json();
        rooms.value = [...rooms.value.filter(r => r.floor_id !== floorId), ...data];
        console.log(`已加载楼层 ${floorId} 的机房:`, data);
        // 加载每个机房的排列配置
        for (const room of data) {
          await loadLayoutByRoom(room.id);
          await loadGridByRoom(room.id);
        }
      }
    } catch (error) {
      console.error(`加载楼层 ${floorId} 的机房失败:`, error);
    }
  };

  // 加载机房的排列配置
  const loadLayoutByRoom = async (roomId: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8002/api/config/rooms/${roomId}/layout`);
      if (response.ok) {
        const data = await response.json();
        layouts.value = [...layouts.value.filter(l => l.room_id !== roomId), data];
        console.log(`已加载机房 ${roomId} 的排列配置:`, data);
      }
    } catch (error) {
      console.error(`加载机房 ${roomId} 的排列配置失败:`, error);
    }
  };

  // 加载机房的网格数据
  const loadGridByRoom = async (roomId: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8002/api/config/rooms/${roomId}/grid`);
      if (response.ok) {
        const data = await response.json();
        grids.value = [...grids.value.filter(g => g.room_id !== roomId), ...data];
        console.log(`已加载机房 ${roomId} 的网格数据:`, data);
      }
    } catch (error) {
      console.error(`加载机房 ${roomId} 的网格数据失败:`, error);
    }
  };

  // 加载所有配置
  const loadAllConfig = async () => {
    await loadDataCenterConfig();
    await loadFloors();
  };

  // 获取指定楼层的机房
  const getRoomsByFloor = (floorId: number) => {
    return rooms.value.filter(r => r.floor_id === floorId);
  };

  // 获取指定机房的排列配置
  const getLayoutByRoom = (roomId: number) => {
    return layouts.value.find(l => l.room_id === roomId);
  };

  // 获取指定机房的网格数据
  const getGridByRoom = (roomId: number) => {
    return grids.value.filter(g => g.room_id === roomId);
  };

  return {
    dataCenterConfig,
    floors,
    rooms,
    layouts,
    grids,
    loadDataCenterConfig,
    loadFloors,
    loadRoomsByFloor,
    loadLayoutByRoom,
    loadGridByRoom,
    loadAllConfig,
    getRoomsByFloor,
    getLayoutByRoom,
    getGridByRoom,
  };
});
