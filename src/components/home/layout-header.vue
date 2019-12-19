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
             <!-- 下拉菜单 -->
              <el-dropdown trigger="click">
                <!-- 头像 -->
                <img src="../../assets/img/avatar.jpg" alt="">
                <span style="margin-left:5px;">维纳斯</span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>个人信息</el-dropdown-item>
                  <el-dropdown-item>git地址</el-dropdown-item>
                  <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
         </el-row>
     </el-col>
   </el-row>
</template>

<script>
export default {

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
