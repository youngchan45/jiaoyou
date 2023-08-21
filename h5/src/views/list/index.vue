<!--
 * @Author: your name
 * @Date: 2021-08-06 20:11:10
 * @LastEditTime: 2021-08-11 11:47:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dzzhkh-ui\src\views\test\index.vue
-->
<template>
  <div class="container">
    <!-- <navBar :title="title" :showLeft="back"></navBar> -->
    <van-tabs
      v-model="active"
      sticky
      color="e57373"
      background="#f7f8f3"
      @click="onClick"
      animated
    >
      <!-- <van-tab title="1"> -->
      <van-tab
        :title="item.title"
        v-for="(item, index) in tabList"
        :key="index"
      >
        <!-- <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        > -->
        <van-cell v-for="(item, index) in list" :key="index">
          <div class="cell-con">
            <div class="left">
              <img :src="item.img" />
            </div>
            <div class="right">
              <div>{{ item.phone }}</div>
              <div>{{ item.content }}</div>
            </div>
          </div>
        </van-cell>
        <!--  </van-list> --></van-tab
      >
    </van-tabs>
  </div>
</template>

<script>
import { getCrList, getCqList } from "@/api/index.js";
import Tabbar from "@/components/Tabbar.vue";
import NavBar from "@/components/navBar.vue";
import { mapGetters } from "vuex";
export default {
  name: "List",
  data() {
    return {
      title: "纸条",
      back: true,
      list: [
        /* {
          img: require("@/assets/image/boy.jpg"),
          name: "联系方式联系方式",
          msg: "这里是留言这里是留言这里是留言这里是留言这里是留言这里是留言",
        },
        {
          img: require("@/assets/image/boy.jpg"),
          name: "联系方式联系方式",
          msg: "这里是留言这里是留言这里是留言这里是留言这里是留言这里是留言",
        }, */
      ],
      tabList: [
        { title: "我投放的纸条", name: 0 },
        { title: "我抽取的纸条", name: 1 },
      ],
      active: 0,
      loading: false,
      finished: false,
      isZero: true,
    };
  },
  components: { Tabbar, NavBar },
  created() {
    this.getCrList();
    if (this.$route.query.scene) {
      this.path =
        "pages/home/citicbank-mini/index/index?scene=" +
        this.$route.query.scene;
    }

    console.log(123, this.path);
  },
  computed: {
    ...mapGetters({
      userInfo: "getUserInfo",
      openId: "getOpenId",
    }),
  },
  /* methods: {
   onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    }, 
  },*/
  async mounted() {
    this.Toast({
      message: "加载中",
      type: "loading",
      duration: 2 * 1000,
    });
    // console.log(decrypt('CUIlia5EOzGjLRGkaGlGQyJ8BH2pCOTH7radZRQYVzAWsoFxPazKnMr3H9j/eUvrIrI2bd0At0nTnrV0MC0ceg=='))
    // 当前页面路径，不包含#号后面的内容
    let url = location.origin + location.pathname;
    try {
      let res = await getSDKConfig({ url });
      let { appid, timestamp, nonceStr, signature } = res;
      this.$wx.config({
        debug: false, //开启调试模式，调用的所有api的返回值会在客户端alert处理。
        appId: appid, //必填，公众号的唯一标识
        timestamp: timestamp - 0, //必填，生成签名的时间戳 后端给
        nonceStr, //必填，生成签名的随机串 后端给
        signature, //必填，签名 后端给
        jsApiList: [], //必填，需要使用的JS接口列表
        openTagList: ["wx-open-launch-weapp"],
      });
      console.log("before_ready");
      setTimeout(() => {
        this.$wx.ready((res) => {
          console.log("注入成功", res);
          this.isShow = true;
        });
      });
    } catch (error) {}
  },
  methods: {
    getCrList() {
      if (!this.isZero) return;
      let openid = this.openId;
      getCrList({ openid: openid }).then((res) => {
        if (res.code == 200) {
          this.list = res.data;
        }
      });
    },
    getCqList() {
      //console.log(this.isZero);
      if (this.isZero) return;
      let openid = this.openId;
      getCqList({ openid: openid }).then((res) => {
        if (res.code == 200) {
          this.list = res.data;
        }
      });
    },

    onClick(name, title) {
      console.log(name, title);
      this.list=[]
      if (!name) {
        this.isZero = true;
        console.log(this.isZero);
        this.getCrList();
      } else {
        this.isZero = false;
        console.log(this.isZero);
        this.getCqList();
      }
      /* this.list = [];
      this.pageNo = 0;
      this.loading = true;
      this.finished = false;
      this.onLoad(); */
    },
    onLoad() {},
  },
};
</script>

<style lang="scss" scoped>
.van-tab,
.van-cell {
  background: #f7f8f3;

  .cell-con {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {
      img {
        width: 70px;
        height: 70px;
      }
    }

    .right {
      text-align: right;
      padding-left: 10px;
    }
  }
}
</style>
