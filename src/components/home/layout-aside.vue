<template>
  <div class="layout-aside" style="height:100%">
      <div class="title">
          <img :src="collapse ? smallImg : bigImg" alt="">
      </div>
      <!-- elementUI中使用router开启路由模式 -->
      <el-menu router :collapse="collapse" :style="{width:collapse?'60px':'202px'}" background-color="#353b4e" text-color="#adafb5" active-text-color="#ffd04b">
         <!-- index作为path跳转地址，相当于之前router-link里面的to属性 -->
         <el-menu-item index='/home'>
            <template>
               <i class="el-icon-s-home"></i>
               <span slot="title">首页</span>
            </template>
         </el-menu-item>
          <el-submenu index='1'>
            <template slot="title">
               <i class="el-icon-notebook-1"></i>
               <span>内容管理</span>
            </template>
          <el-menu-item index='/home/publish'>发布文章</el-menu-item>
          <el-menu-item index='/home/articles'>内容列表</el-menu-item>
          <el-menu-item index='/home/comment'>评论列表</el-menu-item>
          <el-menu-item index='/home/material'>素材管理</el-menu-item>
      </el-submenu>
          <el-submenu index='2'>
            <template slot="title">
               <i class="el-icon-paperclip"></i>
               <span>粉丝管理</span>
            </template>
          <el-menu-item index='/home/picture'>图文数据</el-menu-item>
          <el-menu-item index='/home/fansinfo'>粉丝画像</el-menu-item>
          <el-menu-item index='/home/fanslife'>粉丝概况</el-menu-item>
          <el-menu-item index='/home/fanslist'>粉丝列表</el-menu-item>
      </el-submenu>
         <el-menu-item index='/home/account'>
           <template>
             <i class="el-icon-user-solid"></i>
             <span slot="title">账户信息</span>
           </template>
         </el-menu-item>
      </el-menu>
  </div>
</template>

<script>
export default {
  // 接收主页传递过来的collapse
  props: ['collapse'],
  data () {
    return {
      bigImg: require('../../assets/img/logo_admin.png'),
      smallImg: require('../../assets/img/toutiao.png')
    }
  }
}
</script>

<style lang='less' scoped>
.layout-aside{
    background-color: #353b4e;
    overflow: hidden;
    .el-menu{
      border-right:  none;
    }
    .title{
        background-color:  #2e2f32;
        text-align: center;
        padding: 10px 0;
        img{
          height: 35px;
        }
    }
}

</style>
