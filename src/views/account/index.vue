<template>
  <el-card>
      <bread-crumb slot="header">
         <template slot="title">账户信息</template>
      </bread-crumb>
      <el-form style="margin-left:30px" label-width="100px" >
          <el-upload class='head-upload' action="" :show-file-list="false">
              <img :src="formData.photo?formData.photo:defaultImg" alt="">
          </el-upload>
          <el-form-item label="用户名">
              <el-input v-model="formData.name" style="width:30%"></el-input>
          </el-form-item>
          <el-form-item label="简介">
              <el-input style="width:30%" v-model="formData.intro"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
              <el-input style="width:30%" v-model="formData.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
              <el-input style="width:30%" v-model="formData.mobile"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary">保存信息</el-button>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
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
      defaultImg: require('../../assets/img/collect.png')
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
