<template>
  <view class="box-uni-grid">
    <u-grid :col="5" hover-class="hover-class">
      <u-grid-item v-for="(item, index) in 10" :index="index" :key="index">
        <u-image
          width="80rpx"
          height="80rpx"
          :src="require('@/static/index/grid_' + item + '.png')"
        ></u-image>
        <text class="grid-text">{{ "宫格" + (index + 1) }}</text>
      </u-grid-item>
    </u-grid>
  </view>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
  toRefs,
  getCurrentInstance,
} from "@vue/composition-api";
import merge from "deepmerge";

export default defineComponent({
  name: "Grid",
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that: any = root.proxy;

    const thatData = reactive({
    });

    const currentOption = computed(() => {
      const defaultOption = {};

      let oo = merge(defaultOption, props.option || {});
      return oo;
    });

    return {
      ...toRefs(thatData),
      currentOption,
    };
  },
});
</script>
<style lang="scss">
.Grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  background: #f7f7f7;
  padding: 0rpx 0;
  .Grid-Item {
    width: 25%;
    height: 213rpx;
    text-align: center;
    border: 1rpx solid #ccc;
    box-sizing: border-box;
    .GSimg {
      width: 96rpx;
      height: 96rpx;
      margin-top: 42rpx;
      margin-left: 50rpx;
      .Image {
        width: 96rpx;
        height: 96rpx;
      }
    }
    .GStitle {
      width: 100%;
      height: 34rpx;
      line-height: 34rpx;
      color: #06121e;
      font-size: 24rpx;
      margin-top: 20rpx;
    }
  }
}
</style>
