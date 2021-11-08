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
  name: "ImageText",
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that: any = root.proxy;

    const thatData = reactive({
      formData: props.value || {},
    });

    const thatOption = reactive({
      items: [
        {
          type: "group",
          items: [
            {
              caption: "图文",
              labelWidth: 50,
              items: [
                {
                  type: "tabs-form",
                  label: "",
                  prop: "tabbar",
                  columns: [
                    {
                      label: "标题名称",
                      prop: "title",
                    },
                    {
                      label: "内容说明",
                      prop: "defaultIcon",
                      type: "textarea",
                    },
                    {
                      label: "内容链接",
                      prop: "link",
                      type: "select",
                    },
                    {
                      label: "字体颜色",
                      prop: "link",
                      type: "input-color",
                    },
                  ],
                },
              ],
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
