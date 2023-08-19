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
        <div><img :src="touxiang" /></div>
        <div class="name">{{ yonghum }}</div>
        <div class="type">{{ vip ? "普通用户" : "vip" }}</div>
      </div>
      <div class="menu">
        <div @click="openShop">
          <van-icon size="26" color="#e57373" name="send-gift-o" /><span>我要开分店</span>
        </div>
        <div @click="goTo">
          <van-icon size="26" color="#e57373" name="balance-o" /><span>我的纸条</span>
        </div>
      </div>
      <img :src="posterHtmlBg"/>
      <!-- 二维码 -->
      <canvas v-show="false" id="canvas" />
      <!-- 海报 -->
      <van-overlay :show="show" @click="saveToImg" class="bg">
      
          <canvas id="myCanvas" @click="downLoadImage('myCanvas', 'my')" />
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
import { getSDKConfig } from "@/api/index.js";
import Tabbar from "@/components/Tabbar.vue";
import NavBar from "@/components/navBar.vue";
import QRCode from 'qrcode'
import html2canvas from 'html2canvas'
export default {
  name: "My",
  data() {
    return {
      path: "",
      isShow: false,
      title: "我的",
      back: false,
      touxiang: require("@/assets/image/boy.jpg"),
      yonghum: "哈哈哈哈",
      vip: "1",
      QR: require("@/assets/image/二维码.png"),
      show: false,
      posterHtmlBg: require("@/assets/image/bg.jpg"), // 背景图
      // 二维码的dataUrl
      qrcodeUrl: require("@/assets/image/二维码.png"),
      // 生成二维码的url
      creatCodeUrl: 'xxxxxxxxxxxxxxxxxxxx',
    };
  },
  components: { Tabbar, NavBar },
  created() {
    if (this.$route.query.scene) {
      this.path =
        "pages/home/citicbank-mini/index/index?scene=" +
        this.$route.query.scene;
    }

    console.log(123, this.path);
  },
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
    } catch (error) { }
  },
  methods: {
    goTo() {
      this.$router.push("/list");
    },
    openShop() {
      this.$dialog.confirm({
        title: "提示",
        message: "此次开分店需支付2元，扫描分店二维码进行消费，会按照78%消费金额报答分店，二维码可往校园墙、QQ群，微信群，操场摆摊等等进行推广，若有学校为添加请联系客服进行添加。（注意:自己扫描自己二维码消费没有78%的报答奖励）",
        confirmButtonText: "确认，支付开店",
        confirmButtonColor: "#e57373"
      })
        .then(() => {
          // on confirmy
          this.goTo1()
        })
        .catch(() => {
          // on cancel
        });
    },
    showQR() {
      this.show = true;
    },
    async goTo1() {
      await this.createQrcode(this.creatCodeUrl);
      await this.drawAndShareImage(this.posterHtmlBg, this.qrcodeUrl, '');
    },
    saveToImg() {
      //点击保存按钮的回调事件
      const HTMLElement = document.getElementById('myCanvas'); // 需要导出的页面
      html2canvas(HTMLElement, {
        imageTimeout: 15000, //newline
        scale:3, //newline
        allowTaint: true,
        useCORS: true,
      }).then((canvas) => {
        // imgUrl 是图片的 base64格式 代码 png 格式
        const imgUrl = canvas.toDataURL('image/png');
        //下载图片的功能。
        this.downloadIamge(imgUrl, "plantCardImg.png")
        
      });
    },

    downloadIamge(imgsrc, name) {  //下载图片地址和图片名
      const image = new Image();
      // 解决跨域 Canvas 污染问题
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = function () {
        let canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        const url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
        const a = document.createElement("a"); // 生成一个a元素
        const event = new MouseEvent("click"); // 创建一个单击事件
        a.download = name || "photo"; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
      };
      image.src = imgsrc;
      this.show = false
    },
    createQrcode(text) {
      // 生成二维码
      const canvas = document.getElementById('canvas');
      QRCode.toCanvas(canvas, text, {
        margin: 0,
      });
      let data = canvas.toDataURL('image/png', 1);
      this.qrcodeUrl = data;
    },
    //img1背景图、img2二维码
    drawAndShareImage(img1, img2) {
      let that = this
      let canvas = document.getElementById('myCanvas');
      canvas.width = 380;
      canvas.height = 720;
      let context = canvas.getContext('2d');
      var ratio = window.devicePixelRatio || 1
      /* context.rect(0, 0, canvas.width, canvas.height);
      context.fillStyle = '#fff';
      context.fill(); */
      let myImage = new Image();
      myImage.src = img1;
      myImage.crossOrigin = 'Anonymous';
      myImage.onload = async function () {
        context.drawImage(myImage, 0, 0, 380, 650);
        let myImage2 = new Image();
        myImage2.src = img2;
        myImage2.crossOrigin = 'Anonymous';
        myImage2.onload = function () {
          context.drawImage(myImage2, 12, 516, 82, 82);
          let base64 = canvas.toDataURL('image/png', 1);
          let img = document.getElementById('myCanvas');
          img.setAttribute('src', base64);
         /*  var a = document.createElement("a");
          a.href = base64;
          a.download = "我的分店二维码.png";
          a.click(); */
        };
        await that.showQR()
      };
    },
    // canvas 为canvas的dom节点
    // name 为生成图片的名字
    downLoadImage(img, name) {
      var a = document.createElement("a");
      a.href = img.src;
      console.log(111, img)
      return
      a.download = name;
      a.click();
    }
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
}
</style>
