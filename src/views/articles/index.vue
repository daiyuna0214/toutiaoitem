<template>
  <el-card class="articles">
      <bread-crumb slot="header">
         <template slot="title">内容列表</template>
      </bread-crumb>
      <el-row class="selectTool">
          <el-col :span=2>文章状态</el-col>
          <el-col :span=12>
                <el-radio-group v-model="formData.status" @change="changeCondition">
                    <!-- 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部 -->
                    <el-radio :label="5">全部</el-radio>
                    <!-- 全部的5是默认的，在传参的时候判断一下是不是5，如果是5 就传个null -->
                    <el-radio :label="1">草稿</el-radio>
                    <el-radio :label="2">待审核</el-radio>
                    <el-radio :label="3">审核通过</el-radio>
                    <el-radio :label="4">审核失败</el-radio>
                </el-radio-group>
          </el-col>
      </el-row>
      <el-row class="selectTool">
          <el-col :span=2>频道列表</el-col>
          <el-col :span=6>
            <el-select v-model="formData.channel_id" placeholder="请选择" @change="changeCondition">
               <el-option
                 v-for="item in channels"
                 :key="item.id"
                 :label="item.name"
                 :value="item.id">
               </el-option>
            </el-select>
          </el-col>
      </el-row>
      <el-row class="selectTool">
          <el-col :span=2>时间选择</el-col>
          <el-col :span=10>
                <div class="block">
                  <el-date-picker @change="changeCondition"
                  value-format="yyyy-MM-dd"
                    v-model="formData.timeValue"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </div>
          </el-col>
      </el-row>
      <el-row class="total">
          共找到{{page.total}}条符合条件的内容
      </el-row>
      <el-row class="article-item" type="flex" justify="space-between" v-for="item in list" :key="item.id.toString()">
          <el-col :span=14>
              <el-row type="flex">
                      <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt="">
                  <div class="info">
                      <span class="info-item">{{item.title}}</span>
                      <el-tag class="tag" :type="item.status | filterType">{{item.status | filterStatus}}</el-tag>
                      <span class="data">{{item.pubdate}}</span>
                  </div>
              </el-row>
          </el-col>
          <el-col :span=4 class="icon">
              <i class="el-icon-edit">修改</i>
              <i class="el-icon-delete del">删除</i>
          </el-col>
      </el-row>
      <el-row type="flex" justify="center" align="middle" style="height:80px">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="page.total"
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            @current-change="changePage">
          </el-pagination>
      </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        status: 5, // 默认选择全部
        channel_id: null, // 频道列表默认是空
        timeValue: []// 起止时间默认是一个空数组
      },
      channels: [], // 定义一个数组接收频道
      list: [],
      defaultImg: require('../../assets/img/404.png'),
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 1
      }
    }
  },
  filters: {
    filterStatus (value) {
    //   文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
      }
    },
    filterType (value) {
      switch (value) {
        case 0 :
          return 'warning'
        case 1 :
          return 'info'
        case 2 :
          return ''
        case 3 :
          return 'danger'
      }
    }
  },
  methods: {
    // 删除文章
    // delArticle (id) {
    //   // 所有已发布的文章是不可以删除的  只有草稿才可以删除
    //   this.$confirm('您是否要删除这个文章?').then(() => {
    //     // 直接删除
    //     this.$axios({
    //       method: 'delete',
    //       url: `/articles/${id.toString()}`
    //     }).then(() => {
    //       this.$message({
    //         type: 'success',
    //         message: '删除文章成功!'
    //       })
    //       this.getCondition() // 重新调用
    //     })
    //   })
    // },
    // 获取文章频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        // console.log(res)
        this.channels = res.data.channels
      })
    },
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(res => {
        console.log(res)
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    },
    changeCondition () {
      // 条件改变把当前页改为第一页
      this.page.currentPage = 1
      this.getCondition()
    },
    // 改变页码事件
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getCondition()
    },
    // 获取条件改变
    getCondition () {
      let params = {
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        status: this.formData.status === 5 ? null : this.formData.status, // 不传为全部 5代表全部
        channel_id: this.formData.channel_id, // 频道
        begin_pubdate: this.formData.timeValue.length ? this.formData.timeValue[0] : null, // 起始时间
        end_pubdate: this.formData.timeValue.length > 1 ? this.formData.timeValue[1] : null // 截止时间
      }
      this.getArticles(params)
    }
  },
  created () {
    this.getChannels()
    this.getArticles({ page: 1, per_page: 10 })
  }
}
</script>

<style lang='less' scoped>
.articles{
    .selectTool{
        height: 60px;
        padding-left: 20px;
    }
    .total{
        margin: 30px 0;
        height: 60px;
        border-bottom: 1px dashed #ccc;
    }
    .article-item{
        margin: 20px 0;
        border-bottom: 1px solid #999;
        padding: 10px 0;
        .info{
            margin-left: 20px;
            height: 100px;
            display: flex;
            flex-direction:column;
            justify-content: space-between;
            .info-item{
                font-size: 14px;
            }
            .tag{
                width: 60px;
            }
            .data{
                font-size: 12px;
                color: #999;
            }
        }
        img{
            width: 180px;height: 100px;
            border-radius: 5px;
        }
        .icon{
            font-size: 12px;
            .del{
                margin-left: 8px;
                cursor: pointer;
            }
        }
    }
}
</style>
