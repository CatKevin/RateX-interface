import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import store from "./store/index.js";

import HappyScroll from 'vue-happy-scroll'
import 'vue-happy-scroll/docs/happy-scroll.css'


router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + ""
  }
  next()
})

router.afterEach(() => {
  document.documentElement.scrollTop = 0
})

Vue.config.productionTip = false

Vue.use(HappyScroll)
Vue.use(ElementUI);
Vue.use(mavonEditor)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
