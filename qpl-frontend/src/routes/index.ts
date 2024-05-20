import Index from '@/views/Index.vue';
import Home from '@/views/Home.vue';
import TemplateDetail from '@/views/TemplateDetail.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: Index,
    children: [
      { path: '', name: 'home', component: Home, meta: { title: '欢迎登录！' } },
      { path: 'template/:id', name: 'template', component: TemplateDetail, meta: { title: '模版详情' } },
      // { path: 'works', name: 'works', component: Works, meta: { title: '我的作品', requiredLogin: true, } }
    ]
  },
  {
    path: '/editor/:id',
    name: 'editor',
    component: () => import(/* webpackChunkName: "editor" */ '../views/Editor.vue'),
    meta: { requiredLogin: true, title: '编辑我的设计' }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: { redirectAlreadyLogin: true, title: '登录到一键海报', disableLoading: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router;