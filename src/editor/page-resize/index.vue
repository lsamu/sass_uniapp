<template>
  <div class="box-editor-canvas">
    <panZoom :options="{ minZoom: 0.5, maxZoom: 1, initialZoom: 1 }">
      <div
        class="edit-view"
        tabindex="0"
        @click.self="handleActiveComponet(-1)"
      >
        <div
          class="screen"
          :style="[screenStyle, style, wrapStyle]"
          @click.self="handleActiveComponet(-1)"
          ref="screen"
        >
          <vue-draggable-resizable
            :parent="true"
            v-for="(item, index) in project.thatData.currentPage.elements"
            :key="index"
            @activated="handleActiveComponet(index)"
            @dragging="handleDrag(item, ...arguments)"
            @resizing="handleResize(item, ...arguments)"
            :w="item.w"
            :h="item.h"
            :x="item.x"
            :y="item.y"
            :z="item.z"
            :active="item.active"
            :grid="[5, 5]"
            :snap="true"
            :snapTolerance="5"
            @refLineParams="getRefLineParams"
          >
            <div
              :style="itemStyle(item)"
              style="overflow: hidden"
              @contextmenu.prevent="handleContextOpen($event, item)"
            >
              <component
                :is="getComponent(item.type)"
                :option="item"
                :data="item.data"
              ></component>
            </div>
          </vue-draggable-resizable>
          <span
            class="ref-line v-line"
            v-for="(item, index) in vLine"
            :key="'v_' + index"
            v-show="item.display"
            :style="{
              left: item.position,
              top: item.origin,
              height: item.lineLength,
            }"
          />
          <span
            class="ref-line h-line"
            v-for="(item, index) in hLine"
            :key="'h_' + index"
            v-show="item.display"
            :style="{
              top: item.position,
              left: item.origin,
              width: item.lineLength,
            }"
          />
        </div>
        <box-context-menu
          ref="contextMenu"
          :option="contextMenuOption"
        ></box-context-menu>
      </div>
    </panZoom>
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

import panZoom from "../components/panzoom.vue";
import { useInjector } from "../state/hook";
import { useProjectState } from "../state/useProjectState";

export default defineComponent({
  name: "PageResize",
  components: {
    panZoom,
  },
  props: ["scale"],
  setup(props, context) {
    const root = getCurrentInstance();
    const that: any = root.proxy;

    const project = useInjector(useProjectState);

    const thatData = reactive({
      vLine: [],
      hLine: [],
      contextMenuOption: {
        items: [
          {
            text: "新建",
            onClick: (item) => {},
          },
          {
            text: "编辑",
            onClick: (item) => {},
          },
          {
            text: "删除",
            onClick: (item) => {},
          },
        ],
      },
    });

    const publicUrl = computed(() => {
      return `http://${window.location.host}${window.location.pathname}#/view/${that.$route.params.id}`;
    });

    const wrapStyle = computed(() => {
      return {
        transform: `scale(${props.scale})`,
      };
    });

    const screenStyle = computed(() => {
      return {
        backgroundColor: project.thatData.currentPage.bgcolor,
        backgroundImage: `url(${project.thatData.currentPage.bgimage})`,
        backgroundSize: project.thatData.currentPage.bgimagesize,
        width: project.thatData.currentPage.width + "px",
        height: project.thatData.currentPage.height + "px",
      };
    });

    const style = {
      position: "relative",
      backgroundSize: "20px 20px, 20px 20px",
    };

    const itemStyle = function (item) {
      return {
        backgroundColor: item.bgColor,
        width: item.w + "px",
        height: item.h + "px",
      };
    };

    const getRefLineParams = function (params) {
      const { vLine, hLine } = params;
      thatData.vLine = vLine;
      thatData.hLine = hLine;
    };

    const handleActiveComponet = function (index: any) {
      project.activeComponent(index);
    };

    const handleResize = function (
      widget: any,
      left: any,
      top: any,
      width: any,
      height: any
    ) {
      const item = widget;
      item.x = left;
      item.y = top;
      item.w = width;
      item.h = height;
    };

    const handleDrag = function (widget: any, left: any, top: any) {
      const item = widget;
      item.x = left;
      item.y = top;
    };

    const generateData = function (item: any) {
      that.$parent.generateData(item);
    };

    const getComponent = function (type: string) {
      if (type == "textarea") {
        type = "input";
      }
      return "box-" + type;
    };

    const refContextMenu = function () {
      return that.$refs["contextMenu"] as any;
    };

    const handleContextOpen = function (event: any, item: any) {
      refContextMenu().open(event, item);
    };

    return {
      ...toRefs(thatData),
      itemStyle,
      publicUrl,
      wrapStyle,
      screenStyle,
      style,
      handleActiveComponet,
      handleResize,
      handleDrag,
      generateData,
      getComponent,
      getRefLineParams,
      project,
      handleContextOpen,
    };
  },
});
</script>

<style lang="scss" scoped>
.box-editor-canvas {
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  .edit-view {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    outline: 0;
  }

  .screen {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 20px auto;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 0 15px 0 rgb(0 0 0 / 10%);
  }
}
</style>
