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
}
</style>
