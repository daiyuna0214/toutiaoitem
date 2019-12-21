// 对axios进行封装
// 引入axios
import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发起请求前做一些事情 请求成功
//   config是要发送请求的配置信息，是axios的默认选项
// 获取令牌
  let token = window.localStorage.getItem('user-token')// 获取令牌
  config.headers.Authorization = `Bearer ${token}`// 设置统一的令牌
  return config
}, function () {
  // 请求失败
})
// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 响应拦截，把所有返回的数据进行解构
//   console.log(response.data)
// 响应成功返回response.data
  return response.data ? response.data : {}// 使用三元表达式是为了解决data不存在时token报错的问题
}, function (error) {
  // 响应失败
//   console.log(error)
  let status = error.response.status// 获取失败的状态码
  let message = ''// 提示信息
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      // refresh_token未携带或已过期强制跳转到登录页
      router.push('/login')
      break
    case 507:
      message = '数据库服务器异常'
      break
    case 401:
      // token过期强制跳转到登录页
      router.push('/login')
      break
    case 404:
      message = '手机号不正确'
      break
    default:
      break
  };
  Message({ type: 'warning', message })
})
export default axios
