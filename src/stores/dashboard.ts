/**
 * 仪表板状态管理 Store
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface RoomData {
  id: string
  name: string
  floor: number
}

export const useDashboardStore = defineStore('dashboard', () => {
  const currentFloor = ref<number | 'all'>('all')
  const selectedRoom = ref<RoomData | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const selectFloor = (floor: number | 'all') => {
    currentFloor.value = floor
  }

  const setSelectedRoom = (room: RoomData | null) => {
    selectedRoom.value = room
  }

  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  const setError = (errorMessage: string | null) => {
    error.value = errorMessage
  }

  return {
    currentFloor,
    selectedRoom,
    isLoading,
    error,
    selectFloor,
    setSelectedRoom,
    setLoading,
    setError,
  }
})
