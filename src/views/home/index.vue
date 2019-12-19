<template>
  <div>
    <el-container>
      <!-- 左右布局 -->
        <el-aside width="200px">
          <!-- 使用layout-aside组件 -->
          <layout-aside></layout-aside>
        </el-aside>
        <el-container>
             <el-header>
               <!-- 使用layout-header组件 -->
               <layout-header></layout-header>
             </el-header>
             <el-main>Main</el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  components: {
  }
}
</script>

<style lang="less" scoped>

</style>
