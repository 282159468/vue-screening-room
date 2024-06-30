<script setup lang="ts">
import type { IScreeningRoom } from '@/service/interface'

export interface IProps {}
const dataSource = defineModel<IScreeningRoom[]>('rooms')
const currentId = defineModel<number>('currentId')
</script>

<template>
  <ul>
    <li
      :class="{ 'menu-item': true, selected: item.id === currentId }"
      v-for="item of dataSource"
      :key="item.id"
      @click="currentId = item.id"
    >
      {{ item.id < 10 ? `0${item.id}` : item.id }}
    </li>
  </ul>
</template>

<style scoped>
.menu-item {
  position: relative;
  display: grid;
  width: 30px;
  height: 65px;
  border-radius: 5px;
  margin-bottom: 15px;
  background-color: #191524;
  color: #fff;
  cursor: pointer;
  place-content: center;

  &:not(:last-child)::after {
    position: absolute;
    bottom: -15px;
    left: 50%;
    width: 8px;
    height: 15px;
    border-radius: 1px;
    background-color: #fff;
    content: '';
    pointer-events: none;
    transform: translateX(-50%);
  }

  &.selected {
    background-color: var(--primary-color);
  }
}
</style>
