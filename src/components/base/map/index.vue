<template>
  <map
    style="width: 100%; height: 300px;"
    :latitude="currentOption.latitude"
    :longitude="currentOption.longitude"
    :markers="currentOption.covers"
  >
  </map>
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
  name: "Map",
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that: any = root.proxy;

    const thatData = reactive({});

    const currentOption = computed(() => {
      const defaultOption = {
        latitude: 39.909,
        longitude: 116.39742,
        covers: [
          {
            latitude: 39.909,
            longitude: 116.39742,
          },
          {
            latitude: 39.9,
            longitude: 116.39,
          },
        ],
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
