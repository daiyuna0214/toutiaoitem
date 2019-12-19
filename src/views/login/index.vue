<template>
  <div class="login">
      <el-card class="login-card">
          <!-- 在form表单中使用model属性绑定表单数据对象，rules属性绑定表单验证规则,通过ref绑定表单来获取表单控件-->
          <el-form :model='loginForm' :rules='loginRules' ref="myForm">
              <el-form-item class="logo">
                  <img src="../../assets/img/logo_index.png" alt="">
              </el-form-item>
              <!-- 每一个el-form-item使用prop属性绑定data里面的表单组件的字段名 -->
              <el-form-item prop="mobile">
                  <!-- 使用v-model双向绑定表单数据对象里面的每一项 -->
                  <el-input v-model="loginForm.mobile" placeholder='请输入手机号'></el-input>
              </el-form-item>
              <el-form-item prop="code">
                  <el-input v-model="loginForm.code" placeholder='请输入验证码' style="width:65%;"></el-input>
                  <el-button style="float:right"  plain>发送验证码</el-button>
              </el-form-item>
              <el-form-item prop="agree">
                  <el-checkbox v-model="loginForm.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" style="width:100%" @click="submitForm">登录</el-button>
              </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      // 定义一个表单数据对象
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        agree: false// 是否同意协议
      },
      // 定义一个数据验证规则
      loginRules: {
        //  required:true表示必填，message表示当不满足条件时提示的信息
        // pattern：正则表达式
        mobile: [{ required: true, message: '请输入手机号' }, { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号格式' }],
        code: [{ required: true, message: '请输入验证码' }, {
          pattern: /^\d{6}$/, message: '请输入正确的验证码'
        }],
        // required只能验证null，undefined和空字符串，不能校验true和false
        agree: [{ validator: function (rule, value, callback) {
          // rule是当前规则
        //   value是我们要校验的字段的值
        // callback回调函数
          if (value) {
            callback()// 如果认证通过，则直接执行callback
          } else {
            callback(new Error('你必须无条件同意'))
            // 如果认证不通过，也执行callback，回调函数内部提示错误信息
          }
        } }]
      }
    }
  },
  methods: {
    // 自定义表单验证，当点击登录时进行验证
    submitForm () {
      // 获取表单控件--通过$refs
      this.$refs.myForm.validate(function (value) {
        if (value) {
          // alert('验证通过')
          // 调用接口
        } else {
          alert('请输入正确的信息')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login{
    background-image: url('../../assets/img/login_bg.jpg');
    background-size: cover;
    height: 100vh;
    display: flex;
    justify-content:center;
    align-items: center;
    .login-card{
        width: 440px;
        height: 350px;
        .logo{
            text-align: center;
            img{
                height: 40px;
            }
        }
   }
}
</style>
