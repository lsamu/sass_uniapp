<template>
  <div>
    组合组件 box-uni-composite-xxx
  </div>
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
