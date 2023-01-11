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
axios.defaults.baseURL='http://127.0.0.1:8000/'
Vue.config.productionTip = false



new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
