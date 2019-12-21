<template>
  <div>
      <!-- 卡片组件 -->
      <el-card>
          <!-- 使用面包屑 -->
          <!-- 因为每一条评论的下面都有一条线，所以使用wl-card的具名插槽header，把卡片的具名插槽给面包屑 -->
          <bread-crumb slot="header">
             <template slot="title">评论列表</template>
          </bread-crumb>
          <!-- body内容  table表格 -->
           <el-table>
           <el-table-column label="标题" width="600"></el-table-column>
           <el-table-column label="评论状态"></el-table-column>
           <el-table-column label="总评论数"></el-table-column>
           <el-table-column label="粉丝评论数"></el-table-column>
           <el-table-column label="操作"></el-table-column>
           </el-table>
      </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
