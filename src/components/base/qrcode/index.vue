<template>
  <ad
    adpid="1111111111"
    :data-xx="adItem.id"
    @load="onload"
    @close="onclose"
    @error="onerror"
  ></ad>
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
  name: "QrCode",
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that: any = root.proxy;

    const thatData = reactive({});

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
