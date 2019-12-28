<template>
  <el-card v-model="loading">
      <bread-crumb slot="header">
         <template slot="title">账户信息</template>
      </bread-crumb>
      <el-form style="margin-left:30px" label-width="100px"
      ref='myForm' :model="formData" :rules="userRules">
          <el-upload class='head-upload' action="" :show-file-list="false" :http-request="uploadImg">
              <img :src="formData.photo?formData.photo:defaultImg" alt="">
          </el-upload>
          <el-form-item label="用户名" prop="name">
              <el-input v-model="formData.name" style="width:30%"></el-input>
          </el-form-item>
          <el-form-item label="简介" prop="intro">
              <el-input style="width:30%" v-model="formData.intro"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
              <el-input style="width:30%" v-model="formData.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
              <el-input style="width:30%" v-model="formData.mobile" disabled></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="saveUserMessage">保存信息</el-button>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
// 引入公共实例
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      // 定义用户信息数据
      formData: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      defaultImg: require('../../assets/img/collect.png'),
      userRules: {
        name: [{ required: true, message: '用户名不能为空' },
          { min: 1, max: 8, message: '用户名在1-7之间' }],
        intro: [{ required: true, message: '简介不能为空' }],
        email: [{ required: true, message: '邮箱不能为空' },
          {
            pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
            message: '邮箱格式不正确'
          }]
      },
      loading: false
    }
  },
  methods: {
    // 获取用户个人信息
    getUserMessage () {
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        // console.log(res)
        this.formData = res.data
      })
    },
    saveUserMessage () {
      this.$refs.myForm.validate((value) => {
        if (value) {
          // 调接口发请求
          this.$axios({
            //   编辑用户信息的接口
            url: '/user/profile',
            method: 'patch',
            data: this.formData
          }).then(res => {
            // 保存成功
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            // 保存成功，告诉头部组件我更新了信息
            eventBus.$emit('updataUserInfoSuccess')
          })
        }
      })
    },
    uploadImg (params) {
      this.loading = true
      let fd = new FormData()
      fd.append('photo', params.file)
      // 发请求调接口
      //   编辑用户头像
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data: fd
      }).then((res) => {
        this.formData.photo = res.data.photo// 更改头像
        // 上传成功，告诉头部组件我更新了信息
        eventBus.$emit('updataUserInfoSuccess')
        this.loading = false
      })
    }
  },
  created () {
    // 页面创建完成获取信息
    this.getUserMessage()
  }
}
</script>

<style lang='less' scoped>
.head-upload{
    position: absolute;
    right: 300px;
    img{
    width: 200px;
    height: 200px;
    border-radius: 50%;
    }
}
</style>
