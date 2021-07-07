<template>
  <div class="content-box">
    <!-- <common-header> </common-header> -->
    <div class="page-content">
      <div class="smallicon" style="width: 21px; height: 21px">
        <img src="../../assets/imgs/矢量智能对象 拷贝 24.png" alt="" />
      </div>
      <div class="smallcode" style="height: 404px">
        <div>
          <img src="../../assets/imgs/LOGO.png" alt="" style="height: 35px" />
        </div>
        <div class="barcode">
          <canvas id="barcode"></canvas>
        </div>
        <div class="qrcode">
          <vue-qr
            :text="randomId"
            :margin="0"
            colorDark="#000000"
            colorLight="#fff"
            :size="154"
          ></vue-qr>
        </div>
        <div class="integ">
          <p>
            <img src="../../assets/imgs/碳积分.png" alt="" />
            <span>碳积分余额(剩余{{ Number(this.integral).toFixed(2) }})</span>
          </p>
          <span @click="viewdetail">如何获取碳积分<b>></b></span>
        </div>
      </div>
      <div class="foodimg">
        <img src="../../assets/imgs/联名.png" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from "vuex";
import commonHeader from "common/common-header";
import JsBarcode from "jsbarcode";

import server from "../../utils/server";
import { Toast } from "vant";
import axios from "axios";
import vueQr from "vue-qr";
import qs from "qs";
import crytoJs from "../../tool/crytoJs";
import jsencrypt from "../../tool/jsencrypt";

export default {
  data() {
    return {
      num: 0,
      randomId: "",
      integral: "",
    };
  },
  created() {},
  mounted() {
    this.IdLength();
    this.get_user_balance();
  },
  methods: {
    ...mapMutations({
      setNum: "SET_NUM",
    }),
    BarCodes(randomId) {
      JsBarcode("#barcode", randomId, {
        format: "CODE128", //条形码的格式
        lineColor: "#000000", //线条颜色
        width: 2, //线宽
        height: 76, //条码高度
        displayValue: true, //是否显示文字信息
      });
    },
    // 获取支付码
    request_pay_code(request_id, user_id, mobile, token) {
      axios({
        url: server.url.request_pay_code,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify({
          data: crytoJs.jiami(
            JSON.stringify({
              request_id: request_id,
              merchant_id: "88888888",
              contact_mobile: mobile,
              sign: "143880e9ee8f269e273e33f15e66ab47",
              token: token,
              userId: user_id,
              version_id: "1.0",
              token: server.getLocal("token"),
            })
          ),
          aesKey: jsencrypt.jiami(crytoJs.keyOne),
        }),
        method: "post",
      }).then((result) => {
        // console.log(result);
        if (result.data.result_code == "0") {
          var AESkey = jsencrypt.jiemi(result.data.result_info.AESkey);
          var payCode = JSON.parse(
            crytoJs.jiemi(
              jsencrypt.jiemi(result.data.result_info.AESkey),
              result.data.result_info.data
            )
          );
          console.log(payCode);
          this.randomId = payCode.randomId;
          this.BarCodes(payCode.randomId);
          this.loading = false;
          this.forTime(token, user_id, payCode.randomId);
        } else {
          this.loading = true;
          Toast({
            position: "bottom",
            message: "请重新登录",
          });
          server.clearLocal();
          setTimeout(() => {
            this.$router.push({
              path: "/",
            });
          }, 3000);
        }
      });
    },
    //获取个人积分
     get_user_balance() {
      axios({
        url: server.url.get_user_balance,
        method: "post",
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        data: qs.stringify({
            userId: server.getLocal("userId"),
        })
      }).then((result) => {
        // console.log(result);
        if (result.data.result_code == "0") {
          var AESkey = result.data.result_info;
          this.integral = AESkey;
        }
      });
    },
    viewdetail() {
      this.$router.push("day");
    },
    todetail() {
      this.$router.togo("/Home/Detail");
    },
    // 处理身份证号长度不足17补0
    IdLength() {
      var user_id = server.getLocal("userId");
      var mobile = server.getLocal("mobile");
      var id_card = server.getLocal("userId");
      var token = server.getLocal("token");
      this.request_pay_code(id_card, user_id, mobile, token);
    },
    // 查询支付结果
    get_pay_order_result_info(token, user_id, barcode) {
      let a = {
        barcode: barcode,
        token: server.getLocal("token"),
        userId: server.getLocal("userId"),
      };
      console.log(a);
      axios({
        url: server.url.get_pay_order_result_info,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify({
          data: crytoJs.jiami(
            JSON.stringify({
              barcode: barcode,
              token: server.getLocal("token"),
              userId: server.getLocal("userId"),
            })
          ),
          aesKey: jsencrypt.jiami(crytoJs.keyOne),
        }),
        method: "post",
      }).then((result) => {
        // console.log(result);
        if (result.data.result_code == "0") {
          var AESkey = jsencrypt.jiemi(result.data.result_info.AESkey);
          var payResult = JSON.parse(
            crytoJs.jiemi(
              jsencrypt.jiemi(result.data.result_info.AESkey),
              result.data.result_info.data
            )
          );
          console.log(payResult);
          clearInterval(this.timer);
          this.$router.push({
            path: "/story",
            query: {
              type: 4,
              payresult: 0,
              order_id: payResult.oper_srl,
              result: result.data.result_code,
              score: payResult.repair_order_info.score,
              state: payResult.repair_order_info.state,
              discount_amount: payResult.repair_order_info.discount_amount,
              totel_money: payResult.repair_order_info.totel_money,
            },
          });

          this.integral = Number(
            Number(this.integral) - Number(payResult.repair_order_info.score)
          ).toFixed(2);
          localStorage.setItem("integral", this.integral);
        } else if (result.data.result_code == "-100") {
          Toast({
            position: "bottom",
            message: "请重新登录",
          });
          // server.clearLocal();
          setTimeout(() => {
            this.$router.push({
              path: "/",
            });
          }, 500);
        }
      });
    },
    // 循环
    forTime(token, user_id, barcode) {
      var i = 0;
      this.timer = setInterval(() => {
        this.get_pay_order_result_info(token, user_id, barcode);
        i++;
        if (i >= 30) {
          i = 0;
          clearInterval(this.timer);
          window.location.reload();
        }
      }, 2000);
    },
  },
  components: {
    commonHeader,
    vueQr,
  },
  computed: {
    ...mapGetters(["number"]),
    ...mapState({
      number: (state) => state.home.number,
    }),
  },
  beforeDestroy() {
    //   组建销毁 清楚定时器
    clearInterval(this.timer);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.page-content {
  background-color: #52c852;
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
      margin-bottom: 10px;
      display: flex;
      justify-content: flex-start;
      img {
        margin-right: 10px;
        height: 17px;
      }
      span {
        font-size: 13px;
        color: #000000;
      }
    }
    span {
      font-size: 13px;
      color: #707070;
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
