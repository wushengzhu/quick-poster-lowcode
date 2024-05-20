import { createApp } from 'vue'
import iconInit from './utils/iconfont';
import store from './store/index'
import router from './routes/index'
import App from './App.vue'
import './style.css'
import 'ant-design-vue/dist/reset.css';


let baseBackendURL = ''
let baseH5URL = ''
if (process.env.NODE_ENV === 'development' || process.env.VUE_APP_STAGINE) {
  // use test backend api when
  // in development env
  // in staging env
  // baseBackendURL = 'http://182.92.168.192:8081'
  // baseH5URL = 'http://182.92.168.192:8082'
} else {
  // baseBackendURL = 'https://api.imooc-lego.com'
  // baseH5URL = 'https://h5.imooc-lego.com'
}
export { baseBackendURL, baseH5URL }

// iconInit()
createApp(App).use(router).use(store).mount('#app')
