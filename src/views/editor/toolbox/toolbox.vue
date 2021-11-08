<template>
  <div class="box-editor-toolbox">
    <el-tabs
      tab-position="left"
      style="height: 100%;"
      @tab-click="handleTabClick"
    >
      <el-tab-pane
        :label="item.title"
        v-for="(item, index) in btnList"
        :key="index"
        style="height: 100%;overflow:auto"
      >
        <template #label>
          <div class="tab-item">
            <i class="iconfont" :class="'icon-' + item.key"></i>
            <div class="title">{{ item.title }}</div>
          </div>
        </template>
        <component :is="item.component" :panelKey="item.key"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  getCurrentInstance,
  computed,
  reactive,
  ref,
  toRefs,
} from "@vue/composition-api";

import left1 from "./component.vue";
import left2 from "./layer.vue";
import left3 from "./page.vue";

export default defineComponent({
  components: {
    left1,
    left2,
    left3,
  },
  setup() {
    const root = getCurrentInstance();
    const that: any = root.proxy;

    const thatData = reactive({
      btnList: [
        {
          key: "chart",
          title: "图表",
          component: "left1",
        },
        {
          key: "text",
          title: "文字",
          component: "left1",
        },
        {
          key: "picture",
          title: "图片",
          component: "left1",
        },
        {
          key: "tools",
          title: "组件",
          component: "left1",
        },
        {
          key: "layer",
          title: "图层",
          component: "left2",
        },
        {
          key: "chart",
          title: "页面",
          component: "left3",
        },
      ],
      index: 0,
    });

    const handleTabClick = function(sender) {
      const aa = ~~sender.index;
      const bb = thatData.index;
      if (aa == bb) {
        return;
      }
    };

    return {
      ...toRefs(thatData),
      handleTabClick,
    };
  },
});
</script>

<style lang="scss">
.box-editor-toolbox {
  height: 100%;
  contain: layout;

  ::v-deep .el-tabs__item {
    height: auto !important;
    .tab-item {
      text-align: center;
      display: inline-block;
      .title {
        display: block;
      }
    }
  }
  ::v-deep .el-tabs__content{
    height: 100%;
  }
}
</style>
