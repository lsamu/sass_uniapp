<template>
  <video
    :src="currentOption.src"
    @error="videoErrorCallback"
    :danmu-list="currentOption.danmuList"
    enable-danmu
    danmu-btn
    controls
  ></video>
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
  name: "Video",
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({});

    const currentOption = computed(() => {
      const defaultOption = {
        src:
          "https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4",
        danmuList: [
          {
            text: "第 1s 出现的弹幕",
            color: "#ff0000",
            time: 1,
          },
          {
            text: "第 3s 出现的弹幕",
            color: "#ff00ff",
            time: 3,
          },
        ],
        danmuValue: "",
      };

      let oo = merge(defaultOption, props.option || {});
      return oo;
    });

    const videoErrorCallback = function(e) {
      uni.showModal({
        content: e.target.errMsg,
        showCancel: false,
      });
    };

    return {
      ...toRefs(thatData),
      currentOption,
      videoErrorCallback,
    };
  },
});
</script>
