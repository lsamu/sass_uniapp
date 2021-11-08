<template>
  <cover-view
    class="box-uni-tabbar"
    :style="{ 'padding-bottom': paddingBottomHeight + 'rpx' }"
  >
    <cover-view
      class="tabbar-item"
      v-for="(item, index) in list"
      :key="index"
      @click="tabbarChange(item.path)"
    >
      <cover-image
        class="item-img"
        :src="item.icon_a"
        v-if="current == index"
      ></cover-image>
      <cover-image class="item-img" :src="item.icon" v-else></cover-image>
      <cover-view
        class="item-name"
        :class="{ tabbarActive: current == index }"
        v-if="item.text"
        >{{ item.text }}</cover-view
      >
    </cover-view>
  </cover-view>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
  toRefs,
  getCurrentInstance,
  onMounted,
} from "@vue/composition-api";
import merge from "deepmerge";

export default defineComponent({
  name: "Tabbar",
  props: ["option", "data", "value", "current"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({
      paddingBottomHeight: 0,
      list: [
        {
          text: "首页",
          icon: "/static/images/home.png", //未选中图标
          icon_a: "/static/images/home_i.png", //选中图片
          path: "activity", //页面路径
        },
        {
          text: "分类",
          icon: "/static/images/classify.png",
          icon_a: "/static/images/classify_i.png",
          path: "recommendation",
        },
        {
          text: "订单",
          icon: "/static/images/order.png",
          icon_a: "/static/images/order_i.png",
          path: "message",
        },
        {
          text: "我的",
          icon: "/static/images/me.png",
          icon_a: "/static/images/me_i.png",
          path: "user",
        },
      ],
    });

    const currentOption = computed(() => {
      const defaultOption = {};

      let oo = merge(defaultOption, props.option || {});
      return oo;
    });

    onMounted(() => {
      // let that = this;
      // uni.getSystemInfo({
      //   success: function(res) {
      //     let model = ["X", "XR", "XS", "11", "12", "13", "14", "15"];
      //     model.forEach((item) => {
      //       //适配iphoneX以上的底部，给tabbar一定高度的padding-bottom
      //       if (
      //         res.model.indexOf(item) != -1 &&
      //         res.model.indexOf("iPhone") != -1
      //       ) {
      //         thatData.paddingBottomHeight = 40;
      //       }
      //     });
      //   },
      // });
    });

    const tabbarChange = function(path) {
      uni.switchTab({
        url: path,
      });
    };

    return {
      ...toRefs(thatData),
      currentOption,
      tabbarChange,
    };
  },
});
</script>
<style lang="scss" scoped>
.box-uni-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100rpx;
  background-color: #ffffff;

  .tabbarActive {
    color: #79d5ad !important;
  }
  .tabbar-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100rpx;
    .item-img {
      margin-bottom: 4rpx;
      width: 46rpx;
      height: 46rpx;
    }
    .item-name {
      font-size: 26rpx;
      color: #a3a3a3;
    }
  }
}
</style>
