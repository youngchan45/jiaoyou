<template>
  <div id="nav">
    <van-nav-bar
      :title="title"
      :left-arrow="showLeft"
      @click-left="onClickLeft"
    />
  </div>
</template>

<script>
export default {
  props: {
    title: "title",
    showLeft: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.van-nav-bar {
  font-size: 18px !important;
  /* 设置导航栏的渐变色 */
  background: #f7f8f3;
  border: 0;
}
.van-hairline--bottom::after {
  /* 去除导航栏底部的白色横线 */
  border-bottom-width: 0px !important;
}
</style>