<template>
  <label :style="getStyle()" style="display:block">{{ text }}</label>
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
  name: "Label",
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that: any = root.proxy;

    const thatData = reactive({
      text: props.value || "文本",
    });

    const currentOption: any = computed(() => {
      const defaultOption = {
        backgroundColor: null, // "yellow",
        color: null, //"red",
        fontSize: null, //"28px",
        textAlign: "left",
      };

      let oo = merge(defaultOption, props.option || {});
      return oo;
    });

    const getStyle = function() {
      return {
        backgroundColor: currentOption.value.backgroundColor,
        color: currentOption.value.color,
        fontSize: currentOption.value.fontSize,
        textAlign: currentOption.value.textAlign,
      };
    };

    return {
      ...toRefs(thatData),
      currentOption,
      getStyle,
    };
  },
});
</script>
