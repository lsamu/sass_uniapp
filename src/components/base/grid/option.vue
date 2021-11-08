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
  name: "Grid",
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
              caption: "九宫格",
              labelWidth: 80,
              items: [
                {
                  label: "宫格类型",
                  type: "select",
                  data: [
                    {
                      label: "三宫格",
                      value: 3,
                    },
                    {
                      label: "四宫格",
                      value: 4,
                    },
                    {
                      label: "五宫格",
                      value: 5,
                    },
                  ],
                },
                {
                  type: "tabs-form",
                  label: "",
                  prop: "tabbar",
                  columns: [
                    {
                      label: "菜单名称",
                      prop: "title",
                    },
                    {
                      label: "菜单图标",
                      prop: "defaultIcon",
                      type: "button-dialog",
                    },
                    {
                      label: "菜单链接",
                      prop: "link",
                      type: "select",
                      data: [
                        {
                          label: "无",
                          value: 1,
                        },
                        {
                          label: "外部链接",
                          value: 2,
                        },
                        {
                          label: "拨打电话",
                          value: 3,
                        },
                        {
                          label: "登录页面",
                          value: 4,
                        },
                        {
                          label: "客服页面",
                          value: 5,
                        },
                      ],
                    },
                    {
                      label: "外部链接",
                      prop: "defaultIcon",
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
