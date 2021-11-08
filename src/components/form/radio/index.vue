<template>
  <radio-group @change="radioChange">
    <label
      class="uni-list-cell uni-list-cell-pd"
      v-for="(item, index) in currentOption.items"
      :key="item.value"
    >
      <view>
        <radio :value="item.value" :checked="index === current" />
      </view>
      <view>{{ item.name }}</view>
    </label>
  </radio-group>
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
  name: "Radio",
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;

    const thatData = reactive({
      current: 0,
    });

    const currentOption = computed(() => {
      const defaultOption = {
        items: [
          {
            value: "USA",
            name: "美国",
          },
          {
            value: "CHN",
            name: "中国",
            checked: "true",
          },
          {
            value: "BRA",
            name: "巴西",
          },
          {
            value: "JPN",
            name: "日本",
          },
          {
            value: "ENG",
            name: "英国",
          },
          {
            value: "FRA",
            name: "法国",
          },
        ],
      };

      let oo = merge(defaultOption, props.option || {});
      return oo;
    });

    const radioChange = function() {};

    return {
      ...toRefs(thatData),
      currentOption,
      radioChange,
    };
  },
});
</script>
