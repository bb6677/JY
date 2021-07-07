<template>
  <div class="content-box">
    <!-- <common-header> </common-header> -->
    <div class="page-content">
      <div v-if="querys.state==1" class="smallicon">
        <div  class="payicon">
          <img src="../../assets/imgs/chenggong.png" alt="" />
          <div>支付成功</div>
        </div>
        <p>本次支付总金额为:<b>{{Number((Number(querys.discount_amount)+Number(querys.totel_money))/100)}}元</b></p> 
        <span style="fontsize:15px">碳积分消费:<b>{{querys.score}}</b>&nbsp;&nbsp;优惠金额:<b>{{Number((querys.discount_amount)/100)}}元</b></span> 
      </div>
      <div v-else class="smallicon">
        <div class="payicon">
          <img src="../../assets/imgs/chenggong.png" alt="" />
          <span>支付失败</span>
          <p></p> 
        <span style="fontsize:15px"></span> 
        </div>
      </div>
      <div class="foodimg">
        <img style="height:464px" src="../../assets/imgs/海报 拷贝.png" />
      </div>
    </div>
    
  </div>
</template>

<script>
import {  mapGetters, mapState } from "vuex";
import commonHeader from "common/common-header";

export default {
  data() {
    return {
      querys:{},
      integral:""
    };
  },
  created() {},
  mounted() {
   this.skipData()
  },
  methods: {
    skipData(integral) {
      this.querys = this.$route.query
      //console.log(this.querys);


      // console.log(this.querys.score);
      // console.log(localStorage.getItem('integral'));
      // this.integral=(localStorage.getItem('integral')-0.01).toFixed(2)
      //  console.log(this.integral);
      // localStorage.setItem('integral',this.integral)


    }
  },
  components: {
    commonHeader,
  },
  computed: {
    ...mapGetters(["number"]),
    ...mapState({
      number: (state) => state.home.number,
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.page-content {
  background-color: #FFFFFF;
  padding-top: 20px;
  .smallicon {
    margin: 9px 15px;
    // height: 21px;
    .payicon {
      display: flex;
      justify-content: center;
    }
    img {
      height: 23px;
      margin-right: 11px;
    }
    div {
      font-size: 19px;
      color: #000000;
    }
    p {
      margin-top: 15px;
      margin-bottom: 10px;
      font-size: 19px;
      color: #000000ff;
      b{
        color: #28C108;
        font-size: 19px;
      }
      
    }
      span{
        font-size: 15px;
        b{
          color: #28C108;
        font-size: 15px;
        }
      }
  }
  .smallcode {
    height: 404px;
    margin: 9px 15px;
    background-color: #ffffff;
  }
  .foodimg {
    margin-top: 24px;
    margin: 9px 15px;
    height: 464px;
    // background-color: #ffffffff;
  }
}
</style>
