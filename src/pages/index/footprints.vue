<template>
  <div class="content-box">
    <common-header> </common-header>
    <div class="page-content">
      <img src="../../assets/imgs/底图 (3).png" alt="" />
      <div class="posttionboom">
        <div class="mobile">
          <input
            v-model="mobile"
            ref="tel"
            type="tel"
            maxlength="11"
            placeholder="请输入手机号"
            @input="iptchange"
          />
          <b></b>
          <b></b>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="pwd">
          <input
            ref="input"
            v-model="mobileCode"
            type="tel"
            maxlength="4"
            placeholder="请输入验证码"
          />
          <b>|</b>
          <span v-if="show" @click="mobile_code()">发送验证码</span>
          <span v-else class="count" style="color: #666666"
            >{{ count }}s重新发送</span
          >
        </div>
        <button
          v-if="isOk"
          class="submit"
          @click="login_send()"
          :style="choseValue == 'choseone' ? mapStyle : normalStyle"
        >
          立即参与
        </button>
        <button
          v-if="!isOk"
          class="submit1"
          @click="login"
          :style="choseValue == 'choseone' ? mapStyle : normalStyle"
        >
          立即参与
        </button>
      </div>
    </div>
    <loading v-if="loadingShow"></loading>
  </div>
</template>

<script>
import crytoJs from "../../tool/crytoJs";
import jsencrypt from "../../tool/jsencrypt";
import qs from "qs";
import server from "../../utils/server";
import { Toast, Notify } from "vant";
import loading from "../../components/Loading";
import axios from "axios";
export default {
  data() {
    return {
      mobileCode: "",
      userMobile: "",
      loginPassword: "",
      mapStyle: "background:#399F62FF;",
      normalStyle: "",
      choseValue: "",
      isOk: true,
      show: true,
      count: "",
      timer: null,
      mobile: "",
      loadingShow: false,
    };
  },
  components: {
    loading,
  },
  mounted() {
    if (localStorage.getItem("mobile")&&localStorage.getItem("token")) {
      this.$router.push("home");
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log(from);
    next();
    if(from.path=="/home"){
      localStorage.removeItem("mobile")
      localStorage.removeItem("userId")
      localStorage.removeItem("token")
      localStorage.removeItem("integral")
    }
  },
  watch: {
    $route(to, from) {
      console.log(from);
    },
  },
  created() {},
  methods: {
    //input失去焦点
    iptchange() {
      if (this.mobile.length >= 11) {
        this.$refs.tel.blur();
      }
    },
    //   验证手机号  发送验证码
    mobile_code() {
      if (server.isMobilePhone(this.mobile)) {
        this.send_verification_code(this.mobile);
      } else if (this.mobile == "" || this.mobile == null) {
        Notify({
          message: "请输入手机号",
          color: "#fff",
          background: "red",
          duration: 800,
        });
        return;
      } else if (this.mobile.length != 11) {
        Notify({
          message: "请输入正确手机号",
          color: "#fff",
          background: "red",
          duration: 800,
        });
        return;
      }
    },
    // 立即参与
    login_send() {
      console.log(2222);
      if (this.mobile == "" || this.mobile == null) {
        //顶部提示
        Notify({
          message: "请输入手机号",
          color: "#000",
          type: "warning",
          duration: 800,
        });
        return;
      }
      if (this.mobile.length != 11) {
        Notify({
          message: "请输入正确手机号",
          color: "#fff",
          background: "red",
          duration: 800,
        });
        return;
      }

      if (this.mobileCode.length != 4) {
        Notify({
          message: "请输入验证码",
          color: "#fff",
          background: "red",
          duration: 800,
        });
        return;
      }
      if (server.isMobilePhone(this.mobile) && this.mobileCode.length == 4) {
        this.loadingShow = true;
        this.user_login(this.mobile, this.mobileCode);
      }
    },
    //倒计时
    getCode() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    // // 获取验证码
    send_verification_code(mobile) {
      console.log(server.url.send_verification_code);
      axios({
        url: server.url.send_verification_code,
        method: "post",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },

        data: qs.stringify({
          data: crytoJs.jiami(
            JSON.stringify({ mobile: mobile, sms_type: "1" })
          ),
          aesKey: jsencrypt.jiami(crytoJs.keyOne),
        }),
      }).then((result) => {
        if (result.data.result_code == "0") {
          this.getCode();
          Notify({
            message: "短信已发送",
            color: "#fff",
            background: "#1989fa",
          });
        } else {
          Notify({
            message: "短信发送失败,请重试",
            color: "#fff",
            background: "red",
          });
        }
        var v = getCookieValue("secondsremained")
          ? getCookieValue("secondsremained")
          : 0; //获取cookie值

        if (v > 0) {
          settime($("#code_btn")); //开始倒计时
        }
      });
    },
    // 登录接口
    user_login(mobile, code) {
      axios({
        url: server.url.user_login,
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify({
          data: crytoJs.jiami(
            JSON.stringify({ mobile: mobile, verifiyCode: code })
          ),
          aesKey: jsencrypt.jiami(crytoJs.keyOne),
        }),
      }).then((result) => {
        if (result.data.result_code == "0") {
          var AESkey = jsencrypt.jiemi(result.data.result_info.AESkey);
          var user_info = JSON.parse(
            crytoJs.jiemi(
              jsencrypt.jiemi(result.data.result_info.AESkey),
              result.data.result_info.data
            )
          );
          console.log(user_info);
          server.setLocal("mobile", user_info.mobile);
          server.setLocal("integral", user_info.balance);
          server.setLocal("userId", user_info.user_id);
          server.setLocal("token", user_info.token);
          this.loadingShow = false;
          this.$router.replace("/home");
        } else {
          Notify({
            message: result.data.err_msg || "网络繁忙, 请稍后重试",
            color: "#fff",
            background: "red",
          });
          this.loadingShow = false;
        }
      });
    },
  },

  computed: {},
};
</script>


<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";

.page-content {
  position: relative;

  background-color: #52c852;
  img {
    height: 379px;
  }
  .posttionboom {
    height: 132px;
    top: 55%;
    left: 43%;
    .mobile {
      display: flex;
      justify-content: space-around;
      margin: 0px 31px;
      border-radius: 10px;
      line-height: 60px;
      height: 59px;
      background-color: #ffffff;
      input {
        width: 30%;
        border-radius: 10px;
        margin-right: 60px;
        outline: none;
        border: none;
        vertical-align: middle;
        font-size: 15px;
        color: #666666;
        touch-action: none;
      }
    }
    .pwd {
      display: flex;
      justify-content: space-around;
      margin: 10px 31px 0 31px;
      border-radius: 10px;
      line-height: 60px;
      height: 59px;
      background-color: #ffffff;
      margin-bottom: 22px;
      input {
        width: 30%;
        border-radius: 10px;
        margin-right: 60px;
        outline: none;
        border: none;
        vertical-align: middle;
        font-size: 15px;
        color: #666666;
        touch-action: none;
      }
      span {
        color: #28c108ff;
        font-size: 16px;

        margin-left: 15px;
        vertical-align: middle;
      }
      b {
        font-size: 15px;
        color: #cccccc;
      }
    }
    .submit {
      width: 282px;
      height: 48px;
      background: #41a73f;
      border-radius: 22px;
      font-size: 15px;
      font-weight: 400;
      color: #ffffff;
      touch-action: none;
    }
    .submit1 {
      width: 282px;
      height: 48px;
      background: #399f62;
      border-radius: 22px;
      font-size: 15px;
      touch-action: none;
      font-weight: 400;
      color: #ffffff;
    }
  }

  .smallicon {
    margin: 9px 15px;
    height: 21px;
  }
  .barcode {
    img {
      height: 86px;
    }
    p {
      font-size: 17px;
      color: #000000;
    }
  }
  .integ {
    line-height: 20px;
    display: flex;
    justify-content: space-around;
    p {
      display: flex;
      justify-content: flex-start;
      img {
        margin-right: 10px;
        height: 17px;
      }
    }
    span {
      font-size: 17px;
      color: #000000;
    }
  }
  .smallcode {
    height: 404px;
    margin: 9px 15px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .foodimg {
    margin: 6px 15px;
    height: 138px;
    background-color: #ffffff;
  }
}
</style>
