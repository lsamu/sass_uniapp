<template>
  <view class="box-uni-ad">
    <u-image width="100%" height="180rpx" :src="src"></u-image>
  </view>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  computed,
  getCurrentInstance,
  toRefs,
} from "@vue/composition-api";
import merge from "deepmerge";

export default defineComponent({
  name: "Ad",
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that: any = root.proxy;

    const thatData = reactive({
      src: require("@/static/index/ad.gif"),
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
.box-uni-ad {
  padding: 0rpx 25rpx 25rpx 25rpx;
}
</style>
