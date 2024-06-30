<script setup lang="ts">
import { ref } from 'vue'
import { useRoomData } from './hooks/useRoomData'
import { computed } from 'vue'
import ScreeningRoom from '@/components/ScreeningRoom/ScreeningRoom.vue'
import RoomMenu from './RoomMenu.vue'
const currentId = ref(1)
const roomState = useRoomData()
const currentRoom = computed(() => {
  const room = roomState.data.find((item) => item.id === currentId.value)
  return room
})

const onSubmit = () => {
  const data = roomState.data.map((item) => {
    const { id, selected, occupied, purchased } = item
    return { id, selected, occupied, purchased }
  })
  console.log('submit data:', data)
}
</script>

<template>
  <span v-if="roomState.loading" class="loading">loading ...</span>
  <div v-else class="screening-room-selection">
    <ScreeningRoom v-model="currentRoom" :key="currentId" />
    <RoomMenu v-model:rooms="roomState.data" v-model:currentId="currentId" />
    <div class="submit" @click="onSubmit">Continue</div>
  </div>
</template>

<style scoped>
.screening-room-selection {
  display: grid;
  padding: 20px;
  gap: 30px;
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr auto;
}

.loading {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  display: grid;
  width: 100px;
  height: 100px;
  border-radius: 5px;
  background-color: rgb(255 255 255 / 11%);
  place-content: center;
  transform: translate(-50%, -50%);
}

.submit {
  display: grid;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: var(--primary-color);
  color: #fff;
  cursor: pointer;
  grid-column-end: span 2;
}
</style>
