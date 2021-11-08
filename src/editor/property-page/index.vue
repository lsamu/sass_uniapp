<template>
  <box-form :option="currentOption" v-model="formData"></box-form>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
  watchEffect,
  watch,
  getCurrentInstance,
} from "@vue/composition-api";
import { useInjector } from "../state/hook";
import { useProjectState } from "../state/useProjectState";

export default defineComponent({
  name: "PropertyPage",
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;
    const thatData = reactive({});

    const project = useInjector(useProjectState);

    const { option, data, value } = reactive(props);
    let formData = ref(value || {});
    const defaultOption = {
      labelWidth: 80,
      items: [
        {
          type: "input",
          prop: "id",
          label: "编号",
          data: [],
          disabled: true,
        },
        {
          type: "input",
          prop: "title",
          label: "名称",
          data: [],
        },
        {
          type: "input-color",
          prop: "backgroundColor",
          label: "背景颜色",
          data: [],
        },
        {
          type: "input-file",
          prop: "backgroundImage",
          label: "背景图片",
          data: [],
        },
      ],
    };
    const currentOption = computed(() => {
      let oo = Object.assign(defaultOption, option || {});
      return oo;
    });

    watch(
      () => props.value,
      (n, o) => {
        formData.value = n;
        console.log(n);
      }
    );

    watch(formData, () => {
      context.emit("input", formData.value);
    });

    return {
      formData,
      currentOption,
    };
  },
});
</script>
