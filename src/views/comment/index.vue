<template>
  <div>
      <!-- 卡片组件 -->
      <el-card  v-loading="loading">
          <!-- 使用面包屑 -->
          <!-- 因为每一条评论的下面都有一条线，所以使用wl-card的具名插槽header，把卡片的具名插槽给面包屑 -->
          <bread-crumb slot="header">
             <template slot="title">评论列表</template>
          </bread-crumb>
          <!-- body内容  table表格 -->
           <el-table :data="list">
           <el-table-column prop="title" label="标题" width="600"></el-table-column>
           <el-table-column  :formatter='formatterBool' prop="comment_status" label="评论状态"></el-table-column>
           <el-table-column  prop="total_comment_count" label="总评论数"></el-table-column>
           <el-table-column  prop="fans_comment_count" label="粉丝评论数"></el-table-column>
           <el-table-column label="操作">
               <template slot-scope="obj">
                 <!-- {{obj.row}}obj.row可以获取到当前行的数据 -->
                 <!-- 通过 Scoped slot 可以获取到 row（当前行数据）, column（当前列数据）, $index 和 store（table 内部的状态管理）的数据 -->
                   <el-button type="text">修改</el-button>
                   <!-- 给打开和关闭按钮添加点击事件,并传入当前行的数据 -->
                   <el-button type="text" @click="openOrClose(obj.row)">{{obj.row.comment_status?'关闭评论':'打开评论'}}</el-button>
               </template>
           </el-table-column>
           </el-table>
           <el-row type="flex" justify="center" align="middle" style="height:8ss0px">
             <el-pagination
               background
               layout="prev, pager, next"
               :total="page.total"
               :page-size="page.pageSize"
               :current-page="page.currentPage"
               @current-change='changePage'>
               <!-- 当前页码改变时触发current-change事件 -->
             </el-pagination>
           </el-row>
      </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        currentPage: 1, // 定义默认当前页
        total: 0, // 定义总页数默认值
        pageSize: 10// 定义每页默认显示数据的条数
      },
      loading: false// 加载状态默认false
    }
  },
  methods: {
    async getMessage () {
      // 请求成功之前加载，设为true
      this.loading = true
      // axios默认是get请求
      let res = await this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize }
      })
      // console.log(res)
      // 把获取到的信息赋值给list
      this.list = res.data.results
      this.page.total = res.data.total_count// 获取文章总条数//
      // 请求成功关闭加载，设为false
      this.loading = false
    },
    // 定义一个布尔值转化的方法
    formatterBool: (row, column, cellValue, index) => {
      // row当前行的数据
      // column当前列的数据
      // cellValue当前单元格的值
      // index当前下标
      return cellValue ? '正常' : '关闭'
    },
    async openOrClose (row) {
    // 点击修改文章的评论状态
      // row为当前行的数据
      let mess = row.comment_status ? '关闭' : '打开'
      await this.$confirm(`确定${mess}评论`).then // 确认调用接口
      await this.$axios({
        method: 'put',
        url: '/comments/status',
        params: {
          article_id: row.id.toString()
        },
        data: {
          allow_comment: !row.comment_status// 布尔值 评论状态为打开时允许评论，为关闭时不允许评论
        }
      })
      // 打开或关闭评论成功之后
      this.$message({
        type: 'success',
        message: '操作成功!'
      })
      // 重新渲染页面
      this.getMessage()
    },
    // 点击不同的页码，切换不同的内容
    changePage (newPage) {
      // 修改当前页码
      this.page.currentPage = newPage
      // 重新渲染页面
      this.getMessage()
    }
  },
  //   页面渲染完成获取评论
  created () {
    this.getMessage()
  }
}
</script>

<style>

</style>
