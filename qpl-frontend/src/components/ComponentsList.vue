<template>
  <div class="create-component-list">
    <div class="component-item" v-for="(item, index) in list" :key="index" @click="onItemClick(item)">
      <l-text v-bind="item"></l-text>
    </div>
  </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue'
defineProps({
  list: {
    type: Array,
    required: true
  }
})

const onItemClick = (item) => {

}
</script>
<style lang='scss' scoped></style>
