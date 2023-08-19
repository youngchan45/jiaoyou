<template>
  <!--  <div class="container">
    <van-form ref="form">
      <van-field
        input-align="right"
        v-model="form.CSTNAME"
        label="客户名称"
        placeholder="请输入客户名称"
      />
      <van-field
        input-align="right"
        clickable
        readonly
        label="证件类型"
        :value="form.CTFTYPE"
        placeholder="请选择证件类型"
        @click="sendPopup('CTFTYPEColumns', '证件类型', 'CTFTYPE')"
      />
      <van-field
        clear
        input-align="right"
        v-model="form.CTFNO"
        label="证件号码"
        placeholder="请输入证件号码"
      />
      <van-field
        required
        input-align="right"
        clickable
        readonly
        label="电子账户开户类型"
        :value="form.OPENTYPE"
        placeholder="请选择电子账户开户类型"
        @click="sendPopup('OPENTYPEColumns', '电子账户开户类型', 'OPENTYPE')"
      />
    </van-form>

    <van-button
      @click="sumbit"
      block
      size="large"
      color="#E83439"
      style="margin-top: 20px"
      :loading="loading"
      loading-text="提交"
      >提交</van-button
    >
    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
      <public-popup
        :columns="columns"
        :title="title"
        :selKey="selKey"
        :colName="colName"
        @sel="getSent"
        @closePopup="closePopup"
      ></public-popup>
    </van-popup>
  </div> -->
  <div>
    <!-- <navBar :title="title" :left-arrow="back"></navBar> -->
    <tabbar />
    <div class="container">
      <div class="img-con1">
        <div><img :src="girl" /></div>
        <div @click="showTou('女')">投放女生纸条</div>
        <div @click="showChou('女')">抽取女生纸条</div>
      </div>
      <div class="img-con2">
        <div><img :src="boy" /></div>
        <div @click="showTou('男')">投放男生纸条</div>
        <div @click="showChou('男')">抽取男生纸条</div>
      </div>
    </div>
    <van-action-sheet v-model="touShow" title="投放纸条" @cancel="onCancel">
      <div class="content">
        <van-form ref="touForm" @submit="submitTouForm">
          <van-field
            readonly
            clickable
            name="picker"
            :value="touForm.xx"
            label="学校"
            placeholder="点击选择学校"
            @click="showSchoolPicker = true"
            :rules="touRules.xx"
          />
          <van-field
            v-model="touForm.phone"
            name="phone"
            label="联系方式"
            placeholder="联系方式"
            :rules="touRules.phone"
          />
          <van-field name="img" label="上传照片" :rules="touRules.img">
            <template #input>
              <van-uploader
                v-model="img"
                @oversize="onOversize"
                :max-size="10 * 1000 * 1024"
                :max-count="1"
                :before-read="beforeRead"
                :after-read="afterRead"
              />
            </template>
          </van-field>
          <van-field
            v-model="touForm.content"
            rows="2"
            autosize
            label="留言"
            maxlength="30"
            placeholder="请输入留言"
            show-word-limit
            :rules="touRules.content"
            name="content"
          />
          <div class="cost">2.09元/次</div>
          <div style="margin: 16px">
            <van-button block color="#2e1d13" native-type="submitTouForm"
              >确认放入</van-button
            >
          </div>
        </van-form>
      </div>
    </van-action-sheet>

    <van-action-sheet v-model="chouShow" title="抽取纸条" @cancel="onCancel">
      <div class="content">
        <van-form ref="chouForm" @submit="submitChouForm">
          <van-field
            readonly
            clickable
            name="picker"
            :value="chouForm.xx"
            label="学校"
            placeholder="点击选择学校"
            @click="showSchoolPicker = true"
            :rules="cunRules.xx"
          />
          <van-radio-group v-model="radio" :rules="cunRules.type">
            <van-cell-group>
              <van-cell title="单抽（2元/次）" clickable @click="radio = '0'">
                <template #right-icon>
                  <van-radio name="0" checked-color="#2e1d13" />
                </template>
              </van-cell>
              <van-cell title="五抽（8.8元/次）" clickable @click="radio = '1'">
                <template #right-icon>
                  <van-radio name="1" checked-color="#2e1d13" />
                </template>
              </van-cell>
              <van-cell title="十抽（16元/次）" clickable @click="radio = '2'">
                <template #right-icon>
                  <van-radio name="2" checked-color="#2e1d13" />
                </template>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
          <div style="margin: 16px">
            <van-button block native-type="submitChouForm" color="#2e1d13"
              >确认放入</van-button
            >
          </div>
        </van-form>
      </div>
    </van-action-sheet>
    <van-popup v-model="showSchoolPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="schoolColumns"
        @confirm="onSchoolConfirm"
        @cancel="showSchoolPicker = false"
      />
    </van-popup>
    <!--  <div class="input-container">
      <div class="label">手机号</div>
      <input
        type="text"
        placeholder="请输入手机号"
        v-model="form.phonenumber"
        maxlength="11"
      />
    </div>
    <div class="btn-container">
      <van-button size="middle" class="resetbtn" @click="reset"
        >重置</van-button
      >
      <van-button
        size="middle"
        class="btn"
        @click="submit"
        :loading="loading"
        loading-text="查询中..."
        :disabled="
          !form.openid || form.openid == 'null' || form.openid == 'undefined'
        "
        >查询</van-button
      >
    </div> -->
  </div>
</template>

<script>
import { prePay, uploadImg, getXX } from "@/api/index.js";
import { mapGetters } from "vuex";
import publicPopup from "@/components/public-popup";
import { decrypt } from "@/utils/jsencrypt";
import { encrypt } from "@/utils/crypt";
import axios from "axios";
import Tabbar from "@/components/Tabbar.vue";
import NavBar from "@/components/navBar.vue";
export default {
  name: "Home",
  components: {
    publicPopup,
    Tabbar,
    NavBar,
  },
  data() {
    return {
      title: "首页",
      back: false,
      key: "",
      girl: require("@/assets/image/girl.jpg"),
      boy: require("@/assets/image/boy.jpg"),
      touShow: false,
      chouShow: false,
      isTou: 1,
      showSchoolPicker: false,
      actions: [
        { name: "抽取一张", subname: "描述信息" },
        { name: "抽取五张", subname: "描述信息" },
        { name: "抽取十张", subname: "描述信息" },
      ],
      schoolColumns: [],
      /* form: {
        CLIENTOPENID: "", //小程序openid 必填
        APPID: "", //唯一标识id 必填
        PROGRAMID: "", //电子账户参数表中维护的项目编号 必填
        CSTNAME: "", //客户名称
        CTFTYPE: "", //证件类型
        CTFNO: "", //证件号码
        ISBRANCHCHOOSEN: "0", //是否选择开户网点 必填
        OPENTYPE: "", //电子账户开户类型 必填
        RETBUTTNAME: "", //返回合作方按键名称
        RETURL: "", //返回合作方URL
        DEPOSITONOK: "", //开户成功是否引导充值 必填
        ISCREDITCARDOPEN: "", //是否同步开立信用卡
        ISEXCLUSIVE: "", //是否专属账号 必填
      }, */
      /* https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa12e0c48eaa034cb&redirect_uri=https%3A%2F%2Fwx.gz.citicbank.com%2Frlxsh-ui%2Fpc%2Fopen.html%3Fchannel%3D123456aaa&response_userino=code&scope=snsapi_userinfo&state=123&connect_redirect=1#wechat_redirect */
      // wx.gz.citicbank.com
      /* 手动测试无需重定向 http://wx.gz.citicbank.com/dzkh-ui/h5/#/index?channel=123hhh */
      /* 手动测试需重定向 http://localhost:2000/dzkh-ui/h5/?code=dsczjsdncjd#/index&channel=123hhh */
      img: [],
      touForm: {
        type: 3, //3-放纸条
        openid: this.openId,
        sex: null,
        xx: null,
        //openid: JSON.parse(sessionStorage.getItem("openId")), //
        phone: null, //联系方式
        img: null, //图片地址
        content: null, //内容
        /*  
       isnew 0我行 1他行
       0：openurl
       1: openurl 19位sence */
      },
      touRules: {
        xx: [{ required: true, trigger: "blur", message: "学校不可为空" }],
        phone: [
          { required: true, trigger: "blur", message: "联系方式不可为空" },
        ],
        img: [{ required: true, trigger: "blur", message: "照片不可为空" }],
        content: [{ required: true, trigger: "blur", message: "留言不可为空" }],
      },
      radio: "0",
      chouForm: {
        xx: null,
        type: 0,
      },
      cunRules: {
        xx: [{ required: true, trigger: "blur", message: "学校不可为空" }],
        type: [
          { required: true, trigger: "blur", message: "抽取方式不可为空" },
        ],
      },

      columns: [],
      selKey: "",
      colName: "",
      CTFTYPEColumns: [{ value: 101, name: "身份证" }],
      OPENTYPEColumns: [
        { value: 1, name: "不限制" },
        { value: 2, name: "仅二类户" },
        { value: 3, name: "仅三类户" },
      ],
      loading: false,
    };
  },
  created() {
    //this.form.channelid = this.$route.query.channel;
    this.getSchool();
  },
  computed: {
    ...mapGetters({
      userInfo: "getUserInfo",
      openId: "getOpenId",
    }),
  },
  methods: {
    showTou(sex) {
      this.touForm.sex = sex;
      this.touShow = true;
      this.isTou = 1;
    },
    showChou(sex) {
      this.chouForm.sex = sex;
      this.chouShow = true;
      this.isTou = 0;
    },
    /* showSchool(n) {
      this.showSchoolPicker = true;
      Boolean(n) ? this.isTou = 1 : this.isTou = 0
    }, */
    onCancel() {
      this.isTou ? this.resetTou() : this.resetChou();
      this.showSchoolPicker = false;
    },
    // 在需要支付的地方调用以下函数
    initWXPay(config) {
      wx.config({
        debug: false,
        appId: config.appId,
        timestamp: config.timestamp,
        nonceStr: config.nonceStr,
        signature: config.signature,
        jsApiList: ["chooseWXPay"],
      });
      wx.ready(() => {
        // 微信支付配置完成后，调用支付函数
        wx.chooseWXPay({
          timestamp: config.timestamp,
          nonceStr: config.nonceStr,
          package: config.package,
          signType: config.signType,
          paySign: config.paySign,
          success: function (res) {
            // 支付成功的回调
          },
          fail: function (res) {
            // 支付失败的回调
          },
        });
      });
    },

    // 在需要支付的地方调用以下函数
    /*  initWXPay(config) {
  wx.config({
    debug: false,
    appId: config.appId,
    timestamp: config.timestamp,
    nonceStr: config.nonceStr,
    signature: config.signature,
    jsApiList: ['chooseWXPay']
  });

  wx.ready(() => {
    // 微信支付配置完成后，调用支付函数
    wx.chooseWXPay({
      timestamp: config.timestamp,
      nonceStr: config.nonceStr,
      package: config.package,
      signType: config.signType,
      paySign: config.paySign,
      success: function (res) {
        // 支付成功的回调
      },
      fail: function (res) {
        // 支付失败的回调
      }
    });
  });
}, */
    /* function onBridgeReady() {
      WeixinJSBridge.invoke('getBrandWCPayRequest', {
          "appId": "wx2421b1c4370ecxxx",   //公众号ID，由商户传入    
          "timeStamp": "1395712654",   //时间戳，自1970年以来的秒数    
          "nonceStr": "e61463f8efa94090b1f366cccfbbb444",      //随机串    
          "package": "prepay_id=wx21201855730335ac86f8c43d1889123400",
          "signType": "RSA",     //微信签名方式：    
          "paySign": "oR9d8PuhnIc+YZ8cBHFCwfgpaK9gd7vaRvkYD7rthRAZ\/X+QBhcCYL21N7cHCTUxbQ+EAt6Uy+lwSN22f5YZvI45MLko8Pfso0jm46v5hqcVwrk6uddkGuT+Cdvu4WBqDzaDjnNa5UK3GfE1Wfl2gHxIIY5lLdUgWFts17D4WuolLLkiFZV+JSHMvH7eaLdT9N5GBovBwu5yYKUR7skR8Fu+LozcSqQixnlEZUfyE55feLOQTUYzLmR9pNtPbPsu6WVhbNHMS3Ss2+AehHvz+n64GDmXxbX++IOBvm2olHu3PsOUGRwhudhVf7UcGcunXt8cqNjKNqZLhLw4jq\/xDg==" //微信签名
      },
      function(res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
              // 使用以上方式判断前端返回,微信团队郑重提示：
              //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          }
      });
  }
  if (typeof WeixinJSBridge == "undefined") {
      if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
      } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
          document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
      }
  } else {
      onBridgeReady();
  }	  
   */

    submitTouForm(config) {
      let form = {
        ...this.touForm,
        openid: this.openId,
      };
      prePay(form)
        .then((res) => {
          let form = "";
          if (res.code == 200) {
            let {
              appId, //公众号ID，由商户传入
              timeStamp, //时间戳，自1970年以来的秒数
              nonceStr, //随机串
              //signature,
              packageValue, //JSAPI下单接口返回的prepay_id参数值
              signType, //微信签名方式：
              paySign, //微信签名
            } = res.data;
            form = {
              appId,
              timeStamp,
              nonceStr,
              package: packageValue,
              signType,
              paySign,
            };
            console.log(123,form)
            return
            this.wxReadyToPay(form);
          }
          /* if (res.code == 200) {
            let {
              appId, //公众号ID，由商户传入
              timeStamp, //时间戳，自1970年以来的秒数
              nonceStr, //随机串
              //signature,
              packageValue, //JSAPI下单接口返回的prepay_id参数值
              signType, //微信签名方式：
              paySign, //微信签名
            } = res.data;
            console.log(123,appId)
            this.$wx.config({
              debug: true,
              appId: appId,
              timestamp: timeStamp,
              nonceStr: nonceStr,
              //signature: config.signature,
              jsApiList: ["chooseWXPay"],
            });
            this.$wx.ready(() => {
              // 微信支付配置完成后，调用支付函数
              wx.chooseWXPay({
                timestamp: timestamp,
                nonceStr: nonceStr,
                package: packageValue,
                signType: signType,
                paySign: paySign,
                success: function (res) {
                  // 支付成功的回调
                  this.resetTou();
                  this.$dialog
                    .confirm({
                      title: "提示",
                      message: "投入成功",
                      confirmButtonText: "前往查看",
                      confirmButtonColor: "#e57373",
                    })
                    .then(() => {
                      this.$router.push("/list");
                    })
                    .catch(() => {});
                },
                fail: function (res) {
                  // 支付失败的回调
                },
              });
            });
          } */
        })
        .catch(() => {});
    },
    // 点击支付时候调用
    wxReadyToPay(params) {
      let that = this;
      if (typeof WeixinJSBridge === "undefined") {
        if (document.addEventListener) {
          document.addEventListener(
            "WeixinJSBridgeReady",
            that.onBridgeReady(params),
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent(
            "WeixinJSBridgeReady",
            that.onBridgeReady(params)
          );
          document.attachEvent(
            "onWeixinJSBridgeReady",
            that.onBridgeReady(params)
          );
        }
      } else {
        that.onBridgeReady(params);
      }
    },
    onBridgeReady(params) {
      const that = this;
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: params.appId, // 公众号名称，由商户传入
          timeStamp: params.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: params.nonceStr, // 支付签名随机串，不长于 32 位
          package: params.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
          signType: params.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: params.paySign, // 支付签名
        },
        function (res) {
          if (res.err_msg === "get_brand_wcpay_request:ok") {
            that.$router.push("/list"); // 这里是查询订单是否支付完成，然后执行成功和失败的业务逻辑
          } else if (res.err_msg === "get_brand_wcpay_request:fail") {
            this.$toast("支付失败！");
          }
        }
      );
    },
    // 判断文件大小
    onOversize(file) {
      this.$toast("文件大小不能超过 10M");
    },
    // 判断文件类型
    beforeRead(file) {
      if (
        file.type != "image/png" &&
        file.type != "image/jpg" &&
        file.type != "image/jpeg"
      ) {
        this.$toast("请上传png或jpg或jpeg 格式图片");
        return false;
      }
      return true;
    },
    /*  afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file.file);
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      const param = new FormData();
      param.append("files", file.file);
      uploadImg(param).then((res) => {
        console.log(res);
      });
    }, */
    // 上传图片
    async afterRead(file) {
      let formData = new window.FormData();
      formData.append("file", file.file);
      try {
        let res = await axios.post(
          process.env.VUE_APP_BASE_API + "/wx/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (res.data.code == 200) {
          this.touForm.img = res.data.data.fileName;
        }
      } catch (e) {
        this.$toast(`网络连接错误, 请稍后再试!`);
      }
    },
    submitChouForm() {
      let form = {
        ...this.chouForm,
        type: Number(this.radio),
        openid: this.openId,
      };
      prePay(form)
        .then((res) => {
          this.resetChou();
          if (res.code == 200) {
            this.$dialog
              .confirm({
                title: "提示",
                message: "抽取成功",
                confirmButtonText: "前往查看",
                confirmButtonColor: "#e57373",
              })
              .then(() => {
                this.$router.push("/list");
              })
              .catch(() => {});
          } /* else {
          this.$dialog
            .confirm({
              title: "提示",
              message: res.msg,
              confirmButtonText: "确定",
              confirmButtonColor: "#e57373",
            })
            .then(() => {
            })
            .catch(() => {
              // on cancel
            });
        } */
        })
        .catch(() => {});
    },
    getSchool() {
      getXX().then((res) => {
        if (res.code == 200) {
          this.schoolColumns = res.data;
        }
      });
    },
    onSchoolConfirm(value) {
      if (this.isTou) {
        this.touForm.xx = value;
      } else {
        this.chouForm.xx = value;
      }

      this.showSchoolPicker = false;
    },
    resetChou() {
      this.chouForm.xx = null;
      this.chouForm.type = null;
      this.chouShow = false;
    },
    resetTou() {
      this.touForm.phone = null;
      this.touForm.img = null;
      this.touForm.xx = null;
      this.img = [];
      this.touForm.content = null;
      this.touShow = false;
    },
    validate() {
      let msg = "",
        valid = true;
      if (
        this.form.CTFNO &&
        !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.form.CTFNO)
      ) {
        msg = "请输入正确的身份证号码";
        valid = false;
      } else if (!this.form.OPENTYPE) {
        msg = "请选择电子账户开户类型";
        valid = false;
      }
      return { msg, valid };
    },
    sendPopup(col, tit, selKey) {
      this.show = true;
      this.columns = this[col];
      this.colName = col;
      this.title = tit;
      this.selKey = selKey;
    },
    submit() {
      /* const { msg, valid } = this.validate();
      if (!valid) {
        this.$dialog({ message: msg });
        return;
      } */
      if (!this.form.phonenumber) {
        this.$dialog({
          message: "请输入手机号进行查询",
          type: "error",
        });
        return;
      }
      if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.form.phonenumber)) {
        this.$dialog({
          message: "请输入正确的手机号",
          type: "error",
        });
        return;
      }
      this.loading = true;
      let sendForm = {
        ...this.form,
        phonenumberjm: encrypt(this.form.phonenumber),
      };
      submitForm(sendForm)
        .then((res) => {
          this.loading = false;
          if (res.code == 200) {
            if (res.isNewCust == 0) {
              window.location.href = res.openUrl;
            } else if (res.isNewCust == 1) {
              this.$router.push("/test?scene=" + res.openCode);
            }
          }
          /* if (res.code == -2) {
            Toast({
              message: res.msg,
              type: "error",
              duration: 3 * 1000,
            });
            return;
          } */
          /* this.$dialog
            .alert({
              title: "提示",
              message: "弹窗内容",
            })
            .then(() => {
              this.$router.push("/test?scene=" + res.data.scene);
            }); */
        })
        .catch((err) => {
          this.loading = false;
          /* Toast({
              message: res.msg,
              type: "error",
              duration: 3 * 1000,
            }); */
        });
    },
    getLabel(col, sel) {
      let label = "";
      let col1 = String(col);
      this[col].forEach((item) => {
        if (item.value == sel) {
          label = item.name;
        }
      });
      return label;
    },
    async getSent($event) {
      let selKey = String($event.selKey);
      this.form[selKey] = await this.getLabel($event.selCol, $event.selVal);
      this.show = false;
    },
    closePopup() {
      this.show = false;
    },
    reset() {
      this.loading = false;
      this.form = {
        /* CHANNEL: "KHSB",
        TRADECODE: "chkmob",
        CHKMOB: "", */
        phonenumber: "", //手机号
        openid: JSON.parse(sessionStorage.getItem("openId")), //
        channelid: "", //渠道号
      };
    },
  },
};
</script>

<style lang="scss" scoped>
/* .container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
} */
.container {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  padding: 40px 10px 0 10px;
  width: 100%;

  .img-con1 {
    margin-right: 10px;
  }

  .img-con1,
  .img-con2 {
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    border: 1px solid #f7f8f3;
    background: #f7f8f3;

    img {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      border: 1px solid #c0b7b5;
    }

    div:nth-child(1) {
      padding: 20px;
    }

    div:nth-child(2) {
      border-top: 1px solid #c0b7b5;
      border-bottom: 1px solid #c0b7b5;
      //margin-bottom: 10px;
    }

    div:nth-child(2),
    div:nth-child(3) {
      font-weight: 600;
      font-size: 16px;
      font-size: 0.42667rem;
      width: 100%;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
  }

  .content {
    padding: 16px 16px 160px;
  }
}

.cost {
  font-size: 16px;
  width: 100%;
  text-align: center;
}
</style>
