<template>
  <div>生成html</div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, reactive } from "@vue/composition-api";
import { useInjector } from "../state/hook";
import { useProjectState } from "../state/useProjectState";

export default defineComponent({
  name: "PageHtml",
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;
    const thatData = reactive({});

    const project = useInjector(useProjectState);
  },
});
</script>
