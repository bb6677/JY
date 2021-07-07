<template>
  <div class="accountLogin">
    <div class="navigation">
      <span class="sicon" style="font-size: 18px; color: #303741ff">＜</span>
      <span class="ssize" style="font-size: 18px; ；color: #303741ff"
        >碳积分×金鹰</span
      >
      <span class="sspace" style="font-size: 18px">&nbsp;&nbsp;&nbsp;</span>
    </div>
   
  </div>
</template>

<script>
import { sendCode } from "../../utils/index";
export default {
  name: "pagecode",
  data() {
    return {
      userMobile: "",
      loginPassword: "",
      mapStyle: "background:#399F62FF;",
      normalStyle: "",
      choseValue: "",
      isOk:true
    };
  },
  methods: {
    login() {
     
      if (this.loginPassword && this.userMobile) {
         this.isOk=false
      this.$router.push("/home");
      }else{
        alert(1);
      }
    },
    sendCode(id) {
      sendCode(id, "发送验证码", "#336AFA", "#8f969f");
    },
  },
};
</script>

<style lang="less" scoped>
.accountLogin {
  // background-image:url('../../assets/imgs/底图.png');
  // background-position:bottom;
  // background-repeat: no-repeat;
  .navigation-login {
    height: 100%;
    background-image: url("../../assets/imgs/底图.png");
    background-repeat: no-repeat;
    background-color: #52c852ff;
    .login {
      width: 314px;
      margin: 0 auto;
      position: absolute;
      top: 450px;
      left: 30px;
      h2 {
        font-size: 30px;
        font-weight: 600;
        color: #303741;
        line-height: 30px;
        margin: 22px 0 15px;
      }
      h3 {
        font-size: 12px;
        font-weight: 400;
        color: #8f969f;
        line-height: 12px;
        span {
          color: blue;
        }
      }
      .mobile {
        width: 312px;
        height: 60px;
        background: #f5f7fa;
        border-radius: 10px;
        line-height: 60px;
        margin: 5px 0 12px;
        img {
          width: 9px;
          height: 5px;
          vertical-align: middle;
        }
        input {
          outline: none;
          border: none;
          vertical-align: middle;
          // margin-left: 14px;
          // width: 100px;
          font-size: 15px;
          font-weight: 400;
          background: #f5f7fa;
          color: #666666ff;
          margin-right: 80px;
        }
        .close {
          width: 18px;
          height: 18px;
        }
      }
      .pwd {
        width: 312px;
        height: 60px;
        background: #f5f7fa;
        border-radius: 10px;
        line-height: 60px;
        margin: 0 0 21px;
        span {
          color: #28c108ff;
          font-size: 16px;
          line-height: 15px;
          margin-left: 15px;
          vertical-align: middle;
        }
        b {
          font-size: 15px;
          color: #ccccccff;
        }
        input {
          outline: none;
          border: none;
          vertical-align: middle;
          margin-left: 8px;
          width: 92px;
          font-size: 15px;
          font-weight: 400;
          background: #f5f7fa;
          color: #666666ff;
          margin-right: 80px;
        }
        .close {
          width: 18px;
          height: 14px;
        }
      }
    }
  }
  .navigation {
    padding: 33px 10px 20px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    img {
      width: 17px;
      height: 17px;
    }
    span {
      font-size: 13px;
      font-weight: 400;
      color: #303741;
      line-height: 13px;
    }
  }

  .submit {
    width: 282px;
    height: 48px;
    background: #41a73fff;
    border-radius: 22px;
    font-size: 15px;

    font-weight: 400;
    color: #ffffff;
  }
  .submit1 {
    width: 282px;
    height: 48px;
    background: #399f62ff;
    border-radius: 22px;
    font-size: 15px;

    font-weight: 400;
    color: #ffffff;
  }
  .methods {
    display: flex;
    justify-content: space-between;
    margin: 17px 0;
    span:first-child {
      font-size: 13px;
      font-weight: 400;
      color: #8f969f;
    }
    span:last-child {
      font-size: 13px;
      font-weight: 400;
      color: #8f969f;
    }
  }
  .footer {
    position: absolute;
    bottom: 0;
    z-index: -1;
    img {
      width: 375px;
      height: 172px;
    }
  }
}
</style>