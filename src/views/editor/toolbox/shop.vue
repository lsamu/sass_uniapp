<template>
  <div>
    商店模板 完整项目模板 是替换还是导入到后面页面上
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
