<template>
  <div class="cover-image">
      <!-- 根据封面images的长度进行渲染，一个或者三个 -->
      <div class="cover-item" v-for="(item,index) in list" :key="index">
          <img src="../../assets/img/pic_bg.png" alt="">
      </div>
  </div>
</template>

<script>
export default {
  props: ['list']// 在子组件中使用props接收属性
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
