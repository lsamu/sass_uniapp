<template>
  <div>全景</div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, reactive } from "@vue/composition-api";
import { useInjector } from "../state/hook";
import { useProjectState } from "../state/useProjectState";

export default defineComponent({
  name:"PagePanorama",
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;
    const thatData = reactive({});

    const project = useInjector(useProjectState);
  },
});
</script>

<style lang="scss"></style>
