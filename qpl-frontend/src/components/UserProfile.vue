<template>
  <router-link to="/login" v-if="!user.isLogin">
    <a-button type="primary" class="user-profile-component">
      登 录
    </a-button>
  </router-link>
  <div v-else>
    <a-dropdown-button class="user-profile-component">
      <router-link to="/setting">{{ user.userName }}</router-link>
      <template v-slot:overlay>
        <a-menu class="user-profile-dropdown">
          <a-menu-item key="0" @click="createDesign">创建作品</a-menu-item>
          <a-menu-item key="1"><router-link to="/works">我的作品</router-link></a-menu-item>
          <a-menu-item key="2" @click="logout">登出</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown-button>
  </div>
</template>
<script setup lang='ts'>
import axios from 'axios'
import { UserProps } from '@/store';
import { PropType, ref } from 'vue'
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue'
import { useStore } from 'vuex';

defineProps({
  user: {
    type: Object as PropType<UserProps>,
    required: true
  }
})
const store = useStore()
const router = useRouter()
const createDesign = async () => {
  // const payload = {
  //   title: '未命名作品',
  //   desc: '未命名作品',
  //   coverImg: 'http://typescript-vue.oss-cn-beijing.aliyuncs.com/vue-marker/5f81cca3f3bf7a0e1ebaf885.png'
  // }
  // const postData = {
  //   method: 'post', data: payload, opName: 'createDesign'
  // } as any
  // const { data } = await axios('/works', postData)
  // message.success('创建作品成功', 2)
  // router.push(`/editor/${data.data.id}`)
  router.push(`/editor/1`)
}
const logout = () => {
  store.commit('logout')
  message.success('退出登录成功，2秒后跳转到首页', 2)
  setTimeout(() => {
    router.push('/')
  }, 2000)
}
</script>
<style lang='scss' scoped>
.user-profile-dropdown {
  border-radius: 2px !important;
}

.user-operation>* {
  margin-left: 30px !important;
}
</style>
