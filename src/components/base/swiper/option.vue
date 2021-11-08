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
  name: "Swiper",
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
              caption: "轮播图",
              labelWidth: 50,
              items: [
                {
                  type: "tabs-form",
                  label: "",
                  prop: "tabbar",
                  columns: [
                    {
                      label: "轮播图片",
                      prop: "title",
                    },
                    {
                      label: "轮播标题",
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
