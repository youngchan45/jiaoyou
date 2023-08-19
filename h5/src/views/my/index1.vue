<template>
  <div>
    <div class="container_box"><img class="close_img" :src=canvasimg alt="" @click="hideShare()">
      <div class="share_box" style="background:#C41D1D;">
        <div style="background:#C41D1D;height:10rem;overflow:auto;">
          <div id="shareImg">
            <div class="offer_msg">
              <div class="left"><img :src=qodePicture alt="">
              </div><img class="right_img" :src=canvasimg alt="">
            </div>
          </div>
        </div><!-- 生成得海报图片 --><img :src="img" alt="" class="fixed-img">
      </div>
    </div>

  </div>
</template>
   
<script>
import QRCode from 'qrcode'
export default {
  data() {
    return {
      qodePicture: require("@/assets/image/二维码.png"),
      canvasimg: require("@/assets/image/bg.jpg"),
    }
  },
  mounted() {

  },
  methods: {
    drawImage() {
      this.$Loading("加载中");
      var that = this; var node = document.getElementById("shareImg"); console.log(node);
      console.log($("#shareImg")); html2canvas(node, { allowTaint: true, useCORS: true, logging: true, taintTest: false, scale: 6, width: $("#shareImg")[0].clientWidth, height: $("#shareImg")[0].clientHeight, }).then(function (canvas) {
        $(".fixed-img").css("display", "block");
        that.img = canvas.toDataURL("image/png");
        that.$Loading().clear(); that.$NotifySuccess("图片已生成，长按可保存到相册")
      }).catch(function (error) { console.log(error) });
    },
    fncreatQode() {//h5生成二维码
      let that = this
      // 这个weburl是扫码后需要跳转的地址
      var weburl = 'https://xxvfd.com?id=1'
      QRCode.toDataURL(weburl, {
        version: 7,
        errorCorrectionLevel: 'Q',
        width: 150,//二维码尺寸大小
        height: 150//二维码尺寸大小
      })
        .then((url) => {
          // url为base64的图片
          that.qodePicture = url
          // 开始绘制海报
          that.fncreatCanvas()

        })
        .catch((err) => {
          console.error(err)
        })
    },
    async fncreatCanvas() {
      const that = this
      var width = 410 * 2, radius = 10 * 2, height = 900 * 2
      var canvas = document.getElementById("postcanvas");
      var qodectx = canvas.getContext("2d");
      // canvas的样式尺寸还是原尺寸,这里的canvas尺寸设置为原来的2倍,防止生成的图片不清晰,另外设置宽高可以清空画布
      canvas.width = width
      canvas.height = height
      // 绘制带圆角的矩形,海报背景图为带圆角的矩形
      qodectx.beginPath();
      qodectx.arc(width - radius, height - radius, radius, 0, Math.PI / 2);
      qodectx.lineTo(radius, height);
      qodectx.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);
      qodectx.lineTo(0, radius);
      qodectx.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2);
      qodectx.lineTo(width - radius, 0);
      qodectx.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2);
      qodectx.clip()
      qodectx.closePath()
      // 绘制海报图
      /* await that.creatImage(that.qodePicture).then((img) => {//由于海报做底图，头像文字都在海报上面，用异步
          qodectx.drawImage(img, 0, 0,width,height)
          qodectx.font = "Bold 48px Arial";
          qodectx.textAlign = "center"
          qodectx.fillStyle = "#fff";
          qodectx.fillText('恭喜发财', 180*2, 70*2);
      }); */
      // 绘制二维码
      await that.creatImage(that.qodePicture).then((img) => {
        qodectx.drawImage(img, 10 * 2, 5 * 2, 100 * 2, 100 * 2)
      });
      // 绘制头像
      await that.creatImage('../../headimg.png').then((imgs) => {
        that.drawCircleImage(qodectx, imgs, 30 * 2, 30 * 2, 50 * 2);
      })
      // 将canvas换成base64图片展示
      that.canvasimg = canvas.toDataURL();

    },
    creatImage(src) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        // 设置图片跨域,不然如果有跨域,手机显示不出来
        img.setAttribute('crossOrigin', 'anonymous');
        img.onload = () => {
          resolve(img);
        };
        img.onerror = () => {
          reject();
        };
        img.src = src;
        if (img.complete) {
          resolve(img);
        }
      });
    },
    drawCircleImage(ctx, img, x, y, r) {
      ctx.beginPath();
      let d = r * 2;
      let cx = x + r
      let cy = y + r;
      ctx.arc(cx, cy, r, 0, 2 * Math.PI);
      // 默认边框是黑色,设置为透明的
      ctx.strokeStyle = 'transparent';
      ctx.stroke();
      ctx.clip();
      ctx.closePath()
      ctx.drawImage(img, x, y, d, d);
    },

  }

}
</script>
<style lang="scss" scoped>
.postimg {
  width: 100%;
  height: auto;
  position: relative;

  img {
    width: 100%;

  }
}

canvas {
  position: absolute;
  top: 428px;
  left: 3px;
}

.container_box {
  width: 100%;

  img {
    width: 100%;

  }
}
</style>