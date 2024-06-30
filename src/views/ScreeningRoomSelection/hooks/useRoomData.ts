import type { IScreeningRoom } from '@/service/interface'
import { getScreeningRooms } from '@/service/screeningRooms'
import { onMounted, onUnmounted, reactive } from 'vue'

/** REVIEW: 统一的useFetch */
export function useRoomData() {
  const state = reactive<{
    data: IScreeningRoom[]
    error: Error | null
    loading: boolean
  }>({ data: [], error: null, loading: true })

  onMounted(() => {
    getScreeningRooms()
      .then((res) => {
        state.data = res
      })
      .catch((err) => {
        state.error = err
      })
      .finally(() => {
        state.loading = false
      })
  })
  onUnmounted(() => {
    // cancel request
  })

  return state
}
