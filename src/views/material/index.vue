<template>
  <el-card v-loading='loading'>
      <bread-crumb slot="header">
      <template slot="title">素材管理</template>
      </bread-crumb>
      <el-row type="flex" justify="end">
         <el-upload :http-request='uploadImg' :show-file-list="false" action="http://http://localhost:8080/home/material">
            <el-button size="small" type="primary">点击上传</el-button>
         </el-upload>
      </el-row>
      <el-tabs v-model="activeName"  @tab-click="handleClick">
      <el-tab-pane label="全部素材" name="all">
          <div class="img-list">
              <el-card v-for="item in list" :key='item.id' class="img-card">
                  <img :src="item.url" alt="">
                  <el-row class="icon" type="flex" justify="space-around" align="middle">
                      <i class="el-icon-star-on" :style="{color:item.is_collected?'red':''}" @click="collectOrCancle(item)"></i>
                      <i @click="delMaterial(item.id)" class="el-icon-delete-solid"></i>
                  </el-row>
              </el-card>
          </div>
          <el-row type="flex" justify='center' align='middle' style="height:80px">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="page.total"
                :page-size='page.pageSize'
                :current-page="page.currentPage"
                @current-change='changePage'>
              </el-pagination>
          </el-row>
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">
           <div class="img-list">
             <el-card v-for="item in list" :key='item.id' class="img-card">
                  <img :src="item.url" alt="">
              </el-card>
          </div>
          <el-row type="flex" justify='center' align='middle' style="height:80px">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="page.total"
                :page-size='page.pageSize'
                :current-page="page.currentPage"
                @current-change='changePage'>
              </el-pagination>
          </el-row>
      </el-tab-pane>
      </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认选中全部素材
      page: {
        total: 0,
        pageSize: 8,
        currentPage: 1
      },
      list: [], // 定义一个空数组，用来接收传出来的所有数据
      loading: false
    }
  },
  methods: {
    // 获取素材
    async getAllMaterial () {
      // 调用接口，获取数据
      let res = await this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect',
          page: this.page.currentPage,
          per_page: this.page.pageSize }
      })
      // console.log(res)
      this.list = res.data.results
      this.page.total = res.data.total_count
    },
    // tab切换
    handleClick () {
      // tab切换时应该把当前页码回到第一页，如果不重置，就会找不到对应的页码
      this.page.currentPage = 1
      // tab切换时，重新渲染页面
      this.getAllMaterial()
    },
    // 切换分页
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllMaterial()// 重新渲染页面
    },
    // 上传图片
    async uploadImg (params) {
      // 上传没成功之前加载进度条
      this.loading = true
      let fd = new FormData()
      fd.append('image', params.file)
      // 发请求，调接口
      await this.$axios({
        url: '/user/images',
        method: 'post',
        data: fd
      })
      // console.log(res)
      // 重新渲染页面
      // 上传成功取消进度条
      this.loading = false
      this.getAllMaterial()
    },
    // 收藏或取消收藏图片
    async collectOrCancle (item) {
      // 调用接口，发送请求
      await this.$axios({
        url: `user/images/${item.id}`,
        method: 'put',
        data: { collect: !item.is_collected }
      })
      // console.log(res)
      // 收藏成功重新渲染页面
      this.getAllMaterial()
    },
    async delMaterial (id) {
      await this.$confirm('您确定要删除该素材吗') // 只有点击了确定 才会执行
      // 调用删除接口
      await this.$axios({
        url: `/user/images/${id}`,
        method: 'delete'
      })
      // 重新拉取
      this.getAllMaterial() // 重新加载数据
    }
  },
  created () {
    this.getAllMaterial()
  }
}
</script>

<style lang='less' scoped>
.img-list{
    display: flex;
    flex-wrap: wrap;
    .img-card{
        width: 200px;
        height: 240px;
        margin: 20px 50px;
        position: relative;
        img{
            width:100%;
            height: 100%;
        }
        .icon{
            width: 100%;
            height: 30px;
            font-size: 20px;
            position: absolute;
            bottom: 0;
            left: 0;
            background-color: #f4f5f6;
            i{
              cursor: pointer;
            }
        }
    }
}
</style>
