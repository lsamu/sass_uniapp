<template>
  <view @click="handleUpload">
    {{currentOption.text}}
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
  name: "Upload",
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({});

    const currentOption = computed(() => {
      const defaultOption = {
        text: "上传",
      };

      let oo = merge(defaultOption, props.option || {});
      return oo;
    });

    const handleUpload = function() {
      uni.chooseImage({});
    };

    return {
      ...toRefs(thatData),
      currentOption,
      handleUpload,
    };
  },
});
</script>
