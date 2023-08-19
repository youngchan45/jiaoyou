<template>
  <div>
    <router-view></router-view>
    <van-tabbar route v-model="active" @change="onChange" active-color="#d1a8a2">
      <van-tabbar-item replace to="/index" icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="manager">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Tabbar",
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    onChange(index) {
      this.active = index;
    },
  },
};
</script>
