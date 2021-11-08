<template>
  <div>
    导入组件  box-uni-import-xxx
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
