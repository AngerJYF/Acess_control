import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import Collapse from './module/Collapse.js'
import User from './module/User.js'
export default new vuex.Store({
  modules: {
    Collapse,
    User
  }
})