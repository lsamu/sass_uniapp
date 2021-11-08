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
  name: "BoxUniOptionBaseImage",
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
              caption: "图片",
              labelWidth: 80,
              items: [
                {
                  label: "图片地址",
                  type: "button-dialog",
                  image: true,
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
    });

    return {
      ...toRefs(thatData),
      thatOption,
      props,
    };
  },
});
</script>
