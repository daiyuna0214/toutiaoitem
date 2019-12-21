// 引入路由
import router from '../router'
// 全局前置守卫
router.beforeEach(function (to, from, next) {
  // to即将要进入的目标
  // from当前导航正要离开的路由
//   console.log(to)
  if (to.path.startsWith('/home')) {
    let token = localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      // 如果没有令牌，那么直接强制跳转到登录页
      next('/login')
    }
  } else {
    // 如果是登录页直接放行
    next()
  }
})
