<template>
  <div class="box-editor-preview">
    <div
      class="page"
      :style="pageStyle(project)"
      v-for="(page, index) in project.pages"
      :key="index"
    >
      <component
        :is="getComponent(element.type)"
        v-for="(element, index) in page.elements"
        :key="index"
        :style="widgetStyle(element)"
        v-bind="element"
      ></component>
    </div>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  reactive,
  toRefs,
} from "@vue/composition-api";

export default defineComponent({
  name: "PagePerview",
  props: ["option", "data", "value"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that: any = root.proxy;

    const thatData = reactive({});

    const project: any = reactive({
      pages: [],
    });

    const getComponent = function (type: string) {
      if (type == "textarea") {
        type = "input";
      }
      return "box-uni-" + type;
    };

    const pageStyle = function (page) {
      return {
        width: page.width,
        height: page.height,
        backgroundColor: page.bgcolor,
        backgroundImage: page.bgimage,
      };
    };

    const widgetStyle = function (widget) {
      return {
        left: widget.x,
        top: widget.y,
        width: widget.w,
        height: widget.h,
        backgroundColor: widget.bgcolor,
        backgroundImage: widget.bgImage,
      };
    };

    return {
      ...toRefs(thatData),
      project,
      getComponent,
      pageStyle,
      widgetStyle,
    };
  },
});
</script>
