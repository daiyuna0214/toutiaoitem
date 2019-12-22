<template>
  <el-card>
      <bread-crumb slot="header"  @tab-click="handleClick">
      <template slot="title">素材管理</template>
      </bread-crumb>
      <el-tabs v-model="activeName">
      <el-tab-pane label="全部素材" name="all">
          <div class="img-list">
              <el-card v-for="item in list" :key='item.id' class="img-card">
                  <img :src="item.url" alt="">
                  <el-row class="icon" type="flex" justify="space-around" align="middle">
                      <i class="el-icon-star-on"></i>
                      <i class="el-icon-delete-solid"></i>
                  </el-row>
              </el-card>
          </div>
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">
           <div class="img-list">
             <el-card v-for="item in list" :key='item.id' class="img-card">
                  <img :src="item.url" alt="">
              </el-card>
          </div>
      </el-tab-pane>
      </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认选中全部素材
      list: []// 定义一个空数组，用来接收传出来的所有数据
    }
  },
  methods: {
    getAllMaterial () {
      // 调用接口，获取数据
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect' }
      }).then((res) => {
        // console.log(res)
        this.list = res.data.results
      })
    },
    handleClick () {
      // tab切换时，重新渲染页面
      this.getAllMaterial()
    }
  },
  created () {
    this.getAllMaterial()
  }
}
</script>

<style lang='less' scoped>
.img-list{
    display: flex;
    flex-wrap: wrap;
    .img-card{
        width: 200px;
        height: 240px;
        margin: 20px 50px;
        position: relative;
        img{
            width:100%;
            height: 100%;
        }
        .icon{
            width: 100%;
            height: 30px;
            font-size: 20px;
            position: absolute;
            bottom: 0;
            left: 0;
            background-color: #f4f5f6;
        }
    }
}
</style>
