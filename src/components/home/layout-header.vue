<template>
   <el-row type="flex" class="layout-header" justify="space-between" align="middle">
       <!-- 头部左侧 -->
     <el-col :span="6" class="left">
         <i @click="collapseOrOpen" :class="{'el-icon-s-fold':collapse,'el-icon-s-unfold':!collapse}" style="margin-right:5px"></i>
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
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      collapse: false, // 定义是否折叠
      userInfo: {},
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  // 页面创建完成，获取用户个人信息
  created () {
    this.getUserInfo()
    // 页面创建完成，立刻监听账户信息中eventBus触发的自定义事件
    eventBus.$on('updataUserInfoSuccess', () => {
      // 告诉我已经更新，我需要重新获取信息
      this.getUserInfo()
    })
  },
  methods: {
    // 折叠或打开
    collapseOrOpen () {
      this.collapse = !this.collapse
      // 告诉主页我折叠或打开了
      eventBus.$emit('changeCollapse')
    },
    handle (command) {
      // alert(command)
      if (command === 'logout') {
        // 删除令牌
        window.localStorage.removeItem('user-token')
        // 退出到登录页
        this.$router.push('/login')
      }
    },
    // 获取个人信息
    getUserInfo () {
    // axios默认请求方式为get
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        //   console.log(res)
        this.userInfo = res.data// 获取到用户的个人信息
      })
    }
  }
}

</script>

<style lang='less' scoped>
.layout-header{
    height: 60px;
    .left{
        font-size:16px;
        i{
          font-size:25px
        }
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
