import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'
import breadCrumb from './common/bread-crumb'
import { quillEditor } from 'vue-quill-editor'// 引入富文本编辑器组件
import coverImage from './publish/cover-image'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import selectImage from './publish/select-image'// 引入选择图片组件
export default {
  install (Vue) {
    // console.log(Vue)
    Vue.component('layout-aside', layoutAside)// 全局注册左侧导航组件
    Vue.component('layout-header', layoutHeader)// 全局注册头部组件
    Vue.component('bread-crumb', breadCrumb)// 全局注册面包屑
    Vue.component('quill-editor', quillEditor)// 全局注册富文本编辑器组件
    Vue.component('cover-image', coverImage)// 全局注册封面组件
    Vue.component('select-image', selectImage)// 全局注册选择图片组件
  }
}
