<template>
  <div class="loading">
    <div class="loading">
      <van-overlay :show="true" />
      <div class="van-loading">
        <van-loading type="spinner" color="#1989fa" vertical>加载中...</van-loading>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.van-loading {
  //   margin-top: 80%;
  position: absolute;
  top: 40%;
  width: 100%;
  z-index: 999;
}
</style>