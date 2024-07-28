import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";

import './css/scrollbar.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

//原来的baseURL http://tool.selmiss.xyz/
Vue.prototype.axios=axios
// axios.defaults.baseURL='http://127.0.0.1:8000/'
// axios.defaults.baseURL='http://tool.selmiss.com/'
axios.defaults.baseURL='http://10.212.87.185/';
axios.defaults.baseURL='http://121.4.160.157/';

axios.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {
      config.headers.Authorization = localStorage.getItem('token');
    }
 
    return config;
  },
  error => {
    return Promise.reject(error);
  });

Vue.config.productionTip = false


new Vue({
  router,
  store,
  axios,
  el: '#app',
  render: h => h(App)
}).$mount('#app')