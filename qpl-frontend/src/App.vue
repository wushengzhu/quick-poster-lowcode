<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { GlobalDataProps } from './store';
import { message } from 'ant-design-vue';

const store = useStore<GlobalDataProps>()
const route = useRoute()
const isLoading = computed(() => store.getters.isLoading)
const showLoading = computed(() => isLoading.value && !route.meta.disableLoading)
// const error = computed(() => store.state.global.error)
// watch(() => error.value.status, (errorValue) => {
//   if (errorValue) {
//     message.error(error.value.message || '未知错误', 2)
//   }
// })
</script>

<template>
  <div class="app-container">
    <!-- <a-spin v-if="showLoading" tip="读取中" class="global-spinner" /> -->
    <router-view />
  </div>
</template>

<style scoped>
.app-container {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  overflow-x: hidden;
}
</style>
