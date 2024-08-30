import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { createPinia } from 'pinia'
import axios from "axios";

import './css/scrollbar.css'
import './styles/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const pinia = createPinia()
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.use(pinia)
app.use(ElementPlus)

//原来的baseURL http://tool.selmiss.xyz/
axios.defaults.baseURL='http://127.0.0.1:8000/'
// axios.defaults.baseURL='http://tool.selmiss.com/'
// axios.defaults.baseURL='http://10.212.87.185/';
// axios.defaults.baseURL='http://121.4.160.157/';

axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {
      config.headers.Authorization = localStorage.getItem('token');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

app.mount('#app')