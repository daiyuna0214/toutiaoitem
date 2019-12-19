<template>
   <el-row type="flex" class="layout-header" justify="space-between" align="middle">
       <!-- 头部左侧 -->
     <el-col :span="6" class="left">
         <i class="el-icon-s-fold" style="margin-right:5px"></i>
         <span>江苏传智播客教育科技股份有限公司</span>
     </el-col>
     <!-- 头部右侧 -->
     <el-col :span="4" class="right">
         <!-- justify="end"向结尾对齐 -->
         <el-row type="flex" justify="end" align="middle">
                <!-- 头像 -->
                <img :src="userInfo.photo ? userInfo.photo : defaultImg" alt="">
             <!-- 下拉菜单 -->
             <el-dropdown>
                  <el-dropdown @command="handle">
                  <span style="margin-left:5px;">{{userInfo.name}}</span>
                  <el-dropdown-menu slot="dropdown">
                       <el-dropdown-item command='info'>个人信息</el-dropdown-item>
                       <el-dropdown-item command='git'>git地址</el-dropdown-item>
                       <el-dropdown-item command='logout'>退出</el-dropdown-item>
                  </el-dropdown-menu>
              </el-dropdown>
             </el-dropdown>
         </el-row>
     </el-col>
   </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  // 页面创建完成，获取用户个人信息
  created () {
    // 获取令牌
    let token = localStorage.getItem('user-token')
    this.$axios({
      url: '/user/profile',
      method: 'get',
      headers: {// headers参数
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
    //   console.log(res)
      this.userInfo = res.data.data// 获取到用户的个人信息
    })
  },
  methods: {
    handle (command) {
      alert(command)
      if (command === 'logout') {
        // 删除令牌
        window.localStorage.removeItem('user-token')
        // 退出到登录页
        this.$router.push('/login')
      }
    }
  }
}

</script>

<style lang='less' scoped>
.layout-header{
    height: 60px;
    .left{
        font-size:16px
    }
    .right{
        img{
            width: 40px;
            height: 40px;
            border-radius: 50%
        }
    }
}
</style>
