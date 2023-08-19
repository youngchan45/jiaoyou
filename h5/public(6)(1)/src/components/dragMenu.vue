<template>
  <div class="dragMenu">
    <div id="menu" style="position:fixed;">
      <van-icon name="bars" size="20" color="#ffffff"></van-icon>
    </div>
    <van-popup v-model="show" position="left" class="menupop">
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item
          :title="item.name"
          v-for="(item,i) in menuList"
          :key="i"
        />
      </van-sidebar>
    </van-popup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      show: false,
      activeKey: 5,
      menuList: [
        {
          name: "首页",
          url: "/",
          role: "",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "getUserInfo",
    }),
  },
  watch: {
    $route(val) {
      this.menuList.forEach((item, index) => {
        if (val.path.indexOf(item.url) != -1) {
          this.activeKey = index;
        }
      });
    },
  },
  mounted() {
    let flag = 0;
    let _this = this;
    let oDiv = document.getElementById("menu");
    let disX, disY, L, T, moveX, moveY, starX, starY, starXEnd, starYEnd;
    oDiv.addEventListener("touchstart", function (e) {
      // console.log(1);
      flag = 0;
      e.preventDefault();
      disX = e.touches[0].clientX - this.offsetLeft;
      disY = e.touches[0].clientY - this.offsetTop;
      starY = e.touches[0].clientY;
      starX = e.touches[0].clientX;
    });
    oDiv.addEventListener("touchmove", function (e) {
      L = e.touches[0].clientX - disX;
      T = e.touches[0].clientY - disY;
      starXEnd = e.touches[0].clientX - starX;
      starYEnd = e.touches[0].clientY - starY;
      if (L < 0) {
        L = 0;
      } else if (L > document.documentElement.clientWidth - this.offsetWidth) {
        L = document.documentElement.clientWidth - this.offsetWidth;
      }
      if (T < 0) {
        T = 0;
      } else if (
        T >
        document.documentElement.clientHeight - this.offsetHeight
      ) {
        T = document.documentElement.clientHeight - this.offsetHeight;
      }
      moveX = L + "px";
      moveY = T + "px";
      if (this.style.left != moveX && this.style.top != moveY) {
        // console.log(2);
        flag = 1;
      }

      this.style.left = moveX;
      this.style.top = moveY;
    });
    oDiv.addEventListener("touchend", function (e) {
      // console.log(3);
      if (flag === 0) {
        setTimeout(() => {
          _this.show = true;
        });
      }
    });
  },
  methods: {
    goPage(url) {
      this.$router.push(url);

      this.show = false;
    },
    onChange(index) {
      console.log(index);
      this.goPage(this.menuList[index].url);
    },
  },
};
</script>

<style lang="scss" scoped>
#menu {
  right: 10px;
  top: calc(100% - 100px);
  width: 40px;
  height: 40px;
  background: #ee0a24;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2001;
}
.van-popup--left {
  top: 0;
  transform: translate3d(0, -0%, 0);
  width: 100%;
  .van-sidebar {
    width: 100%;
  }
}
.van-sidebar-item {
  font-size: 12px;
  padding: 10px 15px;
}
.menupop {
}
</style>