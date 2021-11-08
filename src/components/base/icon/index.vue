<template>
  <icon
    :type="currentOption.type"
    :size="currentOption.size"
    :color="currentOption.color"
  />
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
  name: "Icon",
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that: any = root.proxy;

    const thatData = reactive({});

    const currentOption = computed(() => {
      const defaultOption = {
        type: "info",
        size: 23,
        color: "",
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
