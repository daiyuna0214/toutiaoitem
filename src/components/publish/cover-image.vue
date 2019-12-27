<template>
  <div class="cover-image">
      <!-- 根据封面images的长度进行渲染，一个或者三个 -->
      <div class="cover-item" v-for="(item,index) in list" :key="index"
       @click="openDialog(index)">
        <!-- 点击时传一个下标，代表点击哪个图片 -->
          <img :src="item?item:defaultImg" alt="">
      </div>
      <el-dialog :visible="dialogVisible" @close="closeDialog">
        <!-- 使用选择图片的子组件 -->
        <!-- 在点击弹层选择图片时，父组件需要将选择的图片的下标传递给子组件
        可通过在子组件中触发$emit事件,然后在父组件中监视此事件 进行追踪 -->
        <!-- 监听谁的事件就在谁的标签上面写监听 -->
        <select-image @selectOneImg="receiveImg"></select-image>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'], // 在子组件中使用props接收属性
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false, // 弹层默认关闭
      selectIndex: -1// 默认选中的图片的下标
    }
  },
  methods: {
    openDialog (index) {
      // 点击后打开弹层
      this.dialogVisible = true
      // 记住选中的图片的下标
      this.selectIndex = index
    },
    closeDialog () {
      // 关闭弹层
      this.dialogVisible = false
    },
    // 接收select-image子组件传来的数据
    receiveImg (imgUrl) {
      // alert(imgUrl)
      // 接收完数据发现list是通过props从父组件传递过来的，只能读取不能修改
      // 所以需要再次传递
      // 事件名可以一样
      // 此时也需要把点击哪个图片的下标传递过去
      this.$emit('selectOneImg', imgUrl, this.selectIndex)
      // 修改图片地址完成关闭弹窗
      this.closeDialog()
    }
  }
}
</script>

<style lang='less' scoped>
  .cover-image {
    display: flex;
    margin:20px 0;
    margin-left: 100px;
     .cover-item {
       border: 1px solid #ccc;
       width: 250px;
       height: 250px;
       padding: 10px;
       img {
         height: 100%;
         width:100%;
       }
     }
  }
</style>
