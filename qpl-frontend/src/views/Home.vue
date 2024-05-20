<template>
  <div class="template-container">
    <a-row :gutter="16">
      <template-list :list="testData"></template-list>
    </a-row>
    <a-row type="flex" justify="center">
      <!-- <a-button type="primary" size="large" @click="loadMorePage" v-if="!isLastPage"
        :loading="isLoading">加载更多</a-button> -->
    </a-row>
  </div>
</template>
<script setup lang='ts'>
import useLoadMore from '@/hooks/useLoadMore';
import { GlobalDataProps } from '@/store';
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore<GlobalDataProps>()
const testData = computed(() => store.state.templates.data)
// const total = computed(() => store.state.templates.totalTemplates)
// const isLoading = computed(() => store.getters.isOpLoading('fetchTemplates'))
// const { loadMorePage, isLastPage } = useLoadMore('fetchTemplates', total, { pageIndex: 0, pageSize: 4 })
onMounted(() => {
  // store.dispatch('fetchTemplates', { searchParams: { pageIndex: 0, pageSize: 4 } })
  // 使用 loadMorePage 非常容易就实现了一个下拉加载
  // window.addEventListener('scroll', (e) => {
  //   // get body height
  //   const totalPageHeight = document.body.scrollHeight
  //   // get scrollPoint
  //   const scrollPoint = window.scrollY + window.innerHeight
  //   if (scrollPoint >= totalPageHeight && !isLastPage.value) {
  //     console.log('at the bottom')
  //     loadMorePage()
  //   }
  // })
})
</script>
<style lang='scss' scoped>
.page-title {
  color: #fff;
}

.template-container {
  background: #fff;
  padding: 0 24px 24px 30px;
  min-height: 100vh;
  margin: 50px auto;
  width: 100%;
  box-sizing: border-box;
}
</style>
