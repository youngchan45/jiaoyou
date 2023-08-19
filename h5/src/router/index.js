/*
 * @Author: your name
 * @Date: 2021-08-06 11:45:49
 * @LastEditTime: 2021-08-07 23:30:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dzzhkh-ui\src\router\index.js
 */
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const originalPush=VueRouter.prototype.push;
VueRouter.prototype.push=function push(location){
  return originalPush.call(this,location).catch(err=>err);
}
const routes = [
  { path: '/', redirect: '/index' },
  {
    path: "/index",
    name: "Home",
    meta: { title: "首页", showLeft: false ,type:"index"},
    component: (resolve) => require(['@/views/home/index'], resolve),
  },
  {
    path: "/my",
    name: "My",
    meta: { title: "我的", showLeft: false ,type:"my"},
    component: (resolve) => require(['@/views/my/index'], resolve),
  },
  {
    path: "/list",
    name: "List",
    meta: { title: "纸条", showLeft: true ,type:"list"},
    component: (resolve) => require(['@/views/list/index'], resolve),
  },
];

const router = new VueRouter({
  mode: "history",
  //mode:"hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
