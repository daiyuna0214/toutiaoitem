import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'
import Home2 from '../views/home/home'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/login'
}, {
  path: '/login',
  component: Login
},
{
  path: '/home',
  component: Home,
  children: [{
    path: '', // 二级路由path什么都不写，作为默认显示
    component: Home2
  }, {
    path: '/home/comment', // 评论列表做按需加载
    component: () => import('../views/comment')
  }, {
    path: '/home/material', //
    component: () => import('../views/material')
  }, {
    path: '/home/articles',
    component: () => import('../views/articles')
  }, {
    path: '/home/publish', // 此条规则只匹配发布文章
    component: () => import('../views/publish')
  }, {
    path: '/home/publish/:articleId', // 定义动态路由参数，此条规则只匹配修文章
    component: () => import('../views/publish')
  }, {
    path: '/home/account', // 账户信息
    component: () => import('../views/account')
  }]
}
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
