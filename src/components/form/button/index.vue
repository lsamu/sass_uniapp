<template>
  <button :type="currentOption.type" @click="currentOption.onClick">
    {{ currentOption.text }}
  </button>
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
  name: "Button",
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({});

    const currentOption = computed(() => {
      const defaultOption = {
        text: "按钮",
        type: "primary",
        onClick: null,
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
