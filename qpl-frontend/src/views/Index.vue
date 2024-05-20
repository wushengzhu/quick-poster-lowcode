<template>
  <div class="home-container">
    <a-layout :style="{ background: '#fff' }">
      <a-layout-header class="header">
        <div class="page-title">
          <router-link to="/">一键海报</router-link>
        </div>
        <user-profile :user="user"></user-profile>
      </a-layout-header>
      <a-layout-content class="home-layout">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer>
        © 慕课网（imooc.com）版权所有 | 津ICP备20000929号-2
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<script setup lang="ts">
import { IFeatureItem, featureItems } from '@/constant/feature-item'
import { GlobalDataProps } from '@/store';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import type { CSSProperties } from 'vue';
import { useStore } from 'vuex';

// const headerStyle: CSSProperties = {
//   textAlign: 'center',
//   color: '#fff',
//   height: 64,
//   paddingInline: 50,
//   lineHeight: '64px',
//   backgroundColor: '#7dbcea',
// };

const store = useStore<GlobalDataProps>()
const user = computed(() => store.state.user.user)
console.log(user.value)
const featureDetails = ref<Array<IFeatureItem>>(featureItems)
const searchText = ref('')
const onSearch = () => {

}

const handleScroll = () => {
  console.log('scroll!!!');
}

onMounted(() => {
  document.body.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  document.body.removeEventListener('scroll', handleScroll)
})
</script>
<style lang="scss" scoped>
.home-container {

  // width: 100%;
  // min-height: 100vh;
  // position: relative;
  // box-sizing: border-box;
  .home-layout {
    min-height: 85vh;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }


  a {
    color: #fff !important;
  }

  .page-title {
    color: #fff !important;
    letter-spacing: 1px;
    font-size: 20px;
    font-weight: bold;
  }
}
</style>
