<template>
  <div id="app">
    <keep-alive include="Home">
      <router-view></router-view>
    </keep-alive>
    <!-- <dragMenu></dragMenu> -->
  </div>
</template>
<script>
import dragMenu from "@/components/dragMenu";

export default {
  name: "app",
  data() {
    return {};
  },
  components: { dragMenu },
};
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
#app {
  height: 100%;
  background-color: #f0e4da;
  font-family: "Microsoft YaHei", Arial, sans-serif;
  color:#333
}
</style>
