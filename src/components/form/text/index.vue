<template>
  <!-- <text>{{currentOption.text}}</text> -->
  <input v-bind="currentOption" />
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
  name: "BoxUniFormText",
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({});

    const currentOption = computed(() => {
      const defaultOption = {
        text: "开发者",
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
