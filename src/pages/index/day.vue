<template>
  <div class="content-box">
    <img  style="height:760px" src="../../assets/imgs/1.jpg" alt="">
    <img style="height:667px"  src="../../assets/imgs/2.jpg" alt="">
    <img  style="height:667px" src="../../assets/imgs/3.jpg" alt="">
    <img style="height:667px"  src="../../assets/imgs/4.jpg" alt="">
  </div>
</template>

<script>
import {mapMutations, mapGetters, mapState} from 'vuex'
import commonHeader from 'common/common-header'
export default {
  data () {
    return {
     
    }
  },
  methods: {
    ...mapMutations({
      setNum: 'SET_NUM'
    }),
    todetail() {
      this.$router.togo('/Home/Detail')
    }
  },
  components: {
    commonHeader
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.page-content{
  .mb(98);
  
}
</style>
