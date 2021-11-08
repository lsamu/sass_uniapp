<template>
  <progress :percent="currentOption.percent" :show-info="currentOption.showInfo" :stroke-width="currentOption.strokeWidth" />
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
  name: "Progress",
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that: any = root.proxy;

    const thatData = reactive({});

    const currentOption = computed(() => {
      const defaultOption = {
        percent: 20,
        showInfo: true,
        strokeWidth: "3",
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
