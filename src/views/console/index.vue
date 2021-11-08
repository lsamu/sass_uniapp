<template>
  <el-container>
    <el-aside width="240px">
      <NavMenu></NavMenu>
    </el-aside>
    <el-container>
      <el-header height="96px">
        <PageHeader></PageHeader>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  getCurrentInstance,
  computed,
  reactive,
  ref,
} from "@vue/composition-api";

import NavMenu from "./nav.vue";
import PageHeader from "./header.vue";

export default defineComponent({
  components: {
    NavMenu,
    PageHeader,
  },
  setup(props, context) {
    const root = getCurrentInstance();
    const that: any = root.proxy;
  },
});
</script>

<style lang="scss" scoped>
.el-header {
  position: fixed;
  left: 240px;
  right: 0;
  padding: 0;
  z-index: 10;
  background: rgba(255, 255, 255, 0.94);
  // box-shadow: 0 0 2px #eee;
}

.el-main {
  padding: 106px 40px 0;
}
</style>
