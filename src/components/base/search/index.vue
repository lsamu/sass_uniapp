<template>
  <view class="box-uni-search">
    <view class="search2" v-if="currentStyle == 1">
      <u-search placeholder="" v-model="keyword"></u-search>
    </view>
    <view class="search" v-if="currentStyle == 2">
      <u-navbar :is-back="false" title="样式"> </u-navbar>
      <u-search placeholder="" v-model="keyword"></u-search>
    </view>
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
  name: "Search",
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that: any = root.proxy;

    const thatData = reactive({
      keyword: "", //关键词
      styles: [], //样式列表
      currentStyle: 1, //当前样式
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
.box-uni-search {
  .search {
    padding: 0 25rpx;
    background: linear-gradient(to right, #ff6034, #ee0a24);
    height: 300rpx;
    border-radius: 0 0 50rpx 50rpx;
    width: 100%;
    position: fixed;
    ::v-deep {
      .u-navbar {
        background: transparent !important;
        box-shadow: none;
        border: 0;

        .u-title {
          color: #ffffff !important;
        }
      }
      .u-border-bottom:after {
        border-bottom-width: 0;
      }

      .u-action {
        color: #ffffff;
      }
    }
  }
  .search2 {
    padding: 25rpx;
    background: linear-gradient(to right, #ff6034, #ee0a24);
    height: 110rpx;
    width: 100%;
    position: fixed;
    z-index: 999;

    ::v-deep {
      .u-action {
        color: #ffffff;
      }
    }
  }
}
</style>
