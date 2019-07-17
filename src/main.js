import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//样式normalize
import 'style/border.css';
import 'style/reset.css';
//公共样式
import 'style/index.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
