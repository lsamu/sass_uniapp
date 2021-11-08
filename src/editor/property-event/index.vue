<template>
  <box-form :option="option"></box-form>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, ref } from "@vue/composition-api";
import { useInjector } from "../state/hook";
import { useProjectState } from "../state/useProjectState";

export default defineComponent({
  name: "PropertyEvent",
  setup(props, context) {
    const root = getCurrentInstance();
    const that = root.proxy;
    const thatData = reactive({});

    const project = useInjector(useProjectState);
    
    let option = ref({});

    return {
      option,
    };
  },
});
</script>
