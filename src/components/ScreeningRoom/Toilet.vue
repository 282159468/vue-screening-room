<script setup lang="ts">
import { toRefs } from 'vue'

export interface IProps {
  side: 'left' | 'right'
}
const props = defineProps<IProps>()
const { side } = toRefs(props)
</script>

<template>
  <div :class="{ toilet: true, [side]: side }">WC</div>
</template>

<style lang="scss" scoped>
.toilet {
  --radius-size: 20px;

  display: grid;
  height: 40px;
  align-items: center;
  justify-content: center;
  border: solid 1px #363344;
  color: #a7a8bc;

  &.left {
    border-top-left-radius: var(--radius-size);
  }

  &.right {
    border-top-right-radius: var(--radius-size);
  }
}
</style>
