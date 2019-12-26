<template>
  <el-card>
      <bread-crumb slot="header">
          <template slot="title">发布文章</template>
      </bread-crumb>
      <el-form style="margin-left:50px" label-width="100px" :model="formData" :rules="publishRules" ref="publishForm">
          <el-form-item label="标题" prop="title">
              <el-input placeholder="文章名称" style="width:40%" v-model="formData.title"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
              <el-input type="textarea" v-model="formData.content"></el-input>
          </el-form-item>
          <el-form-item label="封面">
               <el-radio-group>
                 <el-radio :label="3">单图</el-radio>
                 <el-radio :label="6">三图</el-radio>
                 <el-radio :label="9">无图</el-radio>
                 <el-radio :label="9">自动</el-radio>
               </el-radio-group>
          </el-form-item>
          <el-form-item label="频道" prop="channel_id">
               <el-select v-model="formData.channel_id">
                  <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name"></el-option>
               </el-select>
          </el-form-item>
          <el-form-item>
               <el-button type="primary" @click="publishArticles()">发布</el-button>
               <el-button @click="publishArticles(true)">存入草稿</el-button>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [], // 定义一个数组接收文章频道
      //   定义一个表单数据
      formData: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {// 封面
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: []
        },
        channel_id: null// 频道
      },
      //   定义规则
      publishRules: {
        title: [{ required: true, message: '标题不能为空' },
          { min: 5, max: 30, message: '文章标题长度需要在5-30字之间' }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道分类不能为空' }]
      }
    }
  },
  watch: {
    // 共用同一个组件
    // 复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch (监测变化) $route 对象：
    $route: function (to, from) {
      // console.log(to)
      // Object.keys(对象)，可以吧对象里面的属性以数组的形式表现出来
      if (Object.keys(to.params).length) {
        // 有参数去修改页面
      } else {
        // 没有参数去发布页面
        // 所以此时需要把表单里面的内容恢复到原来的状态
        this.formData = {
          title: '', // 文章标题
          content: '', // 文章内容
          cover: {// 封面
            type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
            images: []
          },
          channel_id: null// 频道
        }
      }
    }
  },
  methods: {
    // 获取文章频道
    getChannel () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        // console.log(res)
        this.channels = res.data.channels
      })
    },
    // 发布文章
    publishArticles (draft) {
      // 自动校验
      this.$refs.publishForm.validate(value => {
        if (value) {
          alert('校验成功')
          //   调接口发请求
          this.$axios({
            url: '/articles',
            params: { draft }, // query参数
            data: this.formData, // body参数
            method: 'post'
          }).then(() => {
            this.$router.push('/home/articles')
          })
        }
      })
    }
  },
  created () {
    this.getChannel()
  }
}
</script>

<style>

</style>
