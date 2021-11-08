<template>
  <BoxEditorPreview></BoxEditorPreview>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance } from "@vue/composition-api";
import preview from "../editor/preview/index.vue";

export default defineComponent({
  components: {
    BoxEditorPreview: preview,
  },
  setup() {
    const root = getCurrentInstance();
    const that: any = root.proxy;
  },
});
</script>
