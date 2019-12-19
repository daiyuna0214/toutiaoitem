<template>
  <div>
    <el-container>
      <!-- 左右布局 -->
        <el-aside width="200px">
          <layout-aside></layout-aside>
        </el-aside>
        <el-container>
             <el-header>Header</el-header>
             <el-main>Main</el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script>
import layoutAside from '../../components/home/layout-aside'// 引入layout-aside子组件
export default {
  components: {
    'layout-aside': layoutAside// 注册子组件
  }
}
</script>

<style lang="less" scoped>

</style>
