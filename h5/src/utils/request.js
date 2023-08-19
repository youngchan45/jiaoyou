/*
 * @Author: your name
 * @Date: 2021-08-06 11:45:49
 * @LastEditTime: 2021-08-11 10:53:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dzzhkh-ui\src\utils\request.js
 */
import axios from 'axios';
import { Dialog, Toast } from "vant";
// import store from '@/store'
import { getToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode.js'
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时
  timeout: 1000 * 30
})
// request拦截器
service.interceptors.request.use(config => {
  // console.log(config,111)
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  if (getToken() && !isToken) {
    //  config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  //  console.log(config)
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
  // 未设置状态码则默认成功状态
  // console.log(res,2222)
  const code = res.data.code || 200;

  // 获取错误信息
  const message = errorCode[code] || res.data.msg || errorCode['default']
  // const message = res.data.msg;
  // console.log(message)
  if (code == 401) {
    // Dialog.confirm(

    //   {
    //     title: '系统提示',
    //     message: '登录状态已过期重新登录',
    //     type: 'warning'
    //   }
    // ).then(() => {
    //   /* store.dispatch('LogOut').then(() => {
    //     location.reload() // 为了重新实例化vue-router对象 避免bug
    //   }) */
    // })
    Dialog({
      message: message,
      type: 'error'
    })
    console.log(new Error(message))
    return Promise.reject(res.data)
  } else if (code == 500) {
    Toast({
      message: message,
      type: 'error',
      duration: 3 * 1000,
    })
    console.log(new Error(message))
    return Promise.reject(res.data)
  } else if (code == -1) {
    Toast({
      message: message,
      type: 'error',
      duration: 3 * 1000,
    })
    console.log(new Error(message))
    return Promise.reject(res.data)
  }
  else if (code == -2) {
    Toast({
      message: message,
      type: 'error',
      duration: 3 * 1000,
    })
    console.log(new Error(message))
    return Promise.reject(res.data)
  }else if (code != 200) {
    Toast.fail({
      message: message,
      icon: "none"
    })
    return Promise.reject(res.data)
  } else {
    return res.data
  }
},
  error => {
    console.log('err' + error)
    Toast({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service