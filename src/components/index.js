import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'
import breadCrumb from './common/bread-crumb'
export default {
  install (Vue) {
    // console.log(Vue)
    Vue.component('layout-aside', layoutAside)// 全局注册左侧导航组件
    Vue.component('layout-header', layoutHeader)// 全局注册头部组件
    Vue.component('bread-crumb', breadCrumb)// 全局注册面包屑
  }
}
