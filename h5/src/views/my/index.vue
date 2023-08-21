<!--
 * @Author: your name
 * @Date: 2021-08-06 20:11:10
 * @LastEditTime: 2021-08-11 11:47:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dzzhkh-ui\src\views\test\index.vue
-->
<template>
  <div>
    <!-- <navBar :title="title" :left-arrow="back"></navBar> -->
    <tabbar />
    <div class="container">
      <div class="mine">
        <div><img :src="userInfo.headimgurl" /></div>
        <div class="name">{{ userInfo.nackname }}</div>
        <!-- vip1 开了分店，vip 0 还没开分店 -->
        <div class="type">{{ Number(userInfo.vip) ? "vip" : "普通用户" }}</div>
      </div>
      <div class="menu">
        <div @click="openShop">
          <van-icon size="26" color="#e57373" name="send-gift-o" /><span
            >我要开分店</span
          >
        </div>
        <div @click="goTo">
          <van-icon size="26" color="#e57373" name="balance-o" /><span
            >我的纸条</span
          >
        </div>
      </div>
      <!-- <img :src="posterHtmlBg"/> -->
      <!-- 二维码 -->
      <canvas v-show="false" id="canvas" />
      <!-- 海报 -->
      <van-overlay :show="show" @click="show = false" class="bg">
        <div class="bg1" ref="content">
          <!-- <img class="bg1" :src="posterHtmlBg" /> -->
          <img class="bg2" :src="qrcodeUrl" />
        </div>
        <van-button class="btn" @click="getPrintScreen"
          >点击截图后，长按保存</van-button
        >
        <!-- <canvas id="myCanvas" @click="downLoadImage('myCanvas', 'my')" /> -->
      </van-overlay>
      <van-overlay :show="show1" @click="show1 = false">
        <img :src="imgUrl" alt="" class="shot" />
      </van-overlay>
      <!--  <div class="btns">
      <wx-open-launch-weapp :path="path" username="gh_593f11e49bdb">
        <script type="text/wxtag-template">
          <button type="button" style="background: rgb(232, 52, 57);color: rgb(255, 255, 255);border: none;width: 100%;height: 6vh;font-size: 16px;">打开小程序</button>
        </script>
      </wx-open-launch-weapp>
    </div> -->
      <!-- <div class="btn">
      <wx-open-launch-weapp :path="'/'+path" username="gh_593f11e49bdb">
        <script type="text/wxtag-template">
          <button class="btn" type="button" style="background: #d7000f;color:#fff;">打开小程序1</button>
        </script>
      </wx-open-launch-weapp>
    </div> -->
    </div>
    <!-- <van-overlay :show="show" @click="show = false">
      <div class="wrapper">
        <img @click.stop class="block" :src="QR" alt="" />
      </div>
    </van-overlay> -->
  </div>
</template>

<script>
import { getSDKConfig, prePay } from "@/api/index.js";
import { mapGetters } from "vuex";
import Tabbar from "@/components/Tabbar.vue";
import NavBar from "@/components/navBar.vue";
import QRCode from "qrcode";
import html2canvas from "html2canvas";
export default {
  name: "My",
  data() {
    return {
      path: "",
      isShow: false,
      title: "我的",
      back: false,
      userInfo: {
        headimgurl: "" /* require("@/assets/image/boy.jpg") */,
        nackname: "哈哈哈哈",
        vip: "1",
      },
      QR: require("@/assets/image/二维码.png"),
      show: false,
      show1: false,
      posterHtmlBg: require("@/assets/image/bg.jpg"), // 背景图
      // 二维码的dataUrl
      qrcodeUrl: require("@/assets/image/二维码.png"),
      // 生成二维码的url
      creatCodeUrl: "xxxxxxxxxxxxxxxxxxxx",
      imgUrl: null, //截图地址
    };
  },
  components: { Tabbar, NavBar },
  created() {
    /* if (this.$route.query.scene) {
      this.path =
        "pages/home/citicbank-mini/index/index?scene=" +
        this.$route.query.scene;
    }

    console.log(123, this.path); */
  },
  computed: {
    ...mapGetters({
      userInfo: "getUserInfo",
      openId: "getOpenId",
    }),
  },
  async mounted() {
    console.log(1111111, this.openId);
    console.log(JSON.parse(sessionStorage.getItem("userInfo")));
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    /* this.Toast({
      message: "加载中",
      type: "loading",
      duration: 2 * 1000,
    }); */
    // console.log(decrypt('CUIlia5EOzGjLRGkaGlGQyJ8BH2pCOTH7radZRQYVzAWsoFxPazKnMr3H9j/eUvrIrI2bd0At0nTnrV0MC0ceg=='))
    // 当前页面路径，不包含#号后面的内容
    /*  let url = location.origin + location.pathname;
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
     } catch (error) { } */
  },
  methods: {
    goTo() {
      this.$router.push("/list");
    },
    openShop() {
      this.$dialog
        .confirm({
          title: "提示",
          message:
            "此次开分店需支付2元，扫描分店二维码进行消费，会按照78%消费金额报答分店，二维码可往校园墙、QQ群，微信群，操场摆摊等等进行推广，若有学校为添加请联系客服进行添加。（注意:自己扫描自己二维码消费没有78%的报答奖励）",
          confirmButtonText: "确认，支付开店",
          confirmButtonColor: "#e57373",
        })
        .then(() => {
          // on confirmy
          //this.showQR()
          this.submit();
        })
        .catch(() => {
          // on cancel
        });
    },
    submit() {
      let form = {
        type: 4,
        openid: this.openId,
      };
      prePay(form).then((res) => {});
    },
    showQR() {
      this.show = true;
    },
    async goTo1() {
      await this.createQrcode(this.creatCodeUrl);
      await this.drawAndShareImage(this.posterHtmlBg, this.qrcodeUrl, "");
    },
    //获取截图方法
    getPrintScreen() {
      // 第一个参数是需要生成截图的元素,第二个是自己需要配置的参数,宽高等
      html2canvas(this.$refs.content, {
        //width: 100, //截图宽度
        //height: 500, //截图高度
        //scale: 7,
        //dpi:700,
        backgroundColor: null, //画出来的图片有白色的边框,不要可设置背景为透明色（null）
        useCORS: true, //支持图片跨域
        scale: 1, //设置放大的倍数
      }).then((canvas) => {
        // 把生成的base64位图片上传到服务器,生成在线图片地址
        let url = canvas.toDataURL("image/png"); // toDataURL: 图片格式转成 base64
        this.imgUrl = url;
        this.show1 = true;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 10px;

  .mine {
    display: flex;
    align-items: center;
    background: #f7f8f3;
    //background: rgba(247, 248, 243,0.5);
    padding: 20px;
    border-radius: 8px;

    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }

    .name {
      font-size: 16px;
      font-weight: 600;
      margin: 0 10px;
    }

    .type {
      padding: 4px;
      font-size: 12px;
      background: #e57373;
      color: #eee;
      width: 60px;
      height: 14px;
      line-height: 14px;
      text-align: center;
      border-radius: 16px;
    }
  }

  .menu {
    display: flex;
    justify-content: space-between;
    font-weight: 600;

    div {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      margin-top: 20px;
      font-size: 16px;
      width: 47%;
      height: 60px;
      line-height: 60px;
      text-align: center;
      background: #f7f8f3;
      border-radius: 8px;
    }
  }
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 70%;
  height: auto;
  //background-color: #fff;
}

.bg {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  .bg1 {
    /*以下两种路径方式都可以*/
    /*background-image: url('../../../../assets/images/logo.png');*/
    background-image: url("~@/assets/image/bg.jpg");
    background-size: 100% 100%;
    max-width: 100%;
    width: 100%;
    height: 625px;
    position: absolute;
    top: 50;
    left: 0;
    /* background-size: contain;
    background-repeat:no-repeat;
    width: 100%;
    height: 70%;
    position: relative; */
  }

  .bg2 {
    position: absolute;
    /* top: 76%;
    left: 3%;
    width: 76px;
    height: 76px; */
    top: 79%;
    left: 3%;
    height: 82px;
    width: 82px;
  }
}

.btn {
  position: fixed;
  bottom: 0;
  left: 0;
}

.shot {
  width: 100%;
}
</style>
