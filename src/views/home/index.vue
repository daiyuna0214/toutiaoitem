<template>
  <div>
    <el-container>
      <!-- 左右布局 -->
        <el-aside :style="{width:collapse?'60px':'201px'}" style="min-height:'100vh'">
          <!-- 使用layout-aside组件 -->
          <!-- 把collapse传递给侧边栏,当主页折叠或展开时,侧边栏也需要根据collapse的变化做出相应的调整 -->
          <layout-aside :collapse='collapse'></layout-aside>
        </el-aside>
        <el-container>
             <el-header>
               <!-- 使用layout-header组件 -->
               <layout-header></layout-header>
             </el-header>
             <el-main style="padding:0">
               <!-- 二级路由容器 -->
              <router-view></router-view>
             </el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      collapse: false// 定义是否折叠
    }
  },
  created () {
    // 页面创建完成监听是否折叠
    eventBus.$on('changeCollapse', () => {
      this.collapse = !this.collapse
    })
  }
}
</script>

<style lang="less" scoped>

</style>
