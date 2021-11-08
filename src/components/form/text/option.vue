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
  name: "BoxUniOptionFormText",
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
              caption: "文本",
              labelWidth: 80,
              items: [
                {
                  label: "显示类型",
                },
                {
                  label: "字段标题",
                },
                {
                  label: "字段名",
                },
                {
                  label: "提示信息",
                },
                {
                  label: "默认值",
                },
                {
                  label: "文本类型",
                  data: [
                    {
                      label: "文本",
                    },
                    {
                      label: "密码",
                    },
                    {
                      label: "数字",
                    },
                    {
                      label: "手机",
                    },
                    {
                      label: "日期",
                    },
                    {
                      label: "省份证",
                    },
                  ],
                },
                {
                  label: "验证",
                  columns: [
                    {
                      label: "验证方式",
                    },
                    {
                      label: "提示信息",
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
