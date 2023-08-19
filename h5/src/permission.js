import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/css/nprogress.css'
import { Toast } from "vant";
import { redirectUri } from '@/utils/auth'
NProgress.configure({ showSpinner: false })

/*****************************************
|  浏览器缓存只存userId，vuex存储userInfo，|
|  以userInfo是否为空来请求最新的用户信息。 |
|  代码仅供参考, 根据实际需求构建。         |
******************************************/

router.beforeEach((to, from, next) => {
  NProgress.start()
  Toast.clear()
  /* next();
  return */
  //企业微信进入首页
  if (to.meta.type == "home" && location.hash == "#/") {
    window.location.href = location.origin + location.pathname + location.hash + location.search;
    next();
    return
  }

  // 第一次进入企业微信，非工作台进入，重构url。
  /* let search = window.location.search;
  if (search.indexOf('?code=') !== -1 && !to.query.code) {
    // 重定向回来的链接==// http://localhost:1015/cdyxhd-ui/h5/?code=1234#/groupDetail?id=37
    // window.location.href = location.origin + location.pathname + location.hash + '&' + location.search.split('?')[1];
    if (location.hash.indexOf('?') != -1) {
      window.location.href = location.origin + location.pathname + location.hash + '&' + location.search.split('?')[1];
    } else {
      window.location.href = location.origin + location.pathname + location.hash + '?' + location.search.split('?')[1];
    }
    next()
    return
  } */

  if (to.meta.title) {
    document.title = to.meta.title
  }

  /* 没有用户信息或时间过期 */
  // if (!store.getters.getUserInfo || store.getters.getUserInfo == "undefined" || time > outTime) {
  /* 没有用户信息 */

  let openId = '';
  openId = (!store.getters.getOpenId || store.getters.getOpenId == "undefind") ? openId : store.getters.getOpenId;
  if (!openId) {
    let code = '';
    let state = '';
    // if (to.query.code&to.query.state) {
      code = to.query.code;
      state = to.query.state;
    // }

    /* if (!code) {
      let href = redirectUri(location.href)
      window.location.href = href;
      next();
      return
    } */

    //获取用户信息
    store.dispatch('GetInfo',
      {
        code: code,
        state: state,
      })
      .then(res => {
        Toast.clear()
        if (res.code == 200) {
          //url带userId参数的不缓存用户信息，避免userId不是该用户的.
          sessionStorage.setItem("openId", JSON.stringify(res.openId))
        }
        next();
      })
      .catch(err => {
        console.log(err)
        /* Toast({
          message: res.msg,
          type: "error",
          duration: 3 * 1000,
        }); */
        next();
        return
      })


  } else {
    next();
  }

  NProgress.done()
  return;
})

router.afterEach(() => {
  NProgress.done()
})
