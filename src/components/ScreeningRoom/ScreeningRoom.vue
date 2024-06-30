<!-- 
需求描述：
上图红框部分为一个电影选座组件，完整功能为：通过props参数将电影放映厅的原始信息（如座位列表、 已选的座位列表、放映厅信息等）传入组件，
组件将原始信息完整显示出来； 用户可以在组件上选择座位，选中的状态如“A2”空格所示，如果当前用户已经购买过座位，则显示如“E3,4”所示，
且E3,4座位不可再操作；如果座位已经被其他用户选择，那么显示如同D2、C2，且不可再操作。用户选择完座位之后（座位可多选），
点击“Continue”按钮可以将选座信息提取出来，信息格式由开发者自定义。
需要注意，放映厅是支持多个的，且每个放映厅的选座情况是独立，如上图01、02、03 表示的都是不同放映厅。

要求：
1、组件显示模式为为手机版。
2、实际实现的效果需要达到效果图85%上即可，可以引入UI框架，如vant 等，开发者自行决定UI框架。
3、技术要求：vue3 + ts (基于组合式API规范组合代码)，不熟悉ts可以使用原生js代替，不熟悉vue3，可以使用vue2代替。
4、响应的数据请求方法需要预留，不可将数据写死在模板中，而是通过定义数据模型来绑定。
5、组件设计时，要考虑复用性的问题。 
-->
<script setup lang="ts">
import Seat from './Seat.vue'
import Toilet from './Toilet.vue'
import type { IScreeningRoom } from '@/service/interface'
import { computed } from 'vue'
const dataSource = defineModel<IScreeningRoom>()
const seatsList = computed(() => {
  return dataSource?.value?.seats?.reduce(
    (acc, current, i) => {
      if (i % 4 < 2) {
        acc[0].push(current)
      } else {
        acc[1].push(current)
      }
      return acc
    },
    [[] as IScreeningRoom['seats'], [] as IScreeningRoom['seats']],
  )
})

const onSeatClick = (id: string) => {
  if (!dataSource.value) {
    return
  }
  if (dataSource.value.selected.includes(id)) {
    dataSource.value.selected = dataSource.value.selected.filter((item) => item !== id)
  } else {
    dataSource.value.selected.push(id)
  }
}
</script>
<template>
  <div class="container">
    <div class="header">
      <Toilet side="left" />
      <div class="num">
        {{ dataSource && dataSource.id < 10 ? `0${dataSource.id}` : dataSource?.id }}
      </div>
      <Toilet side="right" />
    </div>
    <div class="col" v-for="(list, i) of seatsList" :key="i">
      <Seat
        v-for="seat in list"
        :key="seat"
        :id="seat"
        :name="seat"
        :purchased="dataSource?.purchased.includes(seat)"
        :occupied="dataSource?.occupied.includes(seat)"
        :selected="dataSource?.selected.includes(seat)"
        :onSeatClick="onSeatClick"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  --col-width: 85px;
  --seat-gap: 5px;

  position: relative;
  display: grid;
  width: 250px;
  height: 590px;
  padding: 12px;
  border: solid 3px #fff;
  border-radius: 20px;
  gap: 25px 0;
  grid-template-columns: var(--col-width) var(--col-width);
  grid-template-rows: auto 1fr;
  place-content: start space-between;

  &::after {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 55px;
    height: 20px;
    border: solid 2px #837f8d;
    border-bottom: none;
    background-color: #050110;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    content: '';
    line-height: 20px;
    text-align: center;
    transform: translateX(-50%);
  }
}

.num {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 28px;
  height: 28px;
  border-radius: 5px;
  background-color: rgb(255 255 255 / 11%);
  content: attr(data-num);
  font-size: 12px;
  line-height: 28px;
  text-align: center;
  transform: translate(-50%, -50%);
}

.header {
  position: relative;
  display: grid;
  justify-content: space-between;
  grid-column-end: span 2;
  grid-template-columns: var(--col-width) var(--col-width);
}

.col {
  display: grid;
  gap: 5px;
  grid-template-columns: 1fr 1fr;
  place-content: start space-between;
}
</style>
