import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./permission.js"
import Vant from 'vant'
import 'vant/lib/index.css'
import {
  Toast,
  Dialog
} from 'vant';
//import QRCode from "qrcodejs2";
import QRCode from 'qrcode'
import html2canvas from "html2canvas";
Vue.use(Vant)

import 'vant/lib/icon/local.css';
import '@/assets/styles/index.scss' // global css
import wx from "weixin-js-sdk"
Vue.prototype.$wx = wx;
Vue.config.ignoredElements = ['wx-open-launch-weapp']
// 全局方法挂载


Vue.prototype.$goBack = function () {
    if (window.history.length < 2) {
      window.close();
    } else {
      router.back();
      // history.back();
    }
  },

  require("@/utils/rem.js");
Vue.prototype.Dialog = Dialog;
Vue.prototype.Toast = Toast;


/* const VConsole = require('vconsole');
let vConsole = new VConsole(); */


new Vue({
  router,
  store,
  QRCode,
  html2canvas,
  render: h => h(App)
}).$mount('#app')