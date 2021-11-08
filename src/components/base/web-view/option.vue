<template>
  <box-form :option="thatOption" v-model="formData"></box-form>
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
  name: "WebView",
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({
      formData: props.value || {},
    });

    const thatOption = reactive({
      items: [
        {
          type: "group",
          items: [
            {
              caption: "网页",
              labelWidth: 50,
              items: [],
            },
          ],
        },
      ],
    });

    return {
      ...toRefs(thatData),
      thatOption,
      props,
    };
  },
});
</script>
