<template>
  <div class="loading">
    <div class="error"
         v-if="isError">
      <img src="@/assets/images/error.png"
           alt
           width="161"
           height="160" />
      <span>网络异常，请下拉刷新页面</span>
    </div>
    <div class="loadingBox"
         v-else>
      <div class="loadimg"></div>
      <div class="textValue">正在加载中...</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'loading',
  data () {
    return {
    }
  },
  props: {
    isError: {
      type: Boolean,
      default: false
    }
  },


  methods: {
  },
  created () {
  }
}
</script>

<style scoped lang="less" type="text/less">
.loading {
  // height: calc(100vh - 110px);
  padding-top: 103px;
  // background: #fafafa;
  display: flex;
  justify-content: center;
  .loadingBox {
    width: 126px;
    height: 97px;
    padding-top: 29px;
    background-size: 100%;
    background-repeat: no-repeat;
    // background-image: url("../../assets/images/loadingbg.png");
    .loadimg {
      width: 35px;
      height: 35px;
      margin-left: 44px;
      background-size: 100%;
      animation: loading 1s infinite ease-in-out;
      background-repeat: no-repeat;
      background-image: url("../../assets/images/loading.gif");
    }
    .textValue {
      margin-top: 12px;
      text-align: center;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFangSC;
      font-weight: 400;
      color: #999;
    }
  }
  .error {
    display: flex;
    flex-direction: column;

    span {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      margin-top: 10px;
    }
  }
}
</style>
