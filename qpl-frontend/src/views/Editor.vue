<template>
  <div class="editor-container">
    <a-layout>
      <a-layout-header class="header">
        <!-- <div class="page-title">
        <router-link to="/">
          <img alt="慕课乐高" src="../assets/logo-simple.png" class="logo-img">
        </router-link>
        <inline-edit :value="page.title" @change="titleChange"/>
      </div> -->
        <a-menu :selectable="false" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
          <a-menu-item key="1">
            <a-button type="primary" @click="preview">预览和设置</a-button>
          </a-menu-item>
          <!-- <a-menu-item key="2">
            <a-button type="primary" @click="saveWork" :loading="saveIsLoading">保存</a-button>
          </a-menu-item>
          <a-menu-item key="3">
            <a-button type="primary" @click="publish" :loading="isPublishing">发布</a-button>
          </a-menu-item>
          <a-menu-item key="4">
            <user-profile :user="userInfo"></user-profile>
          </a-menu-item> -->
        </a-menu>
      </a-layout-header>
    </a-layout>
    <a-layout>
      <a-layout-sider width="300" style="background: #fff;">
        <div class="sidebar-container">
          组件列表
          <!-- <components-list :list="defaultTextTemplates" @onItemClick="addItem"/>
        <img id="test-image" :style="{ width: '300px' }"/> -->
        </div>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px;">
        <a-layout-content class="preview-container">
          <p>画布区域</p>
          <div class="preview-list" id="canvas-area"></div>
        </a-layout-content>
      </a-layout>
      <a-layout-sider width="300" style="background: #fff;" class="settings-pannel">
        <a-tabs type="card">
          <a-tab-pane key="component" tab="属性设置" class="no-top-radius">
            <!-- <div v-if="currentElement">
              <edit-group v-if="!currentElement.isLocked" :props="currentElement.props"
                @change="handleChange"></edit-group>
              <div v-else>
                <a-empty>
                  <template #description>
                    <p>该元素被锁定，无法编辑</p>
                  </template>
</a-empty>
</div>
</div> -->
            <!-- <pre>{{ currentElement && currentElement.props }}</pre> -->
          </a-tab-pane>
          <a-tab-pane key="layer" tab="图层设置">
            <!-- <layer-list :list="components" :selectedId="currentElement && currentElement.id" @change="handleChange"
              @select="setActive">
            </layer-list> -->
          </a-tab-pane>
          <a-tab-pane key="page" tab="页面设置">
            <!-- <props-table :props="page.props" @change="pageChange"></props-table> -->
          </a-tab-pane>
        </a-tabs>
      </a-layout-sider>
    </a-layout>
  </div>
</template>
<script setup lang='ts'>
import { GlobalDataProps } from '@/store';
import { pickBy } from 'lodash-es';
import { nextTick, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

// initHotKeys()
//     initContextMenu()
// const route = useRoute()
// const currentWorkId = route.params.id
const store = useStore<GlobalDataProps>()
// const activePanel = ref<TabType>('component')
// const components = computed(() => store.state.editor.components)
// const page = computed(() => store.state.editor.page)
// const userInfo = computed(() => store.state.user)
// const canvasFix = ref(false)
// const showPublishForm = ref(false)
// const showPreviewForm = ref(false)
// const currentElement = computed<ComponentData | null>(() => store.getters.getCurrentElement)
// const { saveWork, saveIsLoading } = useSaveWork()
// const { publishWork, isPublishing } = usePublishWork()
onMounted(() => {
  if (currentWorkId) {
    store.dispatch('fetchWork', { urlParams: { id: currentWorkId } })
  }
  // navigator.clipboard.writeText('hello').then(() => {
  //   alert('nice')
  // }, (e) => {
  //   console.error(e)
  // })
})
const addItem = (component: any) => {
  store.commit('addComponent', component)
}
const setActive = (id: string) => {
  store.commit('setActive', id)
}
const handleChange = (e: any) => {
  console.log('event', e)
  store.commit('updateComponent', e)
}
const pageChange = (e: any) => {
  console.log('page', e)
  store.commit('updatePage', e)
}
const titleChange = (newTitle: string) => {
  store.commit('updatePage', { key: 'title', value: newTitle, isRoot: true })
}
const updatePosition = (data: { left: number; top: number; id: string }) => {
  const { id } = data
  const updatedData = pickBy<number>(data, (v, k) => k !== 'id')
  const keysArr = Object.keys(updatedData)
  const valuesArr = Object.values(updatedData).map(v => v + 'px')
  store.commit('updateComponent', { key: keysArr, value: valuesArr, id })
}
const publish = async () => {
  // remove select element
  // store.commit('setActive', '')
  // const el = document.getElementById('canvas-area') as HTMLElement
  // canvasFix.value = true
  // await nextTick()
  // try {
  //   await publishWork(el)
  //   showPublishForm.value = true
  // } catch (e) {
  //   console.error(e)
  // } finally {
  //   canvasFix.value = false
  // }
}
const preview = async () => {
  // await saveWork()
  // showPreviewForm.value = true
}
const route = useRoute()
const currentWorkId = route.params.id
</script>
<style lang='scss' scoped>
.editor-container .preview-container {
  padding: 24px;
  margin: 0;
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.editor-container .preview-list {
  padding: 0;
  margin: 0;
  min-width: 375px;
  min-height: 200px;
  border: 1px solid #efefef;
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  margin-top: 50px;
  max-height: 80vh;
}

.page-title {
  display: flex;
}

.page-title .inline-edit span {
  font-weight: 500;
  margin-left: 10px;
  font-size: 16px;
}

.preview-list.canvas-fix .edit-wrapper>* {
  box-shadow: none !important;
}

.preview-list.canvas-fix {
  position: absolute;
  max-height: none;
}
</style>
