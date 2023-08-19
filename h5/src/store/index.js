/*
 * @Author: your name
 * @Date: 2021-08-06 11:45:49
 * @LastEditTime: 2021-08-11 09:32:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dzzhkh-ui\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {
  getUserInfo
} from "@/api/index"
import {
  Toast
} from 'vant';

export default new Vuex.Store({
  strict: true,
  state: {
    userInfo: '',
    //openId:"openid",
    openId: '',
  },
  getters: {
    getUserInfo: state => {
      return state.userInfo;
    },
    getOpenId: state => {
      let data = sessionStorage.getItem("openid");
      // console.log(data)
      if (data != 'undefined' && data) {
        data = JSON.parse(data);
      }
      if (data) {
        return state.openId ? state.openId : data
      } else {
        return state.openId
      }
    }
  },
  mutations: {
    SET_USER_INFO(state, data) {
      state.userInfo = data;
      sessionStorage.setItem("userInfo", JSON.stringify(state.userInfo))
    },
    SET_USER_ID(state, data) {
      state.openId = data;
      sessionStorage.setItem("openid", JSON.stringify(state.openId));
    }
  },
  actions: {
    // 获取用户信息
    GetInfo({
      commit,
      state
    }, data) {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '登录中',
      });
      return new Promise((resolve, reject) => {
        getUserInfo({
          ...data
        }).then(res => {
          if (res.code == 200) {
            commit("SET_USER_INFO", {
              ...res.data
            });
            commit("SET_USER_ID", res.data.openid);
          }
          Toast.clear();
          resolve(res)
        }).catch(error => {
          reject(error)

        })
      })
    },
  },
  modules: {}
})