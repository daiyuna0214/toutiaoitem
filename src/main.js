import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'// 引入UI
import 'element-ui/lib/theme-chalk/index.css'// 引入样式
import './styles/index.less'// 引入初始化样式
import axios from './utils/request'// 引入一个自己封装的axios
import component from './components'// 引入组件对象
import './permission'// 引入js

Vue.prototype.$axios = axios
Vue.use(ElementUI)// 注册UI
Vue.use(component)// 注册组件
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
