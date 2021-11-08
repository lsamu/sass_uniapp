<template>
  <div>
    开发自定义插件  box-uni-plugin-xxx
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
