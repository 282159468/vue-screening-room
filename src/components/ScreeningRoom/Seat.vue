<script setup lang="ts">
import { toRefs } from 'vue'

interface IProps {
  name: string
  id: string
  size?: number
  occupied?: boolean
  selected?: boolean
  purchased?: boolean
  onSeatClick?: (id: string) => void
}
const props = defineProps<IProps>()
const { name, occupied, selected, purchased, onSeatClick } = toRefs(props)
</script>
<template>
  <div :class="{ seat: true, occupied, selected, purchased }" @click="onSeatClick?.(id)">
    {{ name }}
  </div>
</template>

<style lang="scss" scoped>
.seat {
  display: grid;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border: solid 1px var(--primary-color);
  border-radius: 5px;
  color: var(--primary-color);
  cursor: pointer;

  &.selected {
    background-color: #fff;
  }

  &.purchased {
    background-color: var(--primary-color);
    color: #fff;
    pointer-events: none;
  }

  &.occupied {
    border-color: #a6a7b9;
    color: #a6a7b9;
    cursor: not-allowed;
    pointer-events: none;
  }
}
</style>
