<template>
  <el-card class="articles">
      <bread-crumb slot="header">
         <template slot="title">内容列表</template>
      </bread-crumb>
      <el-row class="selectTool">
          <el-col :span=2>文章状态</el-col>
          <el-col :span=12>
                <el-radio-group v-model="formData.status">
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
            <el-select v-model="formData.channel_id" placeholder="请选择">
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
                  <el-date-picker
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
          共找到62290条符合条件的内容
      </el-row>
      <el-row class="article-item" type="flex" justify="space-between" v-for="item in 100" :key=item>
          <el-col :span=14>
              <el-row type="flex">
                      <img src="../../assets/img/404.png" alt="">
                  <div class="info">
                      <span class="info-item">大千世界无奇不有</span>
                      <el-tag class="tag">标签一</el-tag>
                      <span class="data">2019-12-24 17:23:08</span>
                  </div>
              </el-row>
          </el-col>
          <el-col :span=4 class="icon">
              <i class="el-icon-edit">修改</i>
              <i class="el-icon-delete del">删除</i>
          </el-col>
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
        timeValue: []
      },
      channels: []// 定义一个数组接收频道
    }
  },
  methods: {
    // 获取文章频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        // console.log(res)
        this.channels = res.data.channels
      })
    }
  },
  created () {
    this.getChannels()
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
                margin-left: 8px
            }
        }
    }
}
</style>
