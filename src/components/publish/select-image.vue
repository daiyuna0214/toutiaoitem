<template>
   <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="素材库" name="material">
        <div class="shelet-img-list">
            <!-- 循环生成图片 -->
            <el-card class="img-card" v-for="(item,index) in list" :key="index">
                <!-- 点击图片时需要把图片的地址传递给父组件 -->
                <img :src="item.url" alt="" @click="clickImg(item.url)">
            </el-card>
            <el-row type="flex" justify="center" align="middle" style="height:60px">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="page.total"
                  :current-page="page.currentPage"
                  :page-size="page.pageSize"
                  @current-change='changePage'>
                </el-pagination>
            </el-row>
        </div>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="uploadImg">
        <el-upload class="upload-img" action="" :http-request="uploadImg" :show-file-list="false">
            <i class="el-icon-plus"></i>
        </el-upload>
    </el-tab-pane>

  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material', // 默认选择素材库
      list: [], // 接收素材
      page: {
        currentPage: 1,
        pageSize: 6,
        total: 0
      }
    }
  },
  methods: {
    async uploadImg (params) {
      let fd = new FormData()
      fd.append('image', params.file)
      //   发请求调接口
      let res = await this.$axios({
        url: '/user/images',
        method: 'post',
        data: fd
      })
      console.log(res)
      // 上传图片和点击素材是一个目的，所以直接和点击写一样即可
      this.$emit('selectOneImg', res.data.url)
    },
    //   点击图片触发的事件
    clickImg (url) {
      // 需要将url地址传出去 使用  $emit事件
      this.$emit('selectOneImg', url)
    },
    // 获取所有素材
    async getMaterial () {
      let res = await this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          per_page: this.page.pageSize,
          page: this.page.currentPage
        }
      })
      // console.log(res)
      this.list = res.data.results
      this.page.total = res.data.total_count
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    }
  },
  created () {
    // 页面创建完成获取素材
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.shelet-img-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .img-card{
        width: 120px;
        height: 120px;
        margin: 10px 20px;
        img{
            width:100%;
            height: 100%;
        }
    }
}
.upload-img{
    display: flex;
    justify-content: center;
    i{
        width: 50px;
        height: 50px;
        font-size: 50px
    }
}
</style>
