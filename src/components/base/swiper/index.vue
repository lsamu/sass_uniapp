<template>
  <view class="box-uni-swiper">
    <u-swiper border-radius="20" :list="list"></u-swiper>
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
  name: "Swiper",
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that: any = root.proxy;

    const thatData = reactive({
      list: [
        {
          price: 35,
          title: "北国风光，千里冰封，万里雪飘",
          shop: "李白杜甫白居易旗舰店",
          image: require("../../../static/index/swiper_1.jpg"),
        },
        {
          price: 75,
          title: "望长城内外，惟余莽莽",
          shop: "李白杜甫白居易旗舰店",
          image: require("../../../static/index/swiper_1.jpg"),
        },
      ],
    });

    const currentOption = computed(() => {
      const defaultOption = {
        items: [],
      };

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
.box-uni-swiper {
  padding: 180rpx 25rpx 25rpx 25rpx;
}
</style>
