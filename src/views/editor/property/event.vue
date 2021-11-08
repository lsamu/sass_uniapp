<template>
  <div class="box-editor-event"></div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance } from "@vue/composition-api";

export default defineComponent({
  setup() {
    const root = getCurrentInstance();
    const that: any = root.proxy;
  },
});
</script>
<style lang="scss">
.box-editor-event {
}
</style>
