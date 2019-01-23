import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
import '@/assets/css/init.css'//初始化css
import '@/assets/css/reset.less'//改变element原来样式
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
